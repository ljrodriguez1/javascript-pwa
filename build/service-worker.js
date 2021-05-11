// Give the service worker access to Firebase Messaging.
// Note that you can only use Firebase Messaging here. Other Firebase libraries
// are not available in the service worker.
importScripts('https://www.gstatic.com/firebasejs/8.4.1/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.4.1/firebase-messaging.js');

let cacheName = "my-first-pwa";
let filesToCache = ["/", "/index.html", "/css/style.css", "main.js"];


/* Start the service worker and cache all of the app's content */
self.addEventListener("install", (e) => {
  var firebaseConfig = {
    apiKey: "AIzaSyD2eR7xpxrAOk320MjWSaQdu4_y2aVxA4s",
    authDomain: "pwa-reich.firebaseapp.com",
    databaseURL: "https://pwa-reich-default-rtdb.firebaseio.com",
    projectId: "pwa-reich",
    storageBucket: "pwa-reich.appspot.com",
    messagingSenderId: "213332410499",
    appId: "1:213332410499:web:3bdcfd4d86a53bf7919bb6"
  };
  if (firebase.apps.length === 0) {
    firebase.initializeApp(firebaseConfig);
  }
  
  // Retrieve an instance of Firebase Messaging so that it can handle background
  // messages.
  const messaging = firebase.messaging();
  
  // Handle incoming messages. Called when:
  // - a message is received while the app has focus
  // - the user clicks on an app notification created by a service worker
  //   `messaging.onBackgroundMessage` handler.
  messaging.onMessage((payload) => {
    // We make this in order to not display the message if the
    // user is within the app
    console.log('Message received. ', payload);
  });
  
  messaging.onBackgroundMessage((payload) => {
    console.log('[firebase-messaging-sw.js] Received background message ', payload);
    // Customize notification here
    const notificationTitle = 'Background Message Title';
    const notificationOptions = {
      body: 'Background Message body.',
      icon: '/images/pwa-icon-256.png'
    };
  
    self.registration.showNotification(notificationTitle,
      notificationOptions);
  });

  e.waitUntil(
    caches.open(cacheName).then(function (cache) {
      return cache.addAll(filesToCache);
    })
  );
});

/* Serve cached content when offline */
//self.addEventListener("fetch", (e) => {
//  e.respondWith(
//    caches.match(e.request).then((response) => {
//      return response || fetch(e.request);
//    })
//  );
//});