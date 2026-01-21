const audioFiles = [
    { name: "01_01_00_Au_Theatre_ce_Soir_generique-dailymotion-x2sef7f-http-480-5.mp3", id: "01.01" },
    { name: "01_01_00_Au_Theatre_ce_Soir_generique-dailymotion-x2sef7f-http-480-5_v2.mp3", id: "01.01 v2" },
    { name: "01_02_01_Le grand méchant loup (Les 3 petits cochons - en chanson) - Lucienne Vernay.mp3", id: "01.02.01" },
    { name: "01_02_02_Scène_de_crime_et_vidéo_générée.mp3", id: "01.02.02" },
    { name: "01_02_02_Scène_de_crime_et_vidéo_générée_v2.mp3", id: "01.01.02 v2" },
    { name: "01_03 tempête.mp3", id: "01.03" },
    { name: "02_01_00_Arrivée de Mollie (radio).mp3", id: "02.01" },
    { name: "02_02_00_Arrivée de Gilles.mp3", id: "02.02" },
    { name: "02_04_00_ MOLLIE  et GILES flash actu radio pièce p 5_v2.mp3", id: "02.04" },
    { name: "03_02_00_Arrivée de Christopher.mp3", id: "03.02" },
    { name: "03_05_00_Gilles allume la radio et Mollie l éteind.mp3", id: "03.05" },
    { name: "04_01_00_Mme BOYLE  Heurtoir X2 énervée_v3.mp3", id: "04.01" },
    { name: "04_02_00_Arrivée de Mme Boyle.mp3", id: "04.02" },
    { name: "05_01_00_Giles va aider le MAJOR METCALF bruitage ouverture de porte appartement.mp3", id: "05.01" },
    { name: "05_04_00_Giles et le MAJOR METCALF entrent.mp3", id: "05.04" },
    { name: "06_01_00_Melle CASEWELL Heurtoir.mp3", id: "06.01" },
    { name: "06_03_00_Arrivée de Melle CASEWELL.mp3", id: "06.03" },
    { name: "07_01_00_Mme PARIVICINI Heurtoir.mp3", id: "07.01" },
    { name: "07_03_00_Arrivée de Mme PARIVICINI.mp3", id: "07.03" },
    { name: "08_01_00 Horloge_v2.mp3", id: "08.01" },
    { name: "09_01_00_ MAJOR METCALF sort dehors pour déneiger  open-and-close-door-405453 - Copie.mp3", id: "09.01" },
    { name: "09_02_00_GILES sort dehors pour déneiger open-and-close-door-405453 - Copie.mp3", id: "09.02" },
    { name: "10_01_00_p 21 22 Melle CASEWELL ecoute de la musique à baisser en trois fois puis couper Jazz Noël.mp3", id: "10.01" },
    { name: "11_01_00_p 21 acte 2 scène 5 Sonnerie téléphone fixe ancien (bruitage gratuit).mp3", id: "11.01" },
    { name: "11_02_00_p 21 GILES rentre de  dehors open-and-close-door-405453 - Copie.mp3", id: "11.02" },
    { name: "12_01_01_ p 25  acte 2 scène 9 TROTTER frappe à la fenêtre p 25 BRUIT DE TOC TOC A LA VITRE_v2.mp3", id: "12.01" },
    { name: "12_02_00_GILES fait rentrer TROTTER open-and-close-door-405453 - Copie - Copie.mp3", id: "12.02" },
    { name: "14_01_00 p33 air piano maladroit trois petits cochons.mp3", id: "14.01" },
    { name: "15_01_00_p35 meurtre_v2.mp3", id: "15.01" },
    { name: "16_01_00_Trotter allume la radio puis l’éteint_v3.mp3", id: "16.01" },
    { name: "17_01_00_p 61 acte 3 scène 14 MOLLIE commence à jouer à la demande de TROTTER Pianola Qui a peur du grand méchant loup (Piano solo).mp3", id: "17.01" },
    { name: "18_00_00_ LE FINAL Grand méchant loup instrumentale.mp3", id: "18.00" }
].map(file => ({ ...file, path: `00_sons/${file.name}` }));

let currentAudio = null;
let currentTile = null;

const soundboard = document.getElementById('soundboard');

// Generate sound tiles
audioFiles.forEach((file, index) => {
    const tile = document.createElement('div');
    tile.className = 'sound-tile';
    tile.innerHTML = `
        <div class="sound-number">${file.id}</div>
        <div class="sound-name">${file.name.split('_').pop().replace('.mp3', '')}</div>
        <div class="progress-ring"></div>
    `;
    tile.onclick = () => toggleSound(index, tile);
    soundboard.appendChild(tile);
});

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
    const total = audioFiles.length + 5;
    const progress = Math.min((keys.length / total) * 100, 100);

    const fill = document.getElementById('cache-fill');
    const msg = document.getElementById('cache-msg');
    const ui = document.getElementById('cache-ui');

    if (fill) fill.style.width = `${progress}%`;
    if (msg) {
        if (progress >= 100) {
            msg.innerText = "Mode hors-ligne prêt !";
            setTimeout(() => ui.classList.add('cache-hidden'), 3000);
        } else {
            msg.innerText = `Mise en cache : ${Math.round(progress)}%`;
        }
    }
}

function updateNetwork() {
    const status = document.getElementById('conn-status');
    const isOnline = navigator.onLine;
    document.body.classList.toggle('is-offline', !isOnline);
    status.innerText = isOnline ? "En ligne" : "Hors-ligne";
}

window.addEventListener('online', updateNetwork);
window.addEventListener('offline', updateNetwork);
updateNetwork();
