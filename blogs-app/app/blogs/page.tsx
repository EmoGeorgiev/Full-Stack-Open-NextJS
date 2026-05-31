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
    <div>
      <h2>Blogs</h2>
      <form action="/blogs">
        <input
          type="text"
          name="filter"
          placeholder="Search blogs"
        />
        <button type="submit">
          Search
        </button>
      </form>

      <ul>
        {blogs.map(blog => (
          <li key={blog.id}>
            <Link href={`/blogs/${blog.id}`}>
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
