let reg = null;

const item = document.querySelector('.mdc-image-list__item');

const onResize = (e) => {
  if (e.matches) {
    const item = document.querySelector('.mdc-image-list__item');
    const imageWidth = item.offsetWidth;
    if (reg && reg.active) {
      reg.active.postMessage(imageWidth);
    }
  }
}

const mql = window.matchMedia('(min-width: 780px)');
mql.addListener(onResize);

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('service-worker.js');

  navigator.serviceWorker.ready
  .then( (registration) => {
    if (registration.active) {
      reg = registration;
      registration.active.postMessage(item.offsetWidth);

      // Cheap image lazy loading
      document.querySelectorAll('img[data-src]').forEach((image) => {
        image.setAttribute('src', image.getAttribute('data-src'));
      });
    }
  });
} else {
  document.querySelectorAll('img[data-src]').forEach((image) => {
    image.setAttribute('src', image.getAttribute('data-src'));
  });
}  
