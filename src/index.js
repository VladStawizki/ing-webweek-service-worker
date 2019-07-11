if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('service-worker.js');

  navigator.serviceWorker.ready
  .then( (registration) => {
    if (registration.active) {
      registration.active.postMessage(200);

      document.querySelectorAll('img[data-src]').forEach((image) => {
        image.setAttribute('src', image.getAttribute('data-src'));
      });
    }
  });
}
