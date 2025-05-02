import { ErrorComponent } from "@/components/shared/error-component"
import { TriangleAlert } from "lucide-react"

export function NoInvitationFound() {
  return (
    <ErrorComponent>
      <ErrorComponent.Icon
        Icon={TriangleAlert}
        className="text-red-500 size-12"
      />
      <ErrorComponent.Title className="mt-4">
        We could not find an invitation for you
      </ErrorComponent.Title>
      <ErrorComponent.Message className="mb-4">
        Invitation must have been expired
      </ErrorComponent.Message>
      <ErrorComponent.Link variant="link" href="/callback">
        Back to home
      </ErrorComponent.Link>
    </ErrorComponent>
  )
}
