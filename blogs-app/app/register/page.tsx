"use client"

import { useActionState } from "react"
import { registerUser } from "../actions/users"

export default function RegisterPage() {
  const [state, formAction] = useActionState(registerUser, { error: "" })

  return (
    <div>
      <h2>Register</h2>
      <form action={formAction}>
        <div>
          <label>
            Username
            <input type="text" name="username" required minLength={4} />
          </label>
        </div>
        <div>
          <label>
            Name
            <input type="text" name="name" required />
          </label>
        </div>
        <div>
          <label>
            Password
            <input type="password" name="password" required minLength={4} />
          </label>
        </div>
        <div>
          <label>
            Confirm password
            <input type="password" name="confirmPassword" required minLength={4} />
          </label>
        </div>
        <button type="submit">Register</button>
        {state.error && <p style={{ color: "red" }}>{state.error}</p>}
      </form>
    </div>
  )
}
