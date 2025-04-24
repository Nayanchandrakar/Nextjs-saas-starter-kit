import { MailService } from "@/lib/resend"
import { serverEnv } from "@/lib/utilities/server-env"

export const mail = MailService.initialize({
  apiKey: serverEnv.RESEND_API_KEY,
})
