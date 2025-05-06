import { ActionMenu } from "@/components/navbar/action-menu"
import { Logo } from "@/components/navbar/logo"
import Container from "@/components/shared/container"

export const Navbar = () => {
  return (
    <header className="bg-background border-b w-full h-14 sticky top-0 z-1">
      <Container asChild className="flex items-center justify-between gap-5">
        <nav>
          <Logo />
          <ActionMenu />
        </nav>
      </Container>
    </header>
  )
}
