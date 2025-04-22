import { isProd } from "@/lib/utilities/environment" // Renamed from isProd
import { serverEnv } from "@/lib/utilities/server-env" // Renamed from serverEnv
import {
  type CreateEmailOptions,
  type CreateEmailResponse,
  Resend,
} from "resend"

interface EmailProviderConfig {
  apiKey: string
}

class EmailService {
  private static instance: EmailService | null = null
  private config: EmailProviderConfig
  private providerClient: Resend | null = null

  private constructor(config: EmailProviderConfig) {
    this.config = config
  }

  static initialize(config: EmailProviderConfig): EmailService {
    if (!EmailService.instance) {
      if (!config.apiKey) {
        throw new Error("Email provider API key is not defined or empty")
      }
      EmailService.instance = new EmailService(config)
    }
    return EmailService.instance
  }

  private getProviderClient(): Resend {
    if (!this.providerClient) {
      this.providerClient = new Resend(this.config.apiKey) as Resend
    }
    return this.providerClient
  }

  async sendEmail(
    options: CreateEmailOptions & { from?: string },
  ): Promise<CreateEmailResponse> {
    const { from, ...restOptions } = options
    const sender = !!from
      ? from
      : isProd
        ? serverEnv.RESEND_EMAIL
        : "onboarding@resend.dev"

    try {
      const response = await this.getProviderClient().emails.send({
        from: sender,
        ...restOptions,
      })
      return response
    } catch (error) {
      throw new Error(
        `Email sending failed: ${error instanceof Error ? error.message : "Unknown error"}`,
      )
    }
  }
}

export const emailService = EmailService.initialize({
  apiKey: serverEnv.RESEND_API_KEY,
})
