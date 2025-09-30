// public/firebase-messaging-sw.js

importScripts('https://www.gstatic.com/firebasejs/10.2.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.2.0/firebase-messaging-compat.js');

// ✅ Initialize Firebase
firebase.initializeApp({
  apiKey: "AIzaSyDs3cn7tsze70h6EBwlhHh643_VRPlbVFY",
  authDomain: "message-44d8d.firebaseapp.com",
  projectId: "message-44d8d",
  storageBucket: "message-44d8d.appspot.com",
  messagingSenderId: "234572466119",
  appId: "1:234572466119:web:c6886b0440fff84a683be2",
  measurementId: "G-SW8DMN8XN6"
});

// ✅ Initialize Messaging
const messaging = firebase.messaging();

// ✅ Handle background notifications
messaging.onBackgroundMessage(function (payload) {
  console.log('[firebase-messaging-sw.js] 📩 Background message received:', payload);

  const notificationTitle = payload.notification?.title || payload.data?.title || "New Notification";
  const notificationOptions = {
    body: payload.notification?.body || payload.data?.body || "",
    icon: payload.notification?.icon || "/logo192.png",
    data: {
      url: "/staff" // ✅ Redirect target
    }
  };

  // ✅ Show notification
  return self.registration.showNotification(notificationTitle, notificationOptions);
});

// ✅ Handle notification click
self.addEventListener("notificationclick", function (event) {
  console.log("🖱️ Notification clicked:", event.notification);
  event.notification.close();

  const targetUrl = event.notification.data?.url || "/staff";

  // ✅ Focus existing tab or open new
  event.waitUntil(
    clients.matchAll({ type: "window", includeUncontrolled: true }).then((clientList) => {
      for (const client of clientList) {
        if (client.url.includes(targetUrl) && "focus" in client) {
          return client.focus();
        }
      }
      if (clients.openWindow) {
        return clients.openWindow(targetUrl);
      }
    })
  );
});