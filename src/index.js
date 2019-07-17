const dimensions = {
	smartphone: 731,
	tablet: 560,
	desktop: 218,
};

let initialMq = 0;

const images = document.querySelectorAll('img[data-src]');

const loadImages = () => {
	// Cheap image lazy loading
	images.forEach(image => {
		image.setAttribute('src', image.getAttribute('data-src'));
	});
};

const cbSmartphone = e => {
	if (e.matches) {
		navigator.serviceWorker.ready.then(registration => {
			if (registration.active) {
				console.log('send-new-image-width', dimensions.smartphone);
				registration.active.postMessage(dimensions.smartphone);
			}
		});
	}
};

const cbTablet = e => {
	if (e.matches) {
		navigator.serviceWorker.ready.then(registration => {
			if (registration.active) {
				console.log('send-new-image-width', dimensions.tablet);
				registration.active.postMessage(dimensions.tablet);
			}
		});
	}
};

const cbDesktop = e => {
	if (e.matches) {
		navigator.serviceWorker.ready.then(registration => {
			if (registration.active) {
				console.log('send-new-image-width', dimensions.desktop);
				registration.active.postMessage(dimensions.desktop);
			}
		});
	}
};

const mqSmartphone = window.matchMedia('(min-width: 0px) and (max-width: 779px) ');
if (mqSmartphone.matches) {
	initialMq = dimensions.smartphone;
}
mqSmartphone.addListener(cbSmartphone);

const mqTablet = window.matchMedia('(min-width: 780px) and (max-width: 1199px) ');
if (mqTablet.matches) {
	initialMq = dimensions.tablet;
}
mqTablet.addListener(cbTablet);

const mqDesktop = window.matchMedia('(min-width: 1200px)');
if (mqDesktop.matches) {
	initialMq = dimensions.desktop;
}
mqDesktop.addListener(cbDesktop);

if ('serviceWorker' in navigator) {
	navigator.serviceWorker.register('service-worker.js');

	navigator.serviceWorker.ready.then(registration => {
		if (registration.active) {
			registration.active.postMessage(initialMq);

			loadImages();
		}
	});

	navigator.serviceWorker.addEventListener('message', event => {
		console.log('Client Received Message: ' + event.data);
		loadImages();
	});
} else {
	loadImages();
}
