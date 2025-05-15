import { authServer } from "@/lib/authentication/auth-server"

export type getSessionContext = {
  query?: {
    disableCookieCache?: boolean
    disableRefresh?: boolean
  }
  asResponse?: boolean
}

export type updateUserRequestBody = {
  body: Partial<{
    name: string
    image: string | null
  }>
}

export type authServerType = typeof authServer
