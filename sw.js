// Pulso do Treino: guarda o app para abrir sem internet.
// A página vem da rede quando há conexão (assim as atualizações chegam) e do cache quando não há.
const CACHE = 'pulso-do-treino-v4';
// mapas: a biblioteca do mapa e os pedaços (tiles) já vistos, com limite para não crescer sem fim
const CACHE_MAPA = 'pulso-do-treino-mapas';
const MAX_TILES = 600;
const ARQUIVOS = ['./', 'manifest.webmanifest', 'icones/icone-192.png', 'icones/icone-512.png', 'icones/icone-maskable-512.png', 'icones/apple-touch-icon.png', 'icones/favicon-32.png'];

self.addEventListener('install', ev => {
  ev.waitUntil(caches.open(CACHE).then(c => c.addAll(ARQUIVOS)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', ev => {
  ev.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== CACHE && k !== CACHE_MAPA).map(k => caches.delete(k)))).then(() => self.clients.claim()));
});

self.addEventListener('fetch', ev => {
  const req = ev.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  if (req.mode === 'navigate') {
    ev.respondWith(fetch(req).then(r => {
      if (r.ok) { const copia = r.clone(); caches.open(CACHE).then(c => c.put('./', copia)); }
      return r;
    }).catch(() => caches.match('./')));
    return;
  }
  if (url.hostname === 'cdnjs.cloudflare.com' || url.hostname.endsWith('.basemaps.cartocdn.com')) {
    ev.respondWith(caches.open(CACHE_MAPA).then(c => c.match(req).then(salvo => salvo || fetch(req).then(r => {
      if (r.ok || r.type === 'opaque') { c.put(req, r.clone()).then(() => aparar(c)); }
      return r;
    }))));
    return;
  }
  const fonte = url.hostname === 'fonts.googleapis.com' || url.hostname === 'fonts.gstatic.com';
  if (url.origin !== self.location.origin && !fonte) return;
  ev.respondWith(caches.match(req).then(salvo => salvo || fetch(req).then(r => {
    if (r.ok || r.type === 'opaque') { const copia = r.clone(); caches.open(CACHE).then(c => c.put(req, copia)); }
    return r;
  })));
});

async function aparar(c) {
  const ks = await c.keys();
  const tiles = ks.filter(k => k.url.includes('basemaps.cartocdn.com'));
  for (const k of tiles.slice(0, Math.max(0, tiles.length - MAX_TILES))) await c.delete(k);
}
