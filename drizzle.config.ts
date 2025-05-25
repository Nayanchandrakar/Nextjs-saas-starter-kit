import { serverEnv } from "@/lib/utilities/server-env"
import "dotenv/config"
import { defineConfig } from "drizzle-kit"

export default defineConfig({
  out: "./database/drizzle",
  schema: "./database/schema/index.ts",
  dialect: "postgresql",
  dbCredentials: {
    url: serverEnv.DATABASE_URL,
  },
  strict: true,
})
