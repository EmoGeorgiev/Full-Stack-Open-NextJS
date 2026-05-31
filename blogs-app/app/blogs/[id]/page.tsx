import { addBlogLike } from "@/app/actions/blogs"
import { getBlogById } from "@/app/services/blogs"
import { notFound } from "next/navigation"

const BlogPage = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params
  const blog = getBlogById(Number(id))

  if (!blog) {
    notFound()
  }

  return (
    <div>
      <h2>{blog.title}</h2>
      <p>{blog.author}</p>
      <p>{blog.url}</p>
      <p>{blog.likes} likes</p>

      <form action={addBlogLike}>
        <input type="hidden" name="id" value={blog.id} />
        <button type="submit">
          Add like
        </button>
      </form>
    </div>
  )
}

export default BlogPage
