import { ApiError } from "@/lib/errors/api-error"
import Logger from "@/lib/logger"
import { isProd } from "@/lib/utilities/environment"
import { serverEnv } from "@/lib/utilities/server-env"
import {
  type CreateEmailOptions,
  type CreateEmailResponse,
  Resend,
} from "resend"

type EmailProviderConfig = {
  apiKey: string
}

type EmailOptions = CreateEmailOptions & {
  from?: string
}

const logger = Logger.createLogger({
  prefix: "EmailService",
})

class EmailService {
  private static instance: EmailService | null = null
  private readonly config: EmailProviderConfig
  private providerClient: Resend | null = null

  private constructor(config: EmailProviderConfig) {
    this.config = {
      ...config,
      apiKey: config.apiKey,
    }
  }

  /**
   * Initializes the EmailService singleton instance
   * @param config Email provider configuration
   * @throws ApiError if configuration is invalid
   * @returns EmailService instance
   */
  static initialize(config: EmailProviderConfig): EmailService {
    if (EmailService.instance) {
      return EmailService.instance
    }

    if (!config?.apiKey) {
      throw ApiError.badRequest("Email provider API key is missing or invalid")
    }

    EmailService.instance = new EmailService(config)
    logger.info("EmailService initialized successfully")
    return EmailService.instance
  }

  /**
   * Gets or creates the Resend provider client
   * @returns Resend client instance
   */
  private getProviderClient(): Resend {
    if (!this.providerClient) {
      this.providerClient = new Resend(this.config.apiKey)
    }
    return this.providerClient
  }

  /**
   * Sends an email using the configured provider
   * @param options Email options including recipient, subject, and content
   * @returns Promise resolving to email sending response
   * @throws ApiError if email sending fails
   */
  async sendEmail(options: EmailOptions): Promise<CreateEmailResponse> {
    const { from, ...restOptions } = options
    const sender =
      from || (isProd ? serverEnv.RESEND_EMAIL : "onboarding@resend.dev")

    try {
      const response = await this.getProviderClient().emails.send({
        from: sender,
        ...restOptions,
      })

      logger.info(`Email sent successfully to ${options.to}`)
      return response
    } catch (error) {
      const apiError = ApiError.fromError(error)
      logger.error(`Failed to send email to ${options.to}:`, apiError)
      throw apiError
    }
  }
}

export const emailService = EmailService.initialize({
  apiKey: serverEnv.RESEND_API_KEY,
})
