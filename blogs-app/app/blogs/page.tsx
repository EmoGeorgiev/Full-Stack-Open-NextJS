import Link from "next/link"
import { getBlogs } from "../services/blogs"

const Blogs = async ({
  searchParams
}: {
  searchParams: Promise<{ filter?: string }>
}) => {
  const { filter } = await searchParams
  const blogs = await getBlogs(filter)

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Blogs</h2>
      <div className="my-4 flex justify-center">
        <form action="/blogs">
          <input
            type="text"
            name="filter"
            placeholder="Search blogs"
            className="border rounded-lg"
          />
          <button
            type="submit"
            className="ml-2 bg-gray-600 text-white hover:bg-gray-500 px-3 py-1 rounded text-sm"
          >
            Search
          </button>
        </form>
      </div>
      <ul className="space-y-2">
        {blogs.map(blog => (
          <li key={blog.id} className="border rounded p-3 hover:bg-gray-50">
            <Link
              href={`/blogs/${blog.id}`}
              className="text-blue-600 hover: underline"
            >
              Title: {blog.title},
              Author: {blog.author}, {blog.likes} likes,
            </Link>
            Url: <a href={blog.url}>{blog.url}</a>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Blogs
