import { createTRPCRouter } from "@/trpc/init"
import { createOnboardingProfile, deleteAccount } from "@/trpc/procedures/user"
import {
  updateProfile,
  updateProfileImage,
} from "@/trpc/procedures/user/manage-profile"

export const usersRouter = createTRPCRouter({
  createOnboardingProfile,
  updateProfile,
  updateProfileImage,
  deleteAccount,
})
