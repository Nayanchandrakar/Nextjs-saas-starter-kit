import { Logo } from "@/components/navbar/logo"
import { NavigationMenu } from "@/components/navbar/navigation-menu"
import Container from "@/components/shared/container"

export const Navbar = () => {
  return (
    <header className="bg-background border-b w-full h-14">
      <Container asChild className="flex items-center justify-between gap-5">
        <nav>
          <Logo />
          <NavigationMenu />
        </nav>
      </Container>
    </header>
  )
}
