import { createLoader, parseAsString } from "nuqs/server"

export const invitationSearchParams = {
  from: parseAsString.withDefault(""),
}

export const invitationParams = {
  invitationId: parseAsString.withDefault(""),
}

export const loadInvitationSearchParams = createLoader(invitationSearchParams)
export const loadInvitationParams = createLoader(invitationParams)
