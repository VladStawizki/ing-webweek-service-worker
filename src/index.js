let reg = null;
const images = document.querySelectorAll('img[data-src]');
const item = document.querySelector('.mdc-image-list__item');

const reloadImages = () => {
  images.forEach((image) => {
    image.setAttribute('src', `${image.getAttribute('src')}&t=${Date.now()}`);
  });
}

const onResize = (e) => {
  if (e.matches) {
    const item = document.querySelector('.mdc-image-list__item');
    const imageWidth = item.offsetWidth;
    if (reg && reg.active) {
      navigator.serviceWorker.postMessage(imageWidth);
      reloadImages();
    }
  }
}

const mql = window.matchMedia('(min-width: 780px)');
mql.addListener(onResize);

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('service-worker.js');

  navigator.serviceWorker.ready
  .then((registration) => {
    if (registration.active) {
      reg = registration;
      registration.active.postMessage(item.offsetWidth);

      // Cheap image lazy loading
      images.forEach((image) => {
        image.setAttribute('src', image.getAttribute('data-src'));
      });
    }
  });
} else {
  images.forEach((image) => {
    image.setAttribute('src', image.getAttribute('data-src'));
  });
}  
