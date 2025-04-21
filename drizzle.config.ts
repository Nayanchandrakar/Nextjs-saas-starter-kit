import "dotenv/config"
import { envServer } from "@/lib/utilities/env-server"
import { defineConfig } from "drizzle-kit"

export default defineConfig({
  out: "./drizzle",
  schema: "./database/schema/index.ts",
  dialect: "postgresql",
  dbCredentials: {
    url: envServer.DATABASE_URL,
  },
})
