/* GymBabe service worker.
   Estratégia: cache-first para os arquivos do app, porque o wi-fi de academia
   é ruim e o app precisa abrir instantaneamente. A versão no nome do cache é
   o que dispara a atualização: ao publicar uma versão nova, o navegador baixa
   tudo de novo e descarta o cache antigo na próxima abertura. */

const VERSION = 'gymbabe-v3';
const ASSETS = [
  "./",
  "index.html",
  "manifest.webmanifest",
  "icon-192.png",
  "icon-512.png",
  "icon-maskable-512.png",
  "svg/wg-dumbbell-sumo-squat-1.svg",
  "svg/wg-dumbbell-sumo-squat-2.svg",
  "svg/Squats-4-1.svg",
  "svg/Squats-4-2.svg",
  "svg/wg-squat-1.svg",
  "svg/wg-squat-2.svg",
  "svg/wg-hip-thrust-1.svg",
  "svg/wg-hip-thrust-2.svg",
  "svg/wg-single-leg-glute-bridge-1.svg",
  "svg/wg-single-leg-glute-bridge-2.svg",
  "svg/Bridge-1.svg",
  "svg/Bridge-2.svg",
  "svg/wg-leg-press-1.svg",
  "svg/wg-leg-press-2.svg",
  "svg/wg-lying-leg-curl-1.svg",
  "svg/wg-lying-leg-curl-2.svg",
  "svg/wg-seated-leg-curl-1.svg",
  "svg/wg-seated-leg-curl-2.svg",
  "svg/wg-leg-extension-1.svg",
  "svg/wg-leg-extension-2.svg",
  "svg/wg-hip-abduction-machine-1.svg",
  "svg/wg-hip-abduction-machine-2.svg",
  "svg/wg-hip-adduction-machine-1.svg",
  "svg/wg-hip-adduction-machine-2.svg",
  "svg/wg-machine-glute-kickback-1.svg",
  "svg/wg-machine-glute-kickback-2.svg",
  "svg/wg-standing-calf-raise-1.svg",
  "svg/wg-standing-calf-raise-2.svg",
  "svg/wg-romanian-deadlift-1.svg",
  "svg/wg-romanian-deadlift-2.svg",
  "svg/Lunges-2-1.svg",
  "svg/Lunges-2-2.svg",
  "svg/wg-rope-tricep-pushdown-1.svg",
  "svg/wg-rope-tricep-pushdown-2.svg",
  "svg/wg-tricep-pushdown-1.svg",
  "svg/wg-tricep-pushdown-2.svg",
  "svg/Standing-biceps-curl-1.svg",
  "svg/Standing-biceps-curl-2.svg",
  "svg/wg-bicep-curl-1.svg",
  "svg/wg-bicep-curl-2.svg",
  "svg/wg-ez-bar-curl-1.svg",
  "svg/wg-ez-bar-curl-2.svg",
  "svg/Dumbbell-lateral-raises-1.svg",
  "svg/Dumbbell-lateral-raises-2.svg",
  "svg/One-arm-shoulder-press-1.svg",
  "svg/One-arm-shoulder-press-2.svg",
  "svg/wg-seated-dumbbell-press-1.svg",
  "svg/wg-seated-dumbbell-press-2.svg",
  "svg/wg-machine-chest-press-1.svg",
  "svg/wg-lat-pulldown-1.svg",
  "svg/wg-lat-pulldown-2.svg",
  "svg/Rear-deltoid-row-1.svg",
  "svg/Rear-deltoid-row-2.svg",
  "svg/wg-machine-row-1.svg",
  "svg/wg-machine-row-2.svg",
  "svg/wg-seated-row-1.svg",
  "svg/wg-seated-row-2.svg",
  "svg/wg-barbell-row-1.svg",
  "svg/wg-barbell-row-2.svg",
  "svg/wg-plank-1.svg"
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(VERSION)
      // Um arquivo faltando no servidor não pode impedir a instalação do resto.
      .then((cache) => Promise.all(ASSETS.map((url) => cache.add(url).catch(() => {}))))
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
