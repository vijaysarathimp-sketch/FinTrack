/* FINTRACK service worker — update CACHE_VERSION whenever app shell files change. */
const CACHE_VERSION = 'fintrack-shell-v2';
const SHELL_CACHE = `${CACHE_VERSION}-shell`;
const RUNTIME_CACHE = `${CACHE_VERSION}-runtime`;
const APP_SHELL = [
  './',
  './index.html',
  './manifest.webmanifest',
  './icons/icon.svg',
  './icons/icon-192.png',
  './icons/icon-512.png',
  './icons/icon-512-maskable.png'
];

self.addEventListener('install', event => {
  event.waitUntil((async () => {
    const cache = await caches.open(SHELL_CACHE);
    await cache.addAll(APP_SHELL);
    await self.skipWaiting();
  })());
});

self.addEventListener('activate', event => {
  event.waitUntil((async () => {
    const keys = await caches.keys();
    await Promise.all(keys.filter(key => ![SHELL_CACHE, RUNTIME_CACHE].includes(key)).map(key => caches.delete(key)));
    await self.clients.claim();
  })());
});

self.addEventListener('fetch', event => {
  const request = event.request;
  if (request.method !== 'GET') return;
  const url = new URL(request.url);

  // App navigation: try the latest hosted page first, then use the saved app shell offline.
  if (request.mode === 'navigate') {
    event.respondWith((async () => {
      try {
        const fresh = await fetch(request);
        const cache = await caches.open(SHELL_CACHE);
        cache.put('./index.html', fresh.clone());
        return fresh;
      } catch (_) {
        return (await caches.match('./index.html')) || (await caches.match('./'));
      }
    })());
    return;
  }

  // Cache same-origin app assets. External libraries/fonts use network-first with a cache fallback.
  if (url.origin === self.location.origin) {
    event.respondWith((async () => {
      const cached = await caches.match(request);
      if (cached) return cached;
      try {
        const response = await fetch(request);
        if (response && response.ok) {
          const cache = await caches.open(SHELL_CACHE);
          cache.put(request, response.clone());
        }
        return response;
      } catch (_) {
        return cached || Response.error();
      }
    })());
  } else if (url.hostname.includes('jsdelivr.net') || url.hostname.includes('googleapis.com') || url.hostname.includes('gstatic.com')) {
    event.respondWith((async () => {
      const cache = await caches.open(RUNTIME_CACHE);
      try {
        const response = await fetch(request);
        if (response && (response.ok || response.type === 'opaque')) cache.put(request, response.clone());
        return response;
      } catch (_) {
        return (await cache.match(request)) || Response.error();
      }
    })());
  }
});
