import { auth } from "@/lib/authentication/auth-server"
import { toNextJsHandler } from "better-auth/next-js"

export const { POST, GET } = toNextJsHandler(auth)
