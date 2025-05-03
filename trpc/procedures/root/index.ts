import { UserDatabaseService } from "@/database/services/user-service"
import { auth } from "@/lib/authentication/utils"
import { publicProcedure } from "@/trpc/init"
import { TRPCError } from "@trpc/server"

export const protectedProcedure = publicProcedure.use(async ({ ctx, next }) => {
  const session = await auth()
  if (!session) throw new TRPCError({ code: "UNAUTHORIZED" })

  const user = await UserDatabaseService.getUser(session.user.id)
  if (!user) throw new TRPCError({ code: "UNAUTHORIZED" })

  return next({ ctx: { ...ctx, user, session } })
})
