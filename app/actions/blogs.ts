"use server"

import { redirect } from "next/navigation"
import { revalidatePath } from "next/cache"
import { addBlog, addLike } from "../services/blogs"
import { auth } from "@/auth"

export const createBlog = async (
  prevState: {
    errors?: { title?: string, author?: string, url?: string };
    values?: { title?: string, author?: string, url?: string };
    success?: boolean;
  },
  formData: FormData
) => {
  const session = await auth()

  if (!session) {
    redirect("/login")
  }

  const title = formData.get("title") as string
  const author = formData.get("author") as string
  const url = formData.get("url") as string

  const errors: { title?: string, author?: string, url?: string } = {}

  if (!title || title.length < 5) {
    errors.title = "Blog title must be at least 5 characters long"
  }

  if (!author || author.length < 5) {
    errors.author = "Blog author must be at least 5 characters long"
  }

  if (!url || url.length < 5) {
    errors.url = "Blog url must be at least 5 characters long"
  }

  if (Object.keys(errors).length > 0) {
    return { errors, values: { title, author, url }, success: false }
  }

  await addBlog(title, author, url)

  revalidatePath("/blogs")
  return { errors, values: { title, author, url }, success: true }
}

export const addBlogLike = async (formData: FormData) => {
  const id = Number(formData.get("id"))

  await addLike(id)

  revalidatePath(`/blogs/${id}`)
  revalidatePath("/blogs")
}
