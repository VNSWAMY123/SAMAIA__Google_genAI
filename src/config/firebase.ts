import { initializeApp } from "firebase/app";
import { getAuth, connectAuthEmulator } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCp-hqPwkmx0KkNYVxFBmrOg7ePVtJTpPM",
  authDomain: "mentalwellness-9685a.firebaseapp.com",
  projectId: "mentalwellness-9685a",
  storageBucket: "mentalwellness-9685a.appspot.com",
  messagingSenderId: "263603657751",
  appId: "1:263603657751:web:aec7081dafb3908ecad052",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Only connect to emulator in development
if (process.env.NODE_ENV === "development") {
  console.log("Using auth emulator");
}

export { auth };
