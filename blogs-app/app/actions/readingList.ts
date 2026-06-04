"use server"

import { revalidatePath } from "next/cache"
import { addToReadingList } from "../services/readingList"
import { getCurrentUser } from "../services/session"
import { redirect } from "next/navigation"

export const addBlogToReadingList = async (formData: FormData) => {
  const user = await getCurrentUser()

  if (!user) {
    redirect("/login")
  }

  const blogId = Number(formData.get("id"))

  await addToReadingList(user.id, blogId)

  revalidatePath(`/blogs/${blogId}`)
  revalidatePath("/me")
}
