"use client"

import { useActionState } from "react"
import { registerUser } from "../actions/users"

export default function RegisterPage() {
  const [state, formAction] = useActionState(registerUser, { errors: {}, values: { username: "", name: "", password: "", confirmPassword: "" }, success: false })

  return (
    <div>
      <h2>Register</h2>
      <form action={formAction}>
        <div>
          <label>
            Username
            <input type="text" name="username" required />
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
            Confirm Password
            <input type="password" name="confirmPassword" required minLength={4} />
          </label>
        </div>
        <button type="submit" data-testid="register-button">Register</button>
        {state.errors?.username && <p style={{ color: "red" }} data-testid="username-error">{state.errors.username}</p>}
        {state.errors?.password && <p style={{ color: "red" }} data-testid="password-error">{state.errors.password}</p>}
        {state.errors?.passwordConfirm && <p style={{ color: "red" }} data-testid="passwordConfirm-error">{state.errors.passwordConfirm}</p>}
      </form>
    </div>
  )
}
