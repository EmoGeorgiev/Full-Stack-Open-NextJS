import { auth } from "@/auth"
import { redirect } from "next/navigation"
import { getCurrentUser } from "../services/session"
import { generateToken } from "../actions/users"

const PersonalPage = async () => {
  const session = await auth()

  if (!session) {
    redirect("/login")
  }

  const user = await getCurrentUser()

  return (
    <div className="mt-16 flex justify-center">
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
