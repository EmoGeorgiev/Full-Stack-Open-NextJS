import { addBlogLike } from "@/app/actions/blogs"
import { addBlogToReadingList } from "@/app/actions/readingLists"
import { getBlogById } from "@/app/services/blogs"
import { getCurrentUser } from "@/app/services/session"
import { notFound } from "next/navigation"

const BlogPage = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params
  const blog = await getBlogById(Number(id))
  const user = await getCurrentUser()

  if (!blog || !user) {
    notFound()
  }

  return (
    <div className="mt-16 flex justify-center items-center" data-testid="blog-detail">
      <div>
        <h2 className="text-2xl text-center font-bold my-4" data-testid="blog-title">
          {blog.title}
        </h2>
        <h3 className="text-xl text-center font-semibold my-2" data-testid="blog-author">
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
              data-testid="like-button"
            >
              Like
            </button>
          </form>
        </div>
        <div>
          {!user?.readingList.map(x => x.blogId).includes(blog.id) &&
            <form action={addBlogToReadingList}>
              <input type="hidden" name="id" value={blog.id} />
              <button
                type="submit"
                className="ml-2 bg-blue-600 text-white hover:bg-blue-800 px-3 py-1 rounded text-sm"
                data-testid="add-to-reading-list-button"
              >
                Add to reading list
              </button>
            </form>}
        </div>
      </div>
    </div >
  )
}

export default BlogPage
