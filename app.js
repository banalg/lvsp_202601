const audioFiles = [
    { name: "01_01_00_Au_Theatre_ce_Soir_generique-dailymotion-x2sef7f-http-480-5.mp3", path: "00_sons/01_01_00_Au_Theatre_ce_Soir_generique-dailymotion-x2sef7f-http-480-5.mp3" },
    { name: "01_01_00_Au_Theatre_ce_Soir_generique-dailymotion-x2sef7f-http-480-5_v2.mp3", path: "00_sons/01_01_00_Au_Theatre_ce_Soir_generique-dailymotion-x2sef7f-http-480-5_v2.mp3" },
    { name: "01_02_01_Le grand méchant loup (Les 3 petits cochons - en chanson) - Lucienne Vernay.mp3", path: "00_sons/01_02_01_Le grand méchant loup (Les 3 petits cochons - en chanson) - Lucienne Vernay.mp3" },
    { name: "01_02_02_Scène_de_crime_et_vidéo_générée.mp3", path: "00_sons/01_02_02_Scène_de_crime_et_vidéo_générée.mp3" },
    { name: "01_02_02_Scène_de_crime_et_vidéo_générée_v2.mp3", path: "00_sons/01_02_02_Scène_de_crime_et_vidéo_générée_v2.mp3" },
    { name: "01_03 tempête.mp3", path: "00_sons/01_03 tempête.mp3" },
    { name: "02_01_00_Arrivée de Mollie (radio).mp3", path: "00_sons/02_01_00_Arrivée de Mollie (radio).mp3" },
    { name: "02_02_00_Arrivée de Gilles.mp3", path: "00_sons/02_02_00_Arrivée de Gilles.mp3" },
    { name: "02_04_00_ MOLLIE  et GILES flash actu radio pièce p 5_v2.mp3", path: "00_sons/02_04_00_ MOLLIE  et GILES flash actu radio pièce p 5_v2.mp3" },
    { name: "03_02_00_Arrivée de Christopher.mp3", path: "00_sons/03_02_00_Arrivée de Christopher.mp3" },
    { name: "03_05_00_Gilles allume la radio et Mollie l éteind.mp3", path: "00_sons/03_05_00_Gilles allume la radio et Mollie l éteind.mp3" },
    { name: "04_01_00_Mme BOYLE  Heurtoir X2 énervée_v3.mp3", path: "00_sons/04_01_00_Mme BOYLE  Heurtoir X2 énervée_v3.mp3" },
    { name: "04_02_00_Arrivée de Mme Boyle.mp3", path: "00_sons/04_02_00_Arrivée de Mme Boyle.mp3" },
    { name: "05_01_00_Giles va aider le MAJOR METCALF bruitage ouverture de porte appartement.mp3", path: "00_sons/05_01_00_Giles va aider le MAJOR METCALF bruitage ouverture de porte appartement.mp3" },
    { name: "05_04_00_Giles et le MAJOR METCALF entrent.mp3", path: "00_sons/05_04_00_Giles et le MAJOR METCALF entrent.mp3" },
    { name: "06_01_00_Melle CASEWELL Heurtoir.mp3", path: "00_sons/06_01_00_Melle CASEWELL Heurtoir.mp3" },
    { name: "06_03_00_Arrivée de Melle CASEWELL.mp3", path: "00_sons/06_03_00_Arrivée de Melle CASEWELL.mp3" },
    { name: "07_01_00_Mme PARIVICINI Heurtoir.mp3", path: "00_sons/07_01_00_Mme PARIVICINI Heurtoir.mp3" },
    { name: "07_03_00_Arrivée de Mme PARIVICINI.mp3", path: "00_sons/07_03_00_Arrivée de Mme PARIVICINI.mp3" },
    { name: "08_01_00 Horloge_v2.mp3", path: "00_sons/08_01_00 Horloge_v2.mp3" },
    { name: "09_01_00_ MAJOR METCALF sort dehors pour déneiger  open-and-close-door-405453 - Copie.mp3", path: "00_sons/09_01_00_ MAJOR METCALF sort dehors pour déneiger  open-and-close-door-405453 - Copie.mp3" },
    { name: "09_02_00_GILES sort dehors pour déneiger open-and-close-door-405453 - Copie.mp3", path: "00_sons/09_02_00_GILES sort dehors pour déneiger open-and-close-door-405453 - Copie.mp3" },
    { name: "10_01_00_p 21 22 Melle CASEWELL ecoute de la musique à baisser en trois fois puis couper Jazz Noël.mp3", path: "00_sons/10_01_00_p 21 22 Melle CASEWELL ecoute de la musique à baisser en trois fois puis couper Jazz Noël.mp3" },
    { name: "11_01_00_p 21 acte 2 scène 5 Sonnerie téléphone fixe ancien (bruitage gratuit).mp3", path: "00_sons/11_01_00_p 21 acte 2 scène 5 Sonnerie téléphone fixe ancien (bruitage gratuit).mp3" },
    { name: "11_02_00_p 21 GILES rentre de  dehors open-and-close-door-405453 - Copie.mp3", path: "00_sons/11_02_00_p 21 GILES rentre de  dehors open-and-close-door-405453 - Copie.mp3" },
    { name: "12_01_01_ p 25  acte 2 scène 9 TROTTER frappe à la fenêtre p 25 BRUIT DE TOC TOC A LA VITRE_v2.mp3", path: "00_sons/12_01_01_ p 25  acte 2 scène 9 TROTTER frappe à la fenêtre p 25 BRUIT DE TOC TOC A LA VITRE_v2.mp3" },
    { name: "12_02_00_GILES fait rentrer TROTTER open-and-close-door-405453 - Copie - Copie.mp3", path: "00_sons/12_02_00_GILES fait rentrer TROTTER open-and-close-door-405453 - Copie - Copie.mp3" },
    { name: "14_01_00 p33 air piano maladroit trois petits cochons.mp3", path: "00_sons/14_01_00 p33 air piano maladroit trois petits cochons.mp3" },
    { name: "15_01_00_p35 meurtre_v2.mp3", path: "00_sons/15_01_00_p35 meurtre_v2.mp3" },
    { name: "16_01_00_Trotter allume la radio puis l’éteint_v3.mp3", path: "00_sons/16_01_00_Trotter allume la radio puis l’éteint_v3.mp3" },
    { name: "17_01_00_p 61 acte 3 scène 14 MOLLIE commence à jouer à la demande de TROTTER Pianola Qui a peur du grand méchant loup (Piano solo).mp3", path: "00_sons/17_01_00_p 61 acte 3 scène 14 MOLLIE commence à jouer à la demande de TROTTER Pianola Qui a peur du grand méchant loup (Piano solo).mp3" },
    { name: "18_00_00_ LE FINAL Grand méchant loup instrumentale.mp3", path: "00_sons/18_00_00_ LE FINAL Grand méchant loup instrumentale.mp3" }
];

