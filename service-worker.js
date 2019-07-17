const PRECACHE = 'precache-v1';
const RUNTIME = 'runtime';

// A list of local resources we always want to be cached.
const PRECACHE_URLS = [
	'./', // Alias for index.html
	'main.js',
	'manifest.json',
	'icon_512x512.png',
	'assets/kitty.jpeg',
	'assets/style.css',
	'assets/additional.css',
];


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
	if (event.request.url.startsWith(self.location.origin)) {
		event.respondWith(
			caches.match(event.request).then(cachedResponse => {
				if (cachedResponse) {
					return cachedResponse;
				}
			})
		);
	}

	if (event.request.url.match(/icon_512x512/)) {
		return;
	}

	if (event.request.destination === 'image') {
		if (!navigator.onLine) {
			event.respondWith(caches.match('assets/kitty.jpeg'));
		}
	}
});
