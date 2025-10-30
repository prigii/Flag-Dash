const CACHE_NAME = 'flag-dash-v2'; // Incremented version to force update
const urlsToCache = [
  '/',
  '/index.html',
  '/src/index.tsx',
  '/src/App.tsx',
  '/src/components/MainMenu.tsx',
  '/src/components/GameBoard.tsx',
  '/src/components/OptionButton.tsx',
  '/src/components/EndScreen.tsx',
  '/src/components/StatsDisplay.tsx',
  '/metadata.json',
  'https://cdn.tailwindcss.com',
  'https://aistudiocdn.com/react@^19.2.0',
  'https://aistudiocdn.com/react-dom@^19.2.0/'
];

// Install event: open a cache and add the core app shell files to it.
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});

// Fetch event: serve assets from cache or network.
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Cache hit - return response
        if (response) {
          return response;
        }

        // Clone the request because it's a stream and can only be consumed once.
        const fetchRequest = event.request.clone();

        return fetch(fetchRequest).then(
          response => {
            // Check if we received a valid response. We don't cache opaque responses (e.g. from no-cors requests).
            if (!response || response.status !== 200) {
              return response;
            }
             
            // We only want to cache GET requests for our assets or flag images
            const isCachable = event.request.method === 'GET' && 
                               (response.type === 'basic' || response.url.startsWith('https://flagcdn.com'));

            if (!isCachable) {
                return response;
            }

            // Clone the response because it's also a stream.
            const responseToCache = response.clone();

            caches.open(CACHE_NAME)
              .then(cache => {
                cache.put(event.request, responseToCache);
              });

            return response;
          }
        );
      })
    );
});

// Activate event: clean up old caches.
self.addEventListener('activate', event => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});