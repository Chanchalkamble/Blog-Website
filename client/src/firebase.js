// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAnalytics, isSupported } from "firebase/analytics";
import {
  getAuth,
  GoogleAuthProvider,
  setPersistence,
  browserLocalPersistence,
} from "firebase/auth";
import { getStorage } from "firebase/storage";

// ✅ Firebase configuration (from Vite environment variables)
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN, // Example: myapp.firebaseapp.com
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
};

// ✅ Initialize Firebase
const app = initializeApp(firebaseConfig);

// ✅ Initialize Authentication
const auth = getAuth(app);

// ✅ Keep user signed in even after page refresh
setPersistence(auth, browserLocalPersistence)
  .then(() => {
    console.log("✅ Firebase Auth persistence set to LOCAL.");
  })
  .catch((error) => {
    console.error("❌ Error setting auth persistence:", error);
  });

// ✅ Google Auth Provider setup
const provider = new GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });

// ✅ Initialize Firebase Storage (for uploads like profile images)
const storage = getStorage(app);

// ✅ Initialize Analytics only if supported (prevents SSR issues)
let analytics;
isSupported().then((supported) => {
  if (supported) {
    analytics = getAnalytics(app);
  }
});

// ✅ Export everything
export { app, auth, provider, storage, analytics };
export default app;
