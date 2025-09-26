// src/firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getMessaging } from "firebase/messaging";

const firebaseConfig = {
  apiKey: "AIzaSyDs3cn7tsze70h6EBwlhHh643_VRPlbVFY",
  authDomain: "message-44d8d.firebaseapp.com",
  projectId: "message-44d8d",
  storageBucket: "message-44d8d.appspot.com",
  messagingSenderId: "234572466119",
  appId: "1:234572466119:web:c6886b0440fff84a683be2",
  measurementId: "G-SW8DMN8XN6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize messaging
export const messaging = getMessaging(app);
