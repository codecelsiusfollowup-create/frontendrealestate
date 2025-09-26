// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getMessaging, getToken, onMessage } from "firebase/messaging";

// Your web app's Firebase configuration
const firebaseConfig = {
   apiKey: "AIzaSyDs3cn7tsze70h6EBwlhHh643_VRPlbVFY",
  authDomain: "message-44d8d.firebaseapp.com",
  projectId: "message-44d8d",
  storageBucket: "message-44d8d.firebasestorage.app",
  messagingSenderId: "234572466119",
  appId: "1:234572466119:web:c6886b0440fff84a683be2",
  measurementId: "G-SW8DMN8XN6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Initialize Firebase Cloud Messaging
const messaging = getMessaging(app);

// Export for use in other files
export { app, analytics, messaging, getToken, onMessage };
