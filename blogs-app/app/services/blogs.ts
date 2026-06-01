import { eq, like, sql } from "drizzle-orm"
import { db } from "@/db"
import { blogs } from "@/db/schema"

export const getBlogs = async (filter?: string) => {
  if (filter) {
    return db.query.blogs.findMany({
      where: like(blogs.title, `%${filter}%`),
      orderBy: (blogs, { desc }) => [desc(blogs.likes)]
    })
  }

  return db.query.blogs.findMany({
    orderBy: (blogs, { desc }) => [desc(blogs.likes)]
  })
}

export const addBlog = async (title: string, author: string, url: string) => {
  const user = await db.query.users.findFirst({
    orderBy: sql`RANDOM()`,
  })

  if (user) {
    await db.insert(blogs).values({ title, author, url, userId: user.id })
  }
}

export const getBlogById = async (id: number) => {
  return db.query.blogs.findFirst({
    where: eq(blogs.id, id),
  })
}

export const addLike = async (id: number) => {
  const blog = await getBlogById(id)

  if (blog) {
    await db
      .update(blogs)
      .set({ likes: blog.likes + 1 })
      .where(eq(blogs.id, id))
  }
}
