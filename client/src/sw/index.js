const PRECACHE = 'static-v1';

const PRECACHE_URLS = [
  '/assets/index.js',
];

self.addEventListener('install', (event) => { // eslint-disable-line no-restricted-globals
  event.waitUntil(
    caches.open(PRECACHE)
      .then(cache => cache.addAll(PRECACHE_URLS))
      .then(self.skipWaiting()), // eslint-disable-line no-restricted-globals
  );
});
