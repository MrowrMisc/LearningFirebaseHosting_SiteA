import { getApp, getApps, initializeApp } from "firebase/app"
import { connectAuthEmulator, getAuth } from "firebase/auth"

const firebaseConfig = {
  apiKey: "fake-api-key", // Not needed in emulator mode
  authDomain: "fake-auth-domain",
  projectId: "your-project-id",
  storageBucket: "fake-storage-bucket",
  messagingSenderId: "fake-messaging-sender-id",
  appId: "fake-app-id",
}

const app = getApps().length ? getApp() : initializeApp(firebaseConfig)
const auth = getAuth(app)

// Connect to emulator in development mode
if (process.env.NODE_ENV === "development") {
  connectAuthEmulator(auth, "http://localhost:9099")
}

export { auth }
