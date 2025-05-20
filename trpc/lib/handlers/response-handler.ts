import Messages from "@/lib/constants/message.json"
import { createRoute } from "@/lib/utils"

type MessageKeyType = keyof typeof Messages

type TrpcResponseHandlerProps = {
  success?: boolean
  message: MessageKeyType
  description?: MessageKeyType | string
  redirect?: string
}

export function TrpcResponseHandler({
  message,
  description,
  redirect,
  success = true,
}: TrpcResponseHandlerProps) {
  return {
    success,
    message: Messages[message],
    ...(description && { description }),
    ...(redirect && { redirect: createRoute(redirect) }),
  }
}