let currentAudio = null;
let currentCard = null;

const audioList = document.getElementById('audio-list');

audioFiles.forEach((file, index) => {
    const card = document.createElement('div');
    card.className = 'audio-card';
    card.innerHTML = `
        <div class="audio-info">
            <span class="audio-name">${file.name}</span>
            <div class="progress-container">
                <div class="progress-bar"></div>
            </div>
        </div>
        <div class="controls">
            <button class="btn btn-play" onclick="togglePlay(${index}, this)">
                <svg viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
            </button>
            <button class="btn btn-stop" onclick="stopAudio()" title="Stop">
                <svg viewBox="0 0 24 24"><path d="M6 6h12v12H6z"/></svg>
            </button>
        </div>
    `;
    audioList.appendChild(card);
});

window.togglePlay = (index, btn) => {
    const file = audioFiles[index];
    const card = btn.closest('.audio-card');

    if (currentAudio && currentAudio.src.endsWith(encodeURI(file.path))) {
        if (currentAudio.paused) {
            currentAudio.play();
            updatePlayIcon(btn, true);
        } else {
            currentAudio.pause();
            updatePlayIcon(btn, false);
        }
        return;
    }

    stopAudio();

    currentAudio = new Audio(file.path);
    currentCard = card;
    card.classList.add('playing');
    updatePlayIcon(btn, true);

    currentAudio.play();

    currentAudio.ontimeupdate = () => {
        const progress = (currentAudio.currentTime / currentAudio.duration) * 100;
        card.querySelector('.progress-bar').style.width = `${progress}%`;
    };

    currentAudio.onended = () => {
        stopAudio();
    };
};

window.stopAudio = () => {
    if (currentAudio) {
        currentAudio.pause();
        currentAudio.currentTime = 0;
        currentAudio = null;
    }
    document.querySelectorAll('.audio-card').forEach(c => {
        c.classList.remove('playing');
        c.querySelector('.progress-bar').style.width = '0%';
        const playBtn = c.querySelector('.btn-play');
        updatePlayIcon(playBtn, false);
    });
};

function updatePlayIcon(btn, isPlaying) {
    if (!btn) return;
    const svg = btn.querySelector('svg');
    if (isPlaying) {
        svg.innerHTML = '<path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/>';
    } else {
        svg.innerHTML = '<path d="M8 5v14l11-7z"/>';
    }
}

if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('sw.js')
        .then(reg => {
            console.log('SW Registered');
            setInterval(checkCacheStatus, 1000);
        })
        .catch(err => console.log('SW Error', err));
}

async function checkCacheStatus() {
    if (!('caches' in window)) return;

    const cache = await caches.open('audio-cache-v1');
    const keys = await cache.keys();
    const totalAssets = audioFiles.length + 5;
    const progress = (keys.length / totalAssets) * 100;

    const fill = document.getElementById('cache-fill');
    const text = document.getElementById('cache-text');

    if (fill) fill.style.width = `${Math.min(progress, 100)}%`;
    if (text) {
        if (progress >= 100) {
            text.innerText = 'Tous les sons sont prêts pour le mode hors-ligne !';
            setTimeout(() => {
                const container = document.getElementById('cache-status-container');
                if (container) container.style.opacity = '0';
            }, 3000);
        } else {
            text.innerText = `Mise en cache... ${Math.round(Math.min(progress, 99))}%`;
        }
    }
}

window.addEventListener('online', updateStatus);
window.addEventListener('offline', updateStatus);

function updateStatus() {
    const status = document.getElementById('network-status');
    if (!status) return;
    if (navigator.onLine) {
        status.innerText = 'En ligne';
        status.classList.remove('offline');
    } else {
        status.innerText = 'Hors-ligne';
        status.classList.add('offline');
    }
}
updateStatus();
