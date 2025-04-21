import { createTRPCRouter, publicProcedure } from "@/trpc/init"
import { z } from "zod"

export const appRouter = createTRPCRouter({
	hello: publicProcedure.query(() => {
		return {
			greeting: `hello world`,
		}
	}),
})

export type AppRouter = typeof appRouter
