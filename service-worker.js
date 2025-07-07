

const CACHE_NAME = 'pdf-cache-v2'; // Change this version each update

const FILES_TO_CACHE = [
  '/PDFviewer-2',
  '/PDFviewer-2/index.html',
  '/PDFviewer-2/Centaur.woff2',
  '/PDFviewer-2/manifest.json',
  '/PDFviewer-2/jquery.min.js',
  '/PDFviewer-2/icon.png'
  // Add all necessary assets — ONLY those that exist!
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(FILES_TO_CACHE);
    })
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(
        keys.map(key => {
          if (key !== CACHE_NAME) {
            return caches.delete(key); // Delete old versions
          }
        })
      );
    })
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});