import dynamic from "next/dynamic"

export const LazyProfileOnboadingForm = dynamic(
  () =>
    import("@/components/forms/onboarding/profile").then(
      (mod) => mod.ProfileOnboardingForm,
    ),
  {
    loading: () => "loading",
  },
)
