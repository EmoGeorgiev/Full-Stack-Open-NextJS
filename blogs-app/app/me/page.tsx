import { auth } from "@/auth"
import { redirect } from "next/navigation"
import { getCurrentUser } from "../services/session"
import { generateToken } from "../actions/users"
import { markBlogAsRead } from "../actions/readingList"

const PersonalPage = async () => {
  const session = await auth()

  if (!session) {
    redirect("/login")
  }

  const user = await getCurrentUser()

  return (
    <div className="mt-16 h-2/3 flex justify-center">
      <div>
        <div className="flex flex-col space-y-3.5">
          <h1 className="text-3xl font-bold">
            My Profile
          </h1>

          <p>
            <span className="font-bold">Name:</span> {session?.user?.name}
          </p>
          <p>
            <span className="font-bold">Username:</span> {session?.user?.email}
          </p>
        </div>
        <div className="mt-8 border-t-2 flex flex-col space-x-3.5">
          <h2 className="mt-4 text-xl font-bold">
            Reading List
          </h2>
          <div className="mt-4">
            <h3 className="text-lg font-bold">
              Unread ({user?.readingList.filter(list => !list.read).length})
            </h3>
            <ul className="mt-4 flex flex-col space-y-2">
              {user?.readingList.filter(list => !list.read)
                .map(list => (
                  <li key={list.id} className="bg-amber-100">
                    <form action={markBlogAsRead} className="flex justify-between">
                      <input type="hidden" name="id" value={list.blogId} />
                      {list.blog.title}
                      <button
                        className="ml-3 bg-green-600 text-white hover:bg-green-800 px-3 py-1 rounded text-sm"
                      >
                        Mark as read
                      </button>
                    </form>
                  </li>
                ))}
            </ul>
            <h3 className="mt-4 text-lg font-bold">
              Read ({user?.readingList.filter(list => list.read).length})
            </h3>
            <ul className="mt-4 flex flex-col space-y-2">
              {user?.readingList.filter(list => list.read)
                .map(list => (
                  <li key={list.id} className="bg-green-100">
                    {list.blog.title}
                  </li>
                ))}
            </ul>
          </div>
        </div>
        <div className="mt-8 border-t-2 flex flex-col space-y-3.5">
          <h2 className="mt-4 text-xl font-bold">
            API Token
          </h2>

          <p>
            Current token:
          </p>

          {user?.token
            ? <div className="font-bold">{user?.token}</div>
            : <div className="font-bold">No token has been generated yet</div>}

          <form action={generateToken}>
            <button
              className="p-1.5 bg-blue-600 text-white hover:bg-blue-800 rounded-md"
            >
              Generate New Token
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default PersonalPage
