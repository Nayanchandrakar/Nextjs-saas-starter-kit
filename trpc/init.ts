import { initTRPC } from "@trpc/server"
import { cache } from "react"
import { SuperJSON } from "superjson"

export const createTRPCContext = cache(async () => {})

const t = initTRPC.create({
  transformer: SuperJSON,
})

export const createTRPCRouter = t.router
export const createCallerFactory = t.createCallerFactory
export const publicProcedure = t.procedure
