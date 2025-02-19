"use client"
import { useState } from "react"
import { User } from "firebase/auth"
import GitHubLogin from "./GitHubLogin"

export default function Home() {
  const [user, setUser] = useState<User | null>(null)

  return (
    <div>
      <h1>Firebase Auth Emulator + Next.js</h1>
      <GitHubLogin onUserUpdate={setUser} />
      {user && (
        <>
          <hr />
          <div>
            <p>Welcome, {user.displayName}!</p>
          </div>
        </>
      )}
    </div>
  )
}
