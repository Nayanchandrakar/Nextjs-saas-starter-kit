import { auth } from "@/lib/authentication/utils"
import { messages } from "@/lib/constants/message"
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
  if (!success) throw ApiError.validationError(messages.global.validation)
  return data as z.infer<T>
}

export async function validateSessionRequest() {
  const session = await auth()
  if (!session) throw ApiError.unauthorized(messages.global.unauthorized)
  return session
}
