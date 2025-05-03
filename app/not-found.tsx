import { ErrorComponent } from "@/components/shared/error-component"
import { TriangleAlert } from "lucide-react"

export default function NotFound() {
  return (
    <ErrorComponent>
      <ErrorComponent.Icon Icon={TriangleAlert} />
      <ErrorComponent.Title>404 - Page Not Found</ErrorComponent.Title>
      <ErrorComponent.Message>
        The page you are looking for does not exist.
      </ErrorComponent.Message>
      <ErrorComponent.Link href="/callback">Go back to App</ErrorComponent.Link>
    </ErrorComponent>
  )
}
