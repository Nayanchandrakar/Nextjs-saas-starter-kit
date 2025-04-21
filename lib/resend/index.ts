import { Resend } from "resend"

type ResendConfig = {
  connectionString: string
}

class EmailService {
  private static instance: EmailService
  private config: ResendConfig
  private resend: Resend | null = null

  constructor(config: ResendConfig) {
    this.config = config
  }

  static init(config: ResendConfig) {
    if (!EmailService.instance) {
      if (!config.connectionString) {
        throw new Error("Resend connection string is not defined or empty")
      }
      this.instance = new EmailService(config)
    }
    return EmailService.instance
  }

  service(): Resend {
    if (!this.resend) this.resend = new Resend(this.config.connectionString)
    return this.resend
  }
}

const emailService = EmailService.init({
  connectionString: process.env.RESEND_API_KEY!,
})

export const resend = emailService.service()
