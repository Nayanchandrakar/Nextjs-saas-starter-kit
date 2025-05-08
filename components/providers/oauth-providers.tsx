"use client"

import { Icons } from "@/components/shared/icons"
import { ListComponent } from "@/components/shared/list-component"
import { Button } from "@/components/ui/button"
import { OauthProviderType } from "@/types"

interface OauthProviderProps {
  isSubmitting?: boolean
  onClick: (type: OauthProviderType) => void
}

const Providers = [
  { label: "Login with Google", Icon: Icons.google, provider: "google" },
  { label: "Login with Github", Icon: Icons.Github, provider: "github" },
]

export const OauthProvider = ({
  isSubmitting = false,
  onClick,
}: OauthProviderProps) => {
  return (
    <ListComponent
      data={Providers}
      className="flex flex-col gap-3"
      renderItem={({ Icon, label, provider }, id) => (
        <Button
          key={id}
          disabled={isSubmitting}
          type="button"
          variant="outline"
          className="w-full"
          onClick={() => onClick(provider as OauthProviderType)}
        >
          <Icon
            className="me-1 text-muted-foreground size-4"
            aria-hidden="true"
          />
          {label}
        </Button>
      )}
    />
  )
}
