import { db } from "@/db"
import { users } from "@/db/schema"
import bcrypt from "bcryptjs"
import { NextResponse } from "next/server"

export const POST = async (request: Request) => {
  if (process.env.NODE_ENV === "production") {
    return NextResponse.json(
      { error: "This endpoint is not available in production" },
      { status: 403 },
    )
  }

  const body = await request.json()
  const { username, name, password } = body

  const passwordHash = await bcrypt.hash(password, 10)

  await db.insert(users).values({ username, name, passwordHash })

  return NextResponse.json({ message: "Success" })
}
