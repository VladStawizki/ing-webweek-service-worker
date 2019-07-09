
self.addEventListener('install', event => {
  console.log('The service worker is being installed.');
});

self.addEventListener('fetch', event => {
  console.log('service-worker url', event.request);
});
