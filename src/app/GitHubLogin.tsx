"use client";
import { useState, useEffect } from "react";
import { auth } from "@/lib/firebase";
import { signInWithPopup, signOut, GithubAuthProvider, User } from "firebase/auth";

export default function GitHubLogin({ onUserUpdate }: { onUserUpdate: (user: User | null) => void }) {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
      onUserUpdate(user);
    });
    return () => unsubscribe();
  }, [onUserUpdate]);

  const signIn = async () => {
    try {
      const provider = new GithubAuthProvider();
      const result = await signInWithPopup(auth, provider);
      setUser(result.user);
      onUserUpdate(result.user);
    } catch (error) {
      console.error("Error signing in", error);
    }
  };

  const signOutUser = async () => {
    await signOut(auth);
    setUser(null);
    onUserUpdate(null);
  };

  return (
    <div>
      {user ? (
        <button onClick={signOutUser}>Sign out</button>
      ) : (
        <button onClick={signIn}>Sign in with GitHub</button>
      )}
    </div>
  );
}
