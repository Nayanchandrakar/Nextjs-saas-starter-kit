import { authClient } from "@/lib/authentication/auth-client"

export type Session = typeof authClient.$Infer.Session
export type User = Session["user"]
