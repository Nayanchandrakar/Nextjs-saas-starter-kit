export type getSessionContext = {
  query?: {
    disableCookieCache?: boolean
    disableRefresh?: boolean
  }
  asResponse?: boolean
}

export type updateUserRequestBody = {
  body: Partial<{
    name: string
    image: string | null
  }>
}
