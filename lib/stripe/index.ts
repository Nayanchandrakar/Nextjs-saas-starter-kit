import { serverEnv } from "@/lib/utilities/server-env"
import { Stripe } from "stripe"

export const stripe = new Stripe(serverEnv.STRIPE_SECRET_KEY, {
  apiVersion: "2025-04-30.basil",
  typescript: true,
})
