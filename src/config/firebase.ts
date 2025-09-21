import { initializeApp } from "firebase/app";
import { getAuth, connectAuthEmulator } from "firebase/auth";

// Debug environment variables
console.log("Environment variables check:", {
  VITE_FIREBASE_API_KEY: import.meta.env.VITE_FIREBASE_API_KEY ? "✓ Found" : "✗ Missing",
  NODE_ENV: import.meta.env.NODE_ENV || "development"
});

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "AIzaSyCp-hqPwkmx0KkNYVxFBmrOg7ePVtJTpPM",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "mentalwellness-9685a.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "mentalwellness-9685a",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "mentalwellness-9685a.firebasestorage.app",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "263603657751",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:263603657751:web:aec7081dafb3908ecad052",
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID || "G-5FGE63BSXL",
};

// Validate API key before initializing
if (!firebaseConfig.apiKey || firebaseConfig.apiKey === "undefined") {
  console.error("Firebase API key is missing or invalid!");
  throw new Error("Firebase configuration error: API key is required");
}

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Debug: Log configuration status
console.log("Firebase config loaded:", {
  hasApiKey: !!firebaseConfig.apiKey,
  apiKeyLength: firebaseConfig.apiKey?.length,
  authDomain: firebaseConfig.authDomain,
  projectId: firebaseConfig.projectId
});

// Configure auth settings for production
if (import.meta.env.PROD) {
  console.log("Production mode: Firebase auth configured for", window.location.hostname);
}

// Only connect to emulator in development
if (import.meta.env.NODE_ENV === "development") {
  console.log("Development mode detected");
}

export { auth };
