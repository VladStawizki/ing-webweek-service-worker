const images = document.querySelectorAll('img[data-src]');

const loadImages = () => {
	// Cheap image lazy loading
	images.forEach(image => {
		image.setAttribute('src', image.getAttribute('data-src'));
	});
};

loadImages();

if ('serviceWorker' in navigator) {
	navigator.serviceWorker.register('service-worker.js');
}
