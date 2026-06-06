import { getUserByToken } from "@/app/services/users"
import { NextRequest, NextResponse } from "next/server"

export const GET = async (request: NextRequest) => {
  const authHeader = request.headers.get("Authorization")

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return NextResponse.json(
      { error: "Unauthorized: Missing or invalid token format" },
      { status: 401 }
    )
  }

  const token = authHeader.split(" ")[1]
  const user = await getUserByToken(token)

  return NextResponse.json(user)
}
