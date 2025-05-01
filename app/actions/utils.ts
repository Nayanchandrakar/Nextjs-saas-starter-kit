import { auth } from "@/lib/authentication/utils"
import messageJson from "@/lib/constants/message.json"
import { ApiError } from "@/lib/errors/api-error"
import { redirectToRoute } from "@/lib/utils"
import { z } from "zod"

export async function handleAuthRequest(path?: string) {
  const session = await auth()
  if (!session) redirectToRoute(path ?? "sign-in")
  return session!
}

export async function validateRequest<T extends z.ZodTypeAny>(
  schema: T,
  request: unknown,
) {
  const { success, data } = schema.safeParse(request)
  if (!success) throw ApiError.validationError(messageJson.validationError)
  return data as z.infer<T>
}

export async function validateSessionRequest() {
  const session = await auth()
  if (!session) throw ApiError.unauthorized(messageJson.unauthorized)
  return session
}
