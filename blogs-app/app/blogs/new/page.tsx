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
      <h2 className="my-4 text-center text-2xl font-bold">
        Create a new blog
      </h2>
      <div className="flex justify-center items-center">
        <form action={formAction} className="w-full flex flex-col items-center space-y-4">
          <div>
            <label>
              Title:
              <input
                type="text"
                name="title"
                required
                minLength={5}
                defaultValue={state.values?.title}
                className="m-2 border rounded-lg"
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
                className="m-2 border rounded-lg"
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
                className="m-2 border rounded-lg"
              />
            </label>
          </div>
          <button
            type="submit"
            className="ml-2 flex justify-center bg-gray-600 text-white hover:bg-gray-500 px-3 py-1 rounded text-sm"
          >
            Create
          </button>
          {state.errors.title && <p style={{ color: "red" }}>{state.errors.title}</p>}
          {state.errors.author && <p style={{ color: "red" }}>{state.errors.author}</p>}
          {state.errors.url && <p style={{ color: "red" }}>{state.errors.url}</p>}
        </form>
      </div>
    </div>
  )
}

export default NewBlog
