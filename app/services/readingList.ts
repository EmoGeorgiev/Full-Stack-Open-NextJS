import { db } from "@/db"
import { readingLists } from "@/db/schema"
import { and, eq } from "drizzle-orm"

export const addToReadingList = async (userId: number, blogId: number) => {
  const readingList = await db.query.readingLists.findFirst({
    where: and(eq(readingLists.userId, userId), eq(readingLists.blogId, blogId))
  })

  if (readingList) {
    return
  }

  await db.insert(readingLists).values({ userId, blogId })
}

export const markAsRead = async (userId: number, blogId: number) => {
  await db
    .update(readingLists)
    .set({ read: true })
    .where(eq(readingLists.userId, userId) && eq(readingLists.blogId, blogId))
}
