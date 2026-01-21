// Use playlistData from playlist.js, adding the folder prefix
const audioFiles = playlistData.map(item => ({
    ...item,
    path: `00_sons/${item.file}`
}));

let currentAudio = null;
let currentTile = null;

const soundboard = document.getElementById('soundboard');

// Generate sound tiles
audioFiles.forEach((file, index) => {
    const tile = document.createElement('div');
    tile.className = 'sound-tile';
    tile.innerHTML = `
        <div class="sound-number">${file.id}</div>
        <div class="sound-name">${file.label}</div>
        <div class="sound-duration" id="dur-${index}">--:--</div>
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
    const min = Math.floor(seconds / 60);
    const sec = Math.floor(seconds % 60);
    return `${min}:${sec.toString().padStart(2, '0')}`;
}

async function toggleSound(index, tile) {
    const file = audioFiles[index];

    // If clicking same tile that is playing -> Stop it
    if (currentAudio && currentAudio.src.endsWith(encodeURI(file.path))) {
        stopAll();
        return;
    }

    // New sound: stop current and play new
    stopAll();

    currentAudio = new Audio(file.path);
    currentTile = tile;

    tile.classList.add('playing');
    const progressBar = tile.querySelector('.progress-ring');

    currentAudio.play();

    currentAudio.ontimeupdate = () => {
        const progress = (currentAudio.currentTime / currentAudio.duration) * 100;
        if (progressBar) progressBar.style.width = `${progress}%`;
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
    document.querySelectorAll('.sound-tile').forEach(t => {
        t.classList.remove('playing');
        const p = t.querySelector('.progress-ring');
        if (p) p.style.width = '0%';
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
            setTimeout(() => {
                if (ui) ui.classList.add('cache-hidden');
            }, 3000);
        } else {
            msg.innerText = `Mise en cache : ${Math.round(progress)}%`;
        }
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
