import { authClient } from "@/lib/authentication/auth-client"
import { User as AuthUser } from "better-auth/types"

export type Session = typeof authClient.$Infer.Session
export type User = Session["user"]

export type ActiveSessionsType = {
  session: Session["session"]
  user: AuthUser
}[]
