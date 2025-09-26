// src/hooks/useFCM.js
import { useEffect } from "react";
import axios from "axios";
import { messaging } from "../firebaseConfig";
import { getToken, onMessage } from "firebase/messaging";

export const useFCM = (staffId) => {
  useEffect(() => {
    if (!staffId) return;

    const requestToken = async () => {
      try {
        const permission = await Notification.requestPermission();
        if (permission !== "granted") {
          console.warn("🚫 Notification permission denied");
          return;
        }

        // Register Service Worker
        const swRegistration = await navigator.serviceWorker.register("/firebase-messaging-sw.js");
        console.log("✅ Service Worker registered:", swRegistration);

        // Get FCM token
        const token = await getToken(messaging, {
          vapidKey: "BC9GvlV4C2-XbwtOKHg0UzHmUcMMUJm_dNRFcESviCJanUNhxR0t6Tdcc3JYdaRC7oOK6dkTZavEcOWtGZpNho4",
          serviceWorkerRegistration: swRegistration,
        });

        if (!token) return console.warn("No FCM token generated");

        await axios.post("https://backend-six-indol-62.vercel.app/api/notifications/save-token", { staffId, token });
        console.log("✅ FCM token saved:", token);
      } catch (err) {
        console.error("FCM token error:", err);
      }
    };

    requestToken();

    // Foreground notifications
    onMessage(messaging, (payload) => {
      console.log("📩 Foreground notification received:", payload);

      if (Notification.permission === "granted") {
        new Notification(payload.notification?.title || payload.data?.title || "New Notification", {
          body: payload.notification?.body || payload.data?.body || "",
          icon: payload.notification?.icon || "/logo192.png",
        });
      }
    });
  }, [staffId]);
};
