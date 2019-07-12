let imageWidth =  Math.round(window.innerWidth / 3);

const onResize = (ev) => {
  const width = ev.currentTarget.innerWidth;

  imageWidth = Math.round(width / 3);
  console.log(imageWidth);
}


if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('service-worker.js');

  navigator.serviceWorker.ready
  .then( (registration) => {
    if (registration.active) {

      window.onresize = onResize;

      registration.active.postMessage(imageWidth);

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
