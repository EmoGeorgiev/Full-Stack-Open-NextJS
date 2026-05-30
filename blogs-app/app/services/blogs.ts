const blogs = [
  {
    id: "1",
    title: "Getting Started with TypeScript",
    author: "Jane Doe",
    url: "https://example.com/typescript-intro",
    likes: 42,
  },
  {
    id: "2",
    title: "Understanding React Hooks",
    author: "John Smith",
    url: "https://example.com/react-hooks",
    likes: 87,
  },
  {
    id: "3",
    title: "Building APIs with Node.js",
    author: "Alice Johnson",
    url: "https://example.com/nodejs-apis",
    likes: 23,
  },
]

export const getBlogs = () => {
  return blogs
}
