import { createLoader, parseAsBoolean, parseAsString } from "nuqs/server"

export const invitationSearchParams = {
  from: parseAsString.withDefault(""),
}

export const invitationParams = {
  invitationId: parseAsString.withDefault(""),
}

export const callbackSearchParams = {
  fromInvite: parseAsBoolean.withDefault(false),
}

export const loadInvitationSearchParams = createLoader(invitationSearchParams)
export const loadInvitationParams = createLoader(invitationParams)
export const loadCallbackSearchParams = createLoader(callbackSearchParams)
