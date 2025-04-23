import { MagicLinkMail } from "@/components/emails/magic-link-email"
import { mail } from "@/lib/resend"
import {
  EmailStrategy,
  MagicLinkParams,
} from "@/types/strategies/email-strategy-types"

export class MagicLinkStrategy implements EmailStrategy<MagicLinkParams> {
  async send({ email, url }: MagicLinkParams) {
    const response = await mail.send({
      prefix: "Magic Link",
      subject: "Your Magic Link",
      to: email,
      react: MagicLinkMail({ link: url }),
    })
    return response
  }
}
