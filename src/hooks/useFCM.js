// src/hooks/useFCM.js
import { useEffect, useRef } from "react";
import axios from "axios";
import { messaging } from "../firebaseConfig";
import { getToken, onMessage } from "firebase/messaging";
import { useNavigate } from "react-router-dom";

export const useFCM = (staffId) => {
  const navigate = useNavigate();
  const isInitialized = useRef(false); 

  useEffect(() => {
    if (!staffId || isInitialized.current) return;
    isInitialized.current = true;

    const setupFCM = async () => {
      try {
        // 1️⃣ Ask permission
        const permission = await Notification.requestPermission();
        if (permission !== "granted") {
          console.warn("🚫 Notification permission denied");
          return;
        }

        // 2️⃣ Register service worker
        const swRegistration = await navigator.serviceWorker.register("/firebase-messaging-sw.js");
        console.log("✅ Service Worker registered:", swRegistration);

        // 3️⃣ Get FCM token
        const token = await getToken(messaging, {
          vapidKey: "BI5tHNHhx-IqcnGkVOtQsakOk94qxuD_ywNsTVj6FVCJm93Ithoh2UUrpjQGwgLLUEI3NptQS-MyWlS7gmoZXQs",
          serviceWorkerRegistration: swRegistration,
        });

        if (!token) {
          console.warn("⚠️ No FCM token generated");
          return;
        }

        // 4️⃣ Save token to backend
        await axios.post("https://backend-six-plum-52.vercel.app/api/notifications/save-token", {
          staffId,
          token,
        });
        console.log("✅ FCM token saved:", token);

        // 5️⃣ Foreground notification listener
        onMessage(messaging, (payload) => {
          console.log("📩 Foreground notification received:", payload);

          if (Notification.permission === "granted") {
            const notificationTitle =
              payload.notification?.title || payload.data?.title || "New Notification";
            const notificationBody =
              payload.notification?.body || payload.data?.body || "";

            // ✅ Show notification
            const notification = new Notification(notificationTitle, {
              body: notificationBody,
              icon: payload.notification?.icon || "/logo192.png",
            });

            // ✅ Click event → go to staff dashboard
            notification.onclick = () => {
              window.focus();
              navigate("/staff");
            };
          }
        });
      } catch (err) {
        console.error("❌ FCM setup error:", err);
      }
    };

    setupFCM();
  }, [staffId, navigate]);
};