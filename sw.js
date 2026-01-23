const CACHE_NAME = 'audio-cache-v1';
const ASSETS_TO_CACHE = [
    './',
    'index.html',
    'index.css',
    'app.js',
    'playlist.js',
    'manifest.json',
    'icons/android/mipmap-xxxhdpi/ic_launcher.png',
    'icons/playstore.png',
    '00_sons/01_01_00_Au_Theatre_ce_Soir_generique-dailymotion-x2sef7f-http-480-5.mp3',
    '00_sons/01_01_00_Au_Theatre_ce_Soir_generique-dailymotion-x2sef7f-http-480-5_v2.mp3',
    '00_sons/01_02_01_Le grand méchant loup (Les 3 petits cochons - en chanson) - Lucienne Vernay.mp3',
    '00_sons/01_02_02_Scène_de_crime_et_vidéo_générée.mp3',
    '00_sons/01_02_02_Scène_de_crime_et_vidéo_générée_v2.mp3',
    '00_sons/01_03_00 tempête.mp3',
    '00_sons/02_01_00_Arrivée de Mollie (radio).mp3',
    '00_sons/02_02_00_Arrivée de Gilles.mp3',
    '00_sons/02_04_00_ MOLLIE  et GILES flash actu radio pièce p 5_v2.mp3',
    '00_sons/03_02_00_Arrivée de Christopher.mp3',
    '00_sons/03_05_00_Gilles allume la radio et Mollie l éteind.mp3',
    '00_sons/04_01_00_Mme BOYLE  Heurtoir X2 énervée_v3.mp3',
    '00_sons/04_02_00_Arrivée de Mme Boyle.mp3',
    '00_sons/05_01_00_Giles va aider le MAJOR METCALF bruitage ouverture de porte appartement.mp3',
    '00_sons/05_04_00_Giles et le MAJOR METCALF entrent.mp3',
    '00_sons/06_01_00_Melle CASEWELL Heurtoir.mp3',
    '00_sons/06_03_00_Arrivée de Melle CASEWELL.mp3',
    '00_sons/07_01_00_Mme PARIVICINI Heurtoir.mp3',
    '00_sons/07_03_00_Arrivée de Mme PARIVICINI.mp3',
    '00_sons/08_01_00 Horloge_v2.mp3',
    '00_sons/09_01_00_ MAJOR METCALF sort dehors pour déneiger  open-and-close-door-405453 - Copie.mp3',
    '00_sons/09_02_00_GILES sort dehors pour déneiger open-and-close-door-405453 - Copie.mp3',
    '00_sons/10_01_00_p 21 22 Melle CASEWELL ecoute de la musique à baisser en trois fois puis couper Jazz Noël.mp3',
    '00_sons/11_01_00_p 21 acte 2 scène 5 Sonnerie téléphone fixe ancien (bruitage gratuit).mp3',
    '00_sons/11_02_00_p 21 GILES rentre de  dehors open-and-close-door-405453 - Copie.mp3',
    '00_sons/12_01_01_ p 25  acte 2 scène 9 TROTTER frappe à la fenêtre p 25 BRUIT DE TOC TOC A LA VITRE_v2.mp3',
    '00_sons/12_02_00_GILES fait rentrer TROTTER open-and-close-door-405453 - Copie - Copie.mp3',
    '00_sons/14_01_00 p33 air piano maladroit trois petits cochons.mp3',
    '00_sons/15_01_00_p35 meurtre_v2.mp3',
    '00_sons/16_01_00_Trotter allume la radio puis l’éteint_v3.mp3',
    '00_sons/17_01_00_p 61 acte 3 scène 14 MOLLIE commence à jouer à la demande de TROTTER Pianola Qui a peur du grand méchant loup (Piano solo).mp3',
    '00_sons/18_00_00_ LE FINAL Grand méchant loup instrumentale.mp3'
];

self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            return cache.addAll(ASSETS_TO_CACHE);
        })
    );
});

self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cacheName) => {
                    if (cacheName !== CACHE_NAME) {
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});

self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request).then((response) => {
            return response || fetch(event.request);
        })
    );
});
