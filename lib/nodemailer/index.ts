import { ApiError } from "@/lib/errors/api-error"
import Logger from "@/lib/logger"
import { serverEnv } from "@/lib/utilities/server-env"
import { render } from "@react-email/components"
import { type Transporter, createTransport } from "nodemailer"
import type { MailOptions } from "nodemailer/lib/sendmail-transport"

type EmailOptions = Omit<MailOptions, "html"> & {
  from?: string
  prefix: string
  component: React.ReactElement
}

const logger = Logger.createLogger({ prefix: "Nodemailer" })
export class Nodemailer {
  private static instance: Nodemailer
  private transporter: Transporter

  private constructor() {
    this.transporter = createTransport({
      service: "gmail",
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: serverEnv.NODEMAILER_USER,
        pass: serverEnv.NODEMAILER_PASS,
      },
    })
  }

  /**
   * Initializes or returns the singleton instance of Nodemailer.
   * @returns {Nodemailer} The singleton instance of Nodemailer.
   */
  static initialize(): Nodemailer {
    if (!Nodemailer.instance) {
      Nodemailer.instance = new Nodemailer()
    }
    return Nodemailer.instance
  }

  /**
   * Sends an email with the specified options.
   * @param options - Configuration for the email including recipient, subject, and React component for HTML content.
   * @throws {ApiError} If email sending fails or required options are missing.
   * @returns {Promise<void>} Resolves when the email is sent successfully.
   */
  async send(options: EmailOptions): Promise<void> {
    const { prefix, from, component, ...props } = options

    try {
      await this.transporter.sendMail({
        from: from ?? serverEnv.NODEMAILER_USER,
        html: await render(component),
        ...props,
      })

      logger.info(
        `Email sent successfully to ${props.to} from ${prefix} service`,
      )
    } catch (error) {
      const apiError = ApiError.fromError(error)
      logger.error(
        `Failed to send email from ${prefix} service to ${props.to}:`,
        apiError,
      )
      throw apiError
    }
  }
}

export const mail = Nodemailer.initialize()
