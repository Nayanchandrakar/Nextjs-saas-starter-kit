import { createEnv } from "@t3-oss/env-nextjs"
import { z } from "zod"

export const envClient = createEnv({
  client: {
    NEXT_PUBLIC_APP_URL: z.string().default("http://localhost:4000"),
  },
  runtimeEnv: {
    NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL,
  },
})
