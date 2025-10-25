const CACHE = 'sudh-cache-v1';
const FILES = [
  '/',
  '/index.html',
  '/product.html',
  '/contact.html',
  '/styles.css',
  '/script.js'
];

self.addEventListener('install', evt => {
  evt.waitUntil(caches.open(CACHE).then(c => c.addAll(FILES)));
  self.skipWaiting();
});

self.addEventListener('activate', evt => {
  evt.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', evt => {
  evt.respondWith(
    caches.match(evt.request).then(resp => resp || fetch(evt.request))
  );
});
