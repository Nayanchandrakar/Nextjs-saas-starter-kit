import { InvitationMail } from "@/components/emails/invitation-email"
import { MagicLinkMail } from "@/components/emails/magic-link-email"
import { mail } from "@/lib/resend/mail-service-instance"
import {
  EmailStrategy,
  InvitationEmailParams,
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

export class InvitationEmailStrategy
  implements EmailStrategy<InvitationEmailParams>
{
  async send({ data }: InvitationEmailParams) {
    const asynRequests = data.map(({ email, link }) =>
      mail.send({
        prefix: "Invitation Link",
        subject: "Your Invitation Link",
        to: email,
        react: InvitationMail({ link }),
      }),
    )

    return await Promise.all(asynRequests)
  }
}
