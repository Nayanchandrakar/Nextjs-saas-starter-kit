import dynamic from "next/dynamic"

export const LoadProfileOnboaringForm = dynamic(
  () =>
    import("@/components/forms/onboarding/profile").then(
      (mod) => mod.ProfileOnboardingForm,
    ),
  {
    loading: () => "loading skeleton",
  },
)

export const LoadWorkspaceOnboarindForm = dynamic(
  () =>
    import("@/components/forms/onboarding/workspace").then(
      (mod) => mod.WorkSpaceOnboardingForm,
    ),
  {
    loading: () => "loading skeleton",
  },
)
