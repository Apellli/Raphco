
const staticCacheName = 'site-static-v1';
const assets = [
  '/',
  '/Raphco/index.html',
  '/assets/js/main.js',
  '/assets/js/scrollreveal.min.js',
  '/assets/css/styles.css',
  '/assets/img/logo-72x72.png',
  'https://fonts.googleapis.com/css?family=poppins:300,400,700',
  'https://cdn.jsdelivr.net/npm/remixicon@2.5.0/fonts/remixicon.css',
];
// install event
self.addEventListener('install', evt => {
  evt.waitUntil(
    caches.open(staticCacheName).then((cache) => {
      console.log('caching shell assets');
      cache.addAll(assets);
    })
  );
});
// activate event
self.addEventListener('activate', evt => {
  evt.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(keys
        .filter(key => key !== staticCacheName)
        .map(key => caches.delete(key))
      );
    })
  );
});
// When we change the name we could have multiple cache, to avoid that we need to delet the old cache, so with this function we check the key that is our cache naming, if it is different from the actual naming we delete it, in this way we will always have only the last updated cache.
// fetch event
self.addEventListener('fetch', evt => {
  evt.respondWith(
    caches.match(evt.request).then(cacheRes => {
      return cacheRes || fetch(evt.request);
    })
  );
});