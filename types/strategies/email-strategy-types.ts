export type EmailStrategyConfig = {
  magicLink: MagicLinkParams
  invitationEmail: InvitationEmailParams
}

export type EmailStrategy<T> = {
  send(params: T): Promise<void>
}

export type StrategyFactory = {
  [K in keyof EmailStrategyConfig]: () => EmailStrategy<EmailStrategyConfig[K]>
}

export type MagicLinkParams = {
  email: string
  url: string
}

export type InvitationEmailParams = {
  data: {
    email: string
    link: string
  }[]
}
