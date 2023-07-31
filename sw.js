@ -1,84 +0,0 @@
var CACHE = 'WakeUp_Cache';

// On install, cache some resources.
self.addEventListener('install', function(evt) {
  console.log('The service worker is being installed.');

  // Ask the service worker to keep installing until the returning promise
  // resolves.
  evt.waitUntil(precache());
});

// On fetch, use cache but update the entry with the latest contents
// from the server.
self.addEventListener('fetch', function(evt) {
  console.log('The service worker is serving the asset.');
  // You can use `respondWith()` to answer immediately, without waiting for the
  // network response to reach the service worker...
  evt.respondWith(fromCache(evt.request));
  // ...and `waitUntil()` to prevent the worker from being killed until the
  // cache is updated.
  evt.waitUntil(update(evt.request));
});

// Open a cache and use `addAll()` with an array of assets to add all of them
// to the cache. Return a promise resolving when all the assets are added.
function precache() {
  return caches.open(CACHE).then(function (cache) {
    return cache.addAll([
      './index.html',
      './aframe/aframe.min.js'
      './audio/bird.mp3'
      './audio/cafe1.mp3'
      './audio/rain-inside.mp3'
      './audio/rain-light.mp3'
      './audio/rain-start.mp3'
      './audio/thunder.mp3'
      './images/arrow.png'
      './images/bedroom.jpg'
      './images/circle.png'
      './images/coffee.png'
      './images/controller.png'
      './images/greenstand.jpg'
      './images/login.png'
      './images/phone-back.png'
      './images/phone-bedroom.png'
      './images/phone-walk.png'
      './images/phone.png'
      './images/walk1.jpg'
      './video/back1.mp4'
      './video/back2.mp4'
      './video/back3.mp4'
      './video/bedroom.mp4'
      './video/final.mp4'
      './video/greenback.mp4'
      './video/greenhouse.mp4'
      './video/login.mp4'
      './video/out1.mp4'
      './video/out2.mp4'
      './video/wakeup1.mp4'
      './video/yard1.mp4'
    ]);
  });
}

// Open the cache where the assets were stored and search for the requested
// resource. Notice that in case of no matching, the promise still resolves
// but it does with `undefined` as value.
function fromCache(request) {
  return caches.open(CACHE).then(function (cache) {
    return cache.match(request).then(function (matching) {
      return matching || Promise.reject('no-match');
    });
  });
}

// Update consists in opening the cache, performing a network request and
// storing the new response data.
function update(request) {
  return caches.open(CACHE).then(function (cache) {
    return fetch(request).then(function (response) {
      return cache.put(request, response);
    });
  });
}
