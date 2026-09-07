/* GymBabe service worker.
   Estratégia: cache-first para os arquivos do app, porque o wi-fi de academia
   é ruim e o app precisa abrir instantaneamente. A versão no nome do cache é
   o que dispara a atualização: ao publicar uma versão nova, o navegador baixa
   tudo de novo e descarta o cache antigo na próxima abertura. */

const VERSION = 'gymbabe-v1';
const ASSETS = [
  "./",
  "index.html",
  "manifest.webmanifest",
  "icon-192.png",
  "icon-512.png",
  "icon-maskable-512.png",
  "svg/Bridge-1.svg",
  "svg/Bridge-2.svg",
  "svg/Dumbbell-lateral-raises-1.svg",
  "svg/Dumbbell-lateral-raises-2.svg",
  "svg/Low-triceps-extension-1.svg",
  "svg/Low-triceps-extension-2.svg",
  "svg/Lunges-2-1.svg",
  "svg/Lunges-2-2.svg",
  "svg/One-arm-shoulder-press-1.svg",
  "svg/One-arm-shoulder-press-2.svg",
  "svg/Rear-deltoid-row-1.svg",
  "svg/Rear-deltoid-row-2.svg",
  "svg/Squats-4-1.svg",
  "svg/Squats-4-2.svg",
  "svg/Standing-biceps-curl-1.svg",
  "svg/Standing-biceps-curl-2.svg"
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(VERSION)
      .then((cache) => cache.addAll(ASSETS))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((k) => k !== VERSION).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return;
  event.respondWith(
    caches.match(event.request).then((hit) => {
      if (hit) {
        // Revalida em segundo plano: a próxima abertura já pega o arquivo novo.
        fetch(event.request)
          .then((fresh) => caches.open(VERSION).then((c) => c.put(event.request, fresh)))
          .catch(() => {});
        return hit;
      }
      return fetch(event.request).catch(() => caches.match('index.html'));
    })
  );
});
