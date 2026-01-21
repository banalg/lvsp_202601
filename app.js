// Version de l'application
const APP_VERSION = "v1.0.8";

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
    tile.id = `tile-${index}`;
    tile.innerHTML = `
        <div class="offline-indicator" title="Indisponible hors-ligne">
            <svg viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14h2v2h-2v-2zm0-10h2v8h-2V6z"/></svg>
        </div>
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

    // Check if specifically this sound is in cache
    checkTileCache(index);
});

async function checkTileCache(index) {
    if (!('caches' in window)) return;
    const cache = await caches.open('audio-cache-v1');
    const matched = await cache.match(audioFiles[index].path);
    const tile = document.getElementById(`tile-${index}`);
    const indicator = tile.querySelector('.offline-indicator');

    if (matched) {
        tile.classList.add('is-cached');
        indicator.title = "Disponible hors-ligne";
        indicator.innerHTML = '<svg viewBox="0 0 24 24"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg>';
    }
}

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

// Download All Feature
async function downloadAllSounds() {
    const btn = document.getElementById('download-btn');
    const originalText = btn.innerText;

    try {
        btn.innerText = "Préparation du ZIP...";
        btn.style.pointerEvents = "none";
        btn.style.opacity = "0.5";

        const zip = new JSZip();

        for (let i = 0; i < audioFiles.length; i++) {
            const file = audioFiles[i];
            btn.innerText = `Traitement ${i + 1}/${audioFiles.length}...`;

            const response = await fetch(file.path);
            const arrayBuffer = await response.arrayBuffer();

            const writer = new ID3Writer(arrayBuffer);
            writer.setFrame('TIT2', file.label);
            writer.addTag();
            const taggedBuffer = writer.arrayBuffer;

            const cleanName = `${file.id} - ${file.label}.mp3`.replace(/[\\/:*?"<>|]/g, '_');
            zip.file(cleanName, taggedBuffer);
        }

        btn.innerText = "Compression du ZIP...";
        const content = await zip.generateAsync({ type: "blob" });

        const url = window.URL.createObjectURL(content);
        const a = document.createElement('a');
        a.href = url;
        a.download = `LVSP_2026_Sons.zip`;
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);

        btn.innerText = "Téléchargement lancé !";
        setTimeout(() => {
            btn.innerText = originalText;
            btn.style.pointerEvents = "auto";
            btn.style.opacity = "1";
        }, 3000);

    } catch (error) {
        console.error(error);
        alert("Erreur lors du téléchargement : " + error.message);
        btn.innerText = originalText;
        btn.style.pointerEvents = "auto";
        btn.style.opacity = "1";
    }
}

// PWA & Networking
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('sw.js')
            .then(reg => {
                console.log('SW Registered');

                // Check for updates every 5 minutes
                setInterval(() => {
                    reg.update();
                }, 1000 * 60 * 5);

                reg.onupdatefound = () => {
                    const installingWorker = reg.installing;
                    installingWorker.onstatechange = () => {
                        if (installingWorker.state === 'installed') {
                            if (navigator.serviceWorker.controller) {
                                // New update found and installed
                                showUpdateNotification();
                            }
                        }
                    };
                };

                setInterval(updateCacheProgress, 1000);
            })
            .catch(err => console.log('SW Error', err));
    });
}

function showUpdateNotification() {
    if (confirm("Une nouvelle version de l'application ou des sons est disponible. Voulez-vous mettre à jour maintenant ?")) {
        window.location.reload();
    }
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

    audioFiles.forEach((_, idx) => checkTileCache(idx));

    if (msg) {
        if (progress >= 100) {
            msg.innerText = "Mode hors-ligne prêt !";
            setLastUpdateDate();
            setTimeout(() => {
                if (ui) ui.classList.add('cache-hidden');
            }, 3000);
        } else {
            msg.innerText = `Mise en cache : ${Math.round(progress)}%`;
            if (ui) ui.classList.remove('cache-hidden');
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
