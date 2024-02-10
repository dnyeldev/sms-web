// Scripts for firebase and firebase messaging
importScripts('https://www.gstatic.com/firebasejs/8.10.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.10.0/firebase-messaging.js');

// Initialize the Firebase app in the service worker by passing the generated config
const firebaseConfig = {
  apiKey: 'AIzaSyD1HZmwDKjZ3lZYinys8OpBwKYFMsE1qEg',
  authDomain: 'learnlab-348303.firebaseapp.com',
  projectId: 'learnlab-348303',
  storageBucket: 'learnlab-348303.appspot.com',
  messagingSenderId: '392553556106',
  appId: '1:392553556106:web:b8fdfa292fd8a33856e573',
  measurementId: 'G-88041PHN67',
};

// Initialize Firebase
// eslint-disable-next-line no-undef
firebase.initializeApp(firebaseConfig);

// Retrieve firebase messaging
// eslint-disable-next-line no-undef
const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  console.log('Received background message 11 ', payload);

  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
  };

  // eslint-disable-next-line no-restricted-globals
  self.registration.showNotification(
    notificationTitle,
    notificationOptions,
  );
});
