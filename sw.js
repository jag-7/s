const CACHE_NAME = 'indus-electric-v1.0.0';
const urlsToCache = [
  '/',
  '/index.html',
  '/contactos.html',
  '/portfolio.html',
  '/serviços.html',
  '/sobre-nós.html',
  '/css/style.css',
  '/css/portfolio.css',
  '/css/servicos.css',
  '/js/global.js',
  '/js/portfolio.js',
  '/js/contact-form.js',
  '/Imagens/logo.png',
  '/manifest.json'
];

// Install event - cache resources
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});

// Fetch event - serve from cache if available
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Return cached version or fetch from network
        return response || fetch(event.request);
      }
    )
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE_NAME) {
            console.log('Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

// Background sync for offline form submissions
self.addEventListener('sync', event => {
  if (event.tag === 'background-sync') {
    event.waitUntil(doBackgroundSync());
  }
});

function doBackgroundSync() {
  // Handle offline form submissions
  return new Promise((resolve, reject) => {
    // Implementation for offline form handling
    resolve();
  });
} 