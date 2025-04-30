import { createEnv } from "@t3-oss/env-nextjs"
import { z } from "zod"

export const clientEnv = createEnv({
  client: {
    NEXT_PUBLIC_APP_URL: z.string().default("http://localhost:3000"),
    NEXT_PUBLIC_CLOUDFRONT_URL: z
      .string()
      .default("https://d33aluc0l6cahu.cloudfront.net"),
  },
  runtimeEnv: {
    NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL,
    NEXT_PUBLIC_CLOUDFRONT_URL: process.env.NEXT_PUBLIC_CLOUDFRONT_URL,
  },
})
