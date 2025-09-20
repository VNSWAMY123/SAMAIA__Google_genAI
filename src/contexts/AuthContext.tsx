import { createContext, useContext, useEffect, useState } from "react";
import {
  GoogleAuthProvider,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signOut,
  onAuthStateChanged,
  User,
} from "firebase/auth";
import { auth } from "../config/firebase";

interface AuthContextType {
  currentUser: User | null;
  loading: boolean;
  signup: (email: string, password: string) => Promise<void>;
  signin: (email: string, password: string) => Promise<void>;
  signInWithGoogle: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  async function signup(email: string, password: string) {
    try {
      console.log("Attempting to create user with email:", email);
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      console.log("User created successfully:", userCredential.user.uid);
    } catch (error: any) {
      console.error("Signup error:", error);
      if (error.code === "auth/operation-not-allowed") {
        throw new Error(
          "Email/Password sign-up is not enabled. Please check Firebase Console settings."
        );
      }
      throw new Error(error.message || "Failed to create account");
    }
  }

  async function signin(email: string, password: string) {
    try {
      console.log("Attempting to sign in with email:", email);
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      console.log("User signed in successfully:", userCredential.user.uid);
    } catch (error: any) {
      console.error("Sign in error:", error);
      if (error.code === "auth/operation-not-allowed") {
        throw new Error(
          "Email/Password sign-in is not enabled. Please check Firebase Console settings."
        );
      } else if (error.code === "auth/wrong-password") {
        throw new Error("Incorrect password");
      } else if (error.code === "auth/user-not-found") {
        throw new Error("No account exists with this email");
      } else if (error.code === "auth/invalid-email") {
        throw new Error("Invalid email address");
      }
      throw new Error(error.message || "Failed to sign in");
    }
  }

  async function signInWithGoogle() {
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  async function resetPassword(email: string) {
    try {
      await sendPasswordResetEmail(auth, email);
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  async function logout() {
    try {
      await signOut(auth);
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    loading,
    signup,
    signin,
    signInWithGoogle,
    resetPassword,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
