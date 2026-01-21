// Version de l'application
const APP_VERSION = "v1.0.5";

// Use playlistData from playlist.js, adding the folder prefix
const audioFiles = playlistData.map(item => ({
    ...item,
    path: `00_sons/${item.file}`
}));

let currentAudio = null;
let currentTile = null;

const soundboard = document.getElementById('soundboard');

// Display version
document.getElementById('app-version').innerText = APP_VERSION;

// Display last update time
const lastUpdate = localStorage.getItem('last-soundboard-update');
if (lastUpdate) {
    document.getElementById('last-update').innerText = `Dernier rafraîchissement : ${lastUpdate}`;
}

// Generate sound tiles
audioFiles.forEach((file, index) => {
    const tile = document.createElement('div');
    tile.className = 'sound-tile';
    tile.innerHTML = `
        <div class="sound-number">${file.id}</div>
        <div class="sound-name">${file.label}</div>
        <div class="sound-duration" id="dur-${index}">--:--</div>
        <div class="time-container">
            <span class="elapsed-time" id="elapsed-${index}">0:00</span>
            <span class="remaining-time" id="remaining-${index}">-0:00</span>
        </div>
        <div class="progress-ring"></div>
    `;
    tile.onclick = () => toggleSound(index, tile);
    soundboard.appendChild(tile);

    // Fetch duration
    const tempAudio = new Audio(file.path);
    tempAudio.addEventListener('loadedmetadata', () => {
        const durationDisplay = document.getElementById(`dur-${index}`);
        if (durationDisplay) {
            durationDisplay.innerText = formatTime(tempAudio.duration);
        }
    });
});

function formatTime(seconds) {
    const isNegative = seconds < 0;
    const absSeconds = Math.abs(seconds);
    const min = Math.floor(absSeconds / 60);
    const sec = Math.floor(absSeconds % 60);
    return (isNegative ? "-" : "") + `${min}:${sec.toString().padStart(2, '0')}`;
}

async function toggleSound(index, tile) {
    const file = audioFiles[index];

    if (currentAudio && currentAudio.src.endsWith(encodeURI(file.path))) {
        stopAll();
        return;
    }

    stopAll();

    currentAudio = new Audio(file.path);
    currentTile = tile;

    tile.classList.add('playing');
    const progressBar = tile.querySelector('.progress-ring');
    const elapsedDisplay = document.getElementById(`elapsed-${index}`);
    const remainingDisplay = document.getElementById(`remaining-${index}`);

    currentAudio.play();

    currentAudio.ontimeupdate = () => {
        const elapsed = currentAudio.currentTime;
        const remaining = currentAudio.duration - elapsed;
        const progress = (elapsed / currentAudio.duration) * 100;

        if (progressBar) progressBar.style.width = `${progress}%`;
        if (elapsedDisplay) elapsedDisplay.innerText = formatTime(elapsed);
        if (remainingDisplay) remainingDisplay.innerText = formatTime(-remaining);
    };

    currentAudio.onended = () => {
        stopAll();
    };

    currentAudio.onerror = () => {
        alert("Erreur de chargement du son. Vérifiez la mise en cache.");
        stopAll();
    };
}

function stopAll() {
    if (currentAudio) {
        currentAudio.pause();
        currentAudio.currentTime = 0;
        currentAudio = null;
    }
    document.querySelectorAll('.sound-tile').forEach((t, idx) => {
        t.classList.remove('playing');
        const p = t.querySelector('.progress-ring');
        if (p) p.style.width = '0%';

        const elapsedDisplay = document.getElementById(`elapsed-${idx}`);
        const remainingDisplay = document.getElementById(`remaining-${idx}`);
        if (elapsedDisplay) elapsedDisplay.innerText = "0:00";
        if (remainingDisplay) remainingDisplay.innerText = "-0:00";
    });
    currentTile = null;
}

// PWA & Networking
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('sw.js')
        .then(() => setInterval(updateCacheProgress, 1000));
}

async function updateCacheProgress() {
    if (!('caches' in window)) return;
    const cache = await caches.open('audio-cache-v1');
    const keys = await cache.keys();
    const total = audioFiles.length + 6;
    const progress = Math.min((keys.length / total) * 100, 100);

    const fill = document.getElementById('cache-fill');
    const msg = document.getElementById('cache-msg');
    const ui = document.getElementById('cache-ui');

    if (fill) fill.style.width = `${progress}%`;
    if (msg) {
        if (progress >= 100) {
            msg.innerText = "Mode hors-ligne prêt !";
            if (!localStorage.getItem('last-soundboard-update')) {
                setLastUpdateDate();
            }
            setTimeout(() => {
                if (ui) ui.classList.add('cache-hidden');
            }, 3000);
        } else {
            msg.innerText = `Mise en cache : ${Math.round(progress)}%`;
        }
    }
}

function setLastUpdateDate() {
    const now = new Date();
    const dateStr = now.toLocaleDateString('fr-FR') + ' ' + now.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' });
    localStorage.setItem('last-soundboard-update', dateStr);
    const lastUpdateDisplay = document.getElementById('last-update');
    if (lastUpdateDisplay) lastUpdateDisplay.innerText = `Dernier rafraîchissement : ${dateStr}`;
}

async function forceUpdate() {
    if (confirm("Voulez-vous forcer la mise à jour des sons ? (Nécessite une connexion Internet)")) {
        if ('serviceWorker' in navigator) {
            const registrations = await navigator.serviceWorker.getRegistrations();
            for (let registration of registrations) {
                await registration.unregister();
            }
        }
        const cacheNames = await caches.keys();
        for (let name of cacheNames) {
            await caches.delete(name);
        }
        localStorage.removeItem('last-soundboard-update');
        window.location.reload(true);
    }
}

function updateNetwork() {
    const status = document.getElementById('conn-status');
    const isOnline = navigator.onLine;
    document.body.classList.toggle('is-offline', !isOnline);
    if (status) status.innerText = isOnline ? "En ligne" : "Hors-ligne";
}

window.addEventListener('online', updateNetwork);
window.addEventListener('offline', updateNetwork);
updateNetwork();
