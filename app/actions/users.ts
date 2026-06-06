"use server"

import { redirect } from "next/navigation"
import bcrypt from "bcryptjs"
import { db } from "@/db"
import { users } from "@/db/schema"
import { eq } from "drizzle-orm"
import { revalidatePath } from "next/cache"
import { getCurrentUser } from "../services/session"

export const registerUser = async (
  prevState: {
    errors?: { username?: string, password?: string, passwordConfirm?: string };
    values?: { username?: string, name?: string, password?: string, confirmPassword?: string };
    success?: boolean
  },
  formData: FormData
) => {
  const username = (formData.get("username") as string)?.trim()
  const name = (formData.get("name") as string)?.trim()
  const password = formData.get("password") as string
  const confirmPassword = formData.get("confirmPassword") as string

  const errors: { username?: string, password?: string, passwordConfirm?: string } = {}

  if (!username || username.length < 4) {
    errors.username = "Username must be at least 4 characters long"
  }

  if (!password || password.length < 4) {
    errors.password = "Password must be at least 4 characters long"
  }

  if (password !== confirmPassword) {
    errors.passwordConfirm = "Password and Confirm password must match"
  }

  const user = await db.query.users.findFirst({
    where: eq(users.username, username)
  })

  if (user) {
    return { error: `The username - ${username} already exists` }
  }

  if (Object.keys(errors).length > 0) {
    return { errors, values: { username, name, password, confirmPassword }, success: false }
  }

  const passwordHash = await bcrypt.hash(password, 10)

  await db.insert(users).values({ username, name, passwordHash })

  redirect("/login")
}

export const generateToken = async () => {
  const user = await getCurrentUser()

  if (!user) {
    redirect("/login")
  }

  const token = crypto.randomUUID()

  await db
    .update(users)
    .set({ token })
    .where(eq(users.username, user.username))

  revalidatePath("/me")
}
