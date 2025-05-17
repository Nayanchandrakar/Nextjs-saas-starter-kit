import { authServer } from "@/lib/authentication/auth-server"
import {
  getSessionContext,
  updateUserRequestBody,
} from "@/types/authentication/server-types"
import { headers } from "next/headers"

export async function auth({ asResponse, query }: getSessionContext = {}) {
  return await authServer.api.getSession({
    headers: await headers(),
    asResponse: !!asResponse,
    ...(query && { query }),
  })
}

export async function activeSessions() {
  return await authServer.api.listDeviceSessions({
    headers: await headers(),
  })
}

export async function updateUser({ body }: updateUserRequestBody) {
  return await authServer.api.updateUser({
    headers: await headers(),
    body,
  })
}
