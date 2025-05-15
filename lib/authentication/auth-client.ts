import type { authServerType } from "@/types/authentication/server-types"
import {
  customSessionClient,
  magicLinkClient,
  multiSessionClient,
} from "better-auth/client/plugins"
import { createAuthClient } from "better-auth/react"

export const authClient = createAuthClient({
  fetchOptions: {
    onError: async ({ response }) => {
      // Handle redis ratelimit error globally
      if (response.status === 429) {
        const retryAfter = response.headers.get("X-Retry-After")
        console.error(`Rate limit exceeded. Retry after ${retryAfter} seconds`)
      }
    },
  },
  plugins: [
    customSessionClient<authServerType>(),
    multiSessionClient(),
    magicLinkClient(),
  ],
})
