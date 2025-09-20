import { initializeApp } from "firebase/app";
import { getAuth, connectAuthEmulator } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "AIzaSyCp-hqPwkmx0KkNYVxFBmrOg7ePVtJTpPM",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "mentalwellness-9685a.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "mentalwellness-9685a",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "mentalwellness-9685a.appspot.com",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "263603657751",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:263603657751:web:aec7081dafb3908ecad052",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Only connect to emulator in development
if (process.env.NODE_ENV === "development") {
  console.log("Using auth emulator");
}

export { auth };
