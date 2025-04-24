import type { CreateEmailResponse } from "resend"

export type EmailStrategyConfig = {
  magicLink: MagicLinkParams
}

export type EmailStrategy<T> = {
  send(params: T): Promise<CreateEmailResponse>
}

export type StrategyFactory = {
  [K in keyof EmailStrategyConfig]: () => EmailStrategy<EmailStrategyConfig[K]>
}

export type MagicLinkParams = {
  email: string
  url: string
}
