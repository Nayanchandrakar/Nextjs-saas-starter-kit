import { createTRPCRouter } from "@/trpc/init"
import { feedbacksRouter } from "@/trpc/routers/feedbacks"
import { invitationsRouter } from "@/trpc/routers/invitations"
import { membersRouter } from "@/trpc/routers/members"
import { subscriptionsRouter } from "@/trpc/routers/subscriptions"
import { usersRouter } from "@/trpc/routers/users"
import { usersOnboardingRouter } from "@/trpc/routers/users-onboarding"
import { workSpacesRouter } from "@/trpc/routers/workspaces"

export const appRouter = createTRPCRouter({
  users: usersRouter,
  members: membersRouter,
  workSpaces: workSpacesRouter,
  subscriptions: subscriptionsRouter,
  usersOnboarding: usersOnboardingRouter,
  invitations: invitationsRouter,
  feedbacks: feedbacksRouter,
})

export type AppRouter = typeof appRouter
