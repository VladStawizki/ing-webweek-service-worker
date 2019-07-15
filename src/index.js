const dimetions = {
  smartphone: 731,
  tablet: 368,
  desktop: 218
}

const images = document.querySelectorAll('img[data-src]');

const reloadImages = () => {
	images.forEach(image => {
		image.setAttribute('src', `${image.getAttribute('src')}&t=${Date.now()}`);
	});
};

const cbSmartphone = e => {
  if (e.matches) {
    navigator.serviceWorker.ready.then(registration => {
			if (registration.active) {
        console.log('send-new-image-width', dimetions.smartphone);
				registration.active.postMessage(dimetions.smartphone);
				reloadImages();
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
				reloadImages();
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
				reloadImages();
			}
		});
  }
}

const mqSmartphone = window.matchMedia('(min-width: 0px) and (max-width: 779px) ');
mqSmartphone.addListener(cbSmartphone);

const mqTablet = window.matchMedia('(min-width: 780px) and (max-width: 1199px) ');
mqTablet.addListener(cbTablet);

const mqDesktop = window.matchMedia('(min-width: 1200px)');
mqDesktop.addListener(cbDesktop);

if ('serviceWorker' in navigator) {
	navigator.serviceWorker.register('service-worker.js');

	navigator.serviceWorker.ready.then(registration => {
		if (registration.active) {
      console.log('imageWidth', dimetions.smartphone)
			registration.active.postMessage(dimetions.smartphone);

			// Cheap image lazy loading
			images.forEach(image => {
				image.setAttribute('src', image.getAttribute('data-src'));
			});
		}
	});
} else {
	images.forEach(image => {
		image.setAttribute('src', image.getAttribute('data-src'));
	});
}
