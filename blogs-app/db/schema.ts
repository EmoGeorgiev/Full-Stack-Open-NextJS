import { relations } from "drizzle-orm"
import { pgTable, serial, text, integer, boolean } from "drizzle-orm/pg-core"

export const readingLists = pgTable("reading_list", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull().references(() => users.id),
  blogId: integer("blog_id").notNull().references(() => blogs.id), // Fixed typo: "blod_id" -> "blog_id"
  read: boolean("read").notNull().default(false)
})

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  name: text("name").notNull(),
  passwordHash: text("password_hash").notNull().default(""),
  token: text("token"),
})

export const blogs = pgTable("blogs", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  author: text("author").notNull(),
  url: text("url").notNull(),
  likes: integer("likes").notNull().default(0),
  userId: integer("user_id").notNull().references(() => users.id),
})

// --- RELATIONS ---

export const usersRelations = relations(users, ({ many }) => ({
  blogs: many(blogs),
  readingList: many(readingLists)
}))

export const readingListRelations = relations(readingLists, ({ one }) => ({
  user: one(users, {
    fields: [readingLists.userId], // Fixed: changed from .id to .userId
    references: [users.id]
  }),
  blog: one(blogs, { // Added missing relationship to blogs
    fields: [readingLists.blogId],
    references: [blogs.id]
  })
}))

export const blogsRelations = relations(blogs, ({ one, many }) => ({
  user: one(users, {
    fields: [blogs.userId],
    references: [users.id]
  }),
  // Optional but recommended: allows you to see which reading lists a blog belongs to
  readingLists: many(readingLists)
}))
