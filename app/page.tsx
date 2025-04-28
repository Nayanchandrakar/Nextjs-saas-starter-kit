import { getUser } from "@/database/helpers/users"
import { handleAuthRequest } from "./actions/utils"

export default async function Home() {
  const session = await handleAuthRequest()

  const start = performance.now()
  const user = await getUser(session?.user.id)
  const end = performance.now()

  const timeTaken = end - start

  return (
    <div>
      User from database: {JSON.stringify(user)} took{" "}
      <span className="text-green-500">{timeTaken.toFixed(2)}ms</span>
    </div>
  )
}
