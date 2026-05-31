import Link from "next/link"
import { getBlogs } from "../services/blogs"

const Blogs = () => {
  const blogs = getBlogs()
  const sortedBlogs = [...blogs].sort((x, y) => y.likes - x.likes)

  return (
    <div>
      <h2>Blogs</h2>
      <ul>
        {sortedBlogs.map(blog => (
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
