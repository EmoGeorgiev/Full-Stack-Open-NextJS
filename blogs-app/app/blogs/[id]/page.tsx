import { addBlogLike } from "@/app/actions/blogs"
import { addBlogToReadingList } from "@/app/actions/readingList"
import { getBlogById } from "@/app/services/blogs"
import { getCurrentUser } from "@/app/services/session"
import { notFound } from "next/navigation"

const BlogPage = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params
  const blog = await getBlogById(Number(id))
  const user = await getCurrentUser()

  console.log(user)

  if (!blog) {
    notFound()
  }

  return (
    <div className="mt-16 flex justify-center items-center">
      <div>
        <h2 className="text-2xl text-center font-bold my-4">
          {blog.title}
        </h2>
        <h3 className="text-xl text-center font-semibold my-2">
          {blog.author}
        </h3>
        <div className="text-center">
          <a href={blog.url}>
            {blog.url}
          </a>
        </div>
        <div className="mt-4 flex justify-around">
          <p>{blog.likes} likes</p>

          <form action={addBlogLike}>
            <input type="hidden" name="id" value={blog.id} />
            <button
              type="submit"
              className="ml-2 bg-gray-600 text-white hover:bg-gray-500 px-3 py-1 rounded text-sm"
            >
              Like
            </button>
          </form>
        </div>
        {!user?.readingList.map(x => x.blogId).includes(blog.id) &&
          <form className="mt-4 mx-auto" action={addBlogToReadingList}>
            <input type="hidden" name="id" value={blog.id} />
            <button
              type="submit"
              className="ml-2 bg-blue-600 text-white hover:bg-blue-800 px-3 py-1 rounded text-sm"
            >
              Add to reading list
            </button>
          </form>}
      </div>
    </div >
  )
}

export default BlogPage
