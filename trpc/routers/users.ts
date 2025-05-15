import { createTRPCRouter } from "@/trpc/init"
import { onboardUser } from "@/trpc/procedures/user"
import {
  editProfileImage,
  manageProfile,
} from "@/trpc/procedures/user/manage-profile"

export const usersRouter = createTRPCRouter({
  onboardUser,
  manageProfile,
  editProfileImage,
})
