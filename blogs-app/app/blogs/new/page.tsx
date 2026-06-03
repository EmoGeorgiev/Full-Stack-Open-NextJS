"use client"

import { createBlog } from "@/app/actions/blogs"
import { useNotification } from "@/app/components/NotificationContext"
import { useRouter } from "next/navigation"
import { useActionState, useEffect } from "react"

const NewBlog = () => {
  const [state, formAction] = useActionState(createBlog, { errors: {}, values: { title: "", author: "", url: "" }, success: false })
  const { showNotification } = useNotification()
  const router = useRouter()

  useEffect(() => {
    if (state.success) {
      showNotification("blog created")
      router.push("/blogs")
    }
  }, [state, showNotification, router])

  return (
    <div>
      <h2>
        Create a new blog
      </h2>

      <form action={formAction}>
        <div>
          <label>
            Title:
            <input
              type="text"
              name="title"
              required
              minLength={5}
              defaultValue={state.values?.title}
            />
          </label>
        </div>
        <div>
          <label>
            Author:
            <input
              type="text"
              name="author"
              required
              minLength={5}
              defaultValue={state.values?.author}
            />
          </label>
        </div>
        <div>
          <label>
            Url:
            <input
              type="text"
              name="url"
              required
              minLength={5}
              defaultValue={state.values?.url}
            />
          </label>
        </div>
        <button type="submit">Create</button>
        {state.errors.title && <p style={{ color: "red" }}>{state.errors.title}</p>}
        {state.errors.author && <p style={{ color: "red" }}>{state.errors.author}</p>}
        {state.errors.url && <p style={{ color: "red" }}>{state.errors.url}</p>}
      </form>
    </div>
  )
}

export default NewBlog
