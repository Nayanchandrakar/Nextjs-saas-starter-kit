import { ErrorComponent } from "@/components/shared/error-component"
import { TriangleAlert } from "lucide-react"

export function NoActiveSubscription() {
  return (
    <ErrorComponent>
      <ErrorComponent.Icon
        Icon={TriangleAlert}
        className="text-red-500 size-12"
      />
      <ErrorComponent.Title className="mt-4">
        No Active Subscription Found
      </ErrorComponent.Title>
      <ErrorComponent.Message className="mb-4">
        It appears your subscription is either inactive or has expired.
        <br /> Please renew or contact support for assistance.
      </ErrorComponent.Message>
      <ErrorComponent.Link variant="link" href="/">
        Back to home
      </ErrorComponent.Link>
    </ErrorComponent>
  )
}
