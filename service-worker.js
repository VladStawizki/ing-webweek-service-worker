
const PRECACHE = "precache-v1";
const RUNTIME = "runtime";

// A list of local resources we always want to be cached.
const PRECACHE_URLS = [
  "./", // Alias for index.html
  "main.js",
  "assets/kitty.jpeg",
  "assets/style.css",
];

let clientImageWidth = 300;

self.addEventListener('install', event => {
  console.log('The service worker is being installed.');
  event.waitUntil(
    caches
      .open(PRECACHE)
      .then(cache => cache.addAll(PRECACHE_URLS))
      .then(self.skipWaiting())
  );
});

self.addEventListener('fetch', event => {
  // console.log('service-worker url', event.request);
  // console.log('navigator.connection.effectiveType', navigator.connection.effectiveType);

  if (event.request.url.startsWith(self.location.origin)) {
    event.respondWith(
      caches.match(event.request).then(cachedResponse => {
        if (cachedResponse) {
          return cachedResponse;
        }
      })
    );
  }

  if (event.request.destination === 'image' ) {
    if (!navigator.onLine) {
      event.respondWith(caches.match('assets/kitty.jpeg'));

    } else {
      event.respondWith(
        fetch(event.request.url.replace(/w=\d+/, `w=${clientImageWidth}`).replace(/h=\d+/, `h=${clientImageWidth}`))
      )
      // TODO: Size
      // TODO quality
    }
  }
});

self.addEventListener("message", (evt) => {
  const client = evt.source;
  clientImageWidth = evt.data;
});
