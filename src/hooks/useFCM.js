import { useEffect } from "react";
import axios from "axios";
import { messaging, getToken, onMessage } from "../firebaseConfig"; // ✅ initialized messaging

export const useFCM = (staffId) => {
  useEffect(() => {
    if (!staffId) return;

    const requestToken = async () => {
      try {
        const permission = await Notification.requestPermission();
        if (permission !== "granted") return console.warn("Notification permission denied");

        const swRegistration = await navigator.serviceWorker.register("/firebase-messaging-sw.js");

        const token = await getToken(messaging, {
          vapidKey: "BC9GvlV4C2-XbwtOKHg0UzHmUcMMUJm_dNRFcESviCJanUNhxR0t6Tdcc3JYdaRC7oOK6dkTZavEcOWtGZpNho4",
          serviceWorkerRegistration: swRegistration,
        });

        if (!token) return console.warn("No FCM token generated");

        await axios.post("https://a-new-vercel.vercel.app/api/notifications/save-token", { staffId, token });
        console.log("✅ FCM token saved:", token);
      } catch (err) {
        console.error("FCM token error:", err);
      }
    };

    requestToken();

    onMessage(messaging, (payload) => {
      console.log("📩 Foreground notification received:", payload);
      alert(`Notification: ${payload.notification.title} - ${payload.notification.body}`);
    });
  }, [staffId]);
};
