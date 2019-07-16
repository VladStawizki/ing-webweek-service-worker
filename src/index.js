const dimetions = {
  smartphone: 731,
  tablet: 560,
  desktop: 218
}

let initialMq = 0;

const images = document.querySelectorAll('img[data-src]');

const reloadImages = () => {
	images.forEach(image => {
		image.setAttribute('src', `${image.getAttribute('src')}`);
	});
};

const cbSmartphone = e => {
  if (e.matches) {
    navigator.serviceWorker.ready.then(registration => {
			if (registration.active) {
        console.log('send-new-image-width', dimetions.smartphone);
				registration.active.postMessage(dimetions.smartphone);
			}
		});
  }
}

const cbTablet = e => {
  if (e.matches) {
    navigator.serviceWorker.ready.then(registration => {
			if (registration.active) {
        console.log('send-new-image-width', dimetions.tablet);
				registration.active.postMessage(dimetions.tablet);
			}
		});
  }
}

const cbDesktop = e => {
  if (e.matches) {
    navigator.serviceWorker.ready.then(registration => {
			if (registration.active) {
        console.log('send-new-image-width', dimetions.desktop);
				registration.active.postMessage(dimetions.desktop);
			}
		});
  }
}

const mqSmartphone = window.matchMedia('(min-width: 0px) and (max-width: 779px) ');
if(mqSmartphone.matches) {
	initialMq = dimetions.smartphone;
};
mqSmartphone.addListener(cbSmartphone);

const mqTablet = window.matchMedia('(min-width: 780px) and (max-width: 1199px) ');
if(mqTablet.matches) {
	initialMq = dimetions.tablet;
};
mqTablet.addListener(cbTablet);

const mqDesktop = window.matchMedia('(min-width: 1200px)');
if(mqDesktop.matches) {
	initialMq = dimetions.desktop;
};
mqDesktop.addListener(cbDesktop);

if ('serviceWorker' in navigator) {
	navigator.serviceWorker.register('service-worker.js');

	navigator.serviceWorker.ready.then(registration => {
		if (registration.active) {
			registration.active.postMessage(initialMq);

			// Cheap image lazy loading
			images.forEach(image => {
				image.setAttribute('src', image.getAttribute('data-src'));
			});
		}
	});

	navigator.serviceWorker.addEventListener('message', (event) => {
		console.log('Client Received Message: ' + event.data);
		reloadImages();
	});

} else {
	images.forEach(image => {
		image.setAttribute('src', image.getAttribute('data-src'));
	});
}
