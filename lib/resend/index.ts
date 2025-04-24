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

type EmailOptions = Omit<CreateEmailOptions, "from"> & {
  sender?: string
  prefix: string
  react: React.ReactNode
}

const logger = Logger.createLogger({
  prefix: "MailService",
})

export class MailService {
  private static instance: MailService | null = null
  private readonly config: EmailProviderConfig
  private providerClient: Resend | null = null

  private constructor(config: EmailProviderConfig) {
    this.config = {
      ...config,
      apiKey: config.apiKey,
    }
  }

  /**
   * Initializes the MailService singleton instance
   * @param config Email provider configuration
   * @throws ApiError if configuration is invalid
   * @returns MailService instance
   */
  static initialize(config: EmailProviderConfig): MailService {
    if (MailService.instance) {
      return MailService.instance
    }

    if (!config?.apiKey) {
      throw ApiError.badRequest("Email provider API key is missing or invalid")
    }

    MailService.instance = new MailService(config)
    logger.info("MailService initialized successfully")
    return MailService.instance
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
  async send(options: EmailOptions): Promise<CreateEmailResponse> {
    const { sender, prefix, ...restOptions } = options
    let from = sender || serverEnv.RESEND_EMAIL

    if (!isProd) {
      from = "onboarding@resend.dev"
      restOptions.to = serverEnv.RESEND_EMAIL
    }

    try {
      const { data, error } = await this.getProviderClient().emails.send({
        from,
        ...(restOptions as EmailOptions & { text: string }),
      })

      if (error) {
        logger.error(error.message, error)
      } else {
        logger.info(
          `Email sent successfully to ${options.to} from ${prefix} service`,
        )
      }

      return { data, error }
    } catch (error) {
      const apiError = ApiError.fromError(error)
      logger.error(
        `Failed to send email from ${prefix} service to ${options.to}:`,
        apiError,
      )
      throw apiError
    }
  }
}
