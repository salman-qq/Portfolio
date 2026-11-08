/**
 * Lightweight Offline-First Service Worker for Salman Alharbi's Portfolio
 * Ensures instant loading at conferences (e.g., Hajj Forum) even with weak or zero connectivity.
 */
const CACHE_NAME = 'salman-portfolio-v3';
const CORE_ASSETS = [
  './',
  './index.html',
  './manifest.json',
  './css/styles.css',
  './js/i18n-data.js',
  './js/app.js',
  './SALMAN-ALHARBI-Resume.pdf',
  './Salman_Alharbi.vcf',
  './assets/qr-vcard.svg',
  './assets/qr-cv.svg',
  './assets/qr-portfolio.svg'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(CORE_ASSETS)).catch(() => {})
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
          return null;
        })
      )
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return;
  event.respondWith(
    fetch(event.request)
      .then((networkRes) => {
        if (networkRes && networkRes.status === 200 && event.request.url.startsWith(self.location.origin)) {
          const clone = networkRes.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(event.request, clone)).catch(() => {});
        }
        return networkRes;
      })
      .catch(() =>
        caches.match(event.request).then((cachedRes) => {
          if (cachedRes) return cachedRes;
          if (event.request.mode === 'navigate') {
            return caches.match('./index.html');
          }
          return null;
        })
      )
  );
});
