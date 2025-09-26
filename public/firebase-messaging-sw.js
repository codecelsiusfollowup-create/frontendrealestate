// public/firebase-messaging-sw.js
importScripts('https://www.gstatic.com/firebasejs/10.2.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.2.0/firebase-messaging-compat.js');

firebase.initializeApp({
  apiKey: "AIzaSyDs3cn7tsze70h6EBwlhHh643_VRPlbVFY",
  authDomain: "message-44d8d.firebaseapp.com",
  projectId: "message-44d8d",
  storageBucket: "message-44d8d.appspot.com",
  messagingSenderId: "234572466119",
  appId: "1:234572466119:web:c6886b0440fff84a683be2",
  measurementId: "G-SW8DMN8XN6"
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage(function(payload) {
  console.log('[firebase-messaging-sw.js] Background message ', payload);

  const title = payload.notification?.title || payload.data?.title || "New Notification";
  const options = {
    body: payload.notification?.body || payload.data?.body || "",
    icon: payload.notification?.icon || "/logo192.png",
  };

  self.registration.showNotification(title, options);
});
