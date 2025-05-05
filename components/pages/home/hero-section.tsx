import { AuroraText } from "@/components/magicui/aurora-text"
import Container from "@/components/shared/container"
import { Button } from "@/components/ui/button"

export const HeroSection = () => {
  return (
    <Container
      asChild
      className="size-full flex items-center justify-center my-28"
    >
      <section>
        <div className="max-w-[1000px] mx-auto">
          <h1 className="font-extrabold text-4xl sm:text-5xl md:text-6xl mb-8 leading-none  tracking-tight text-center">
            <AuroraText colors={["#c084fc", "#22c55e", "#3b82f6"]}>
              Ship Faster
            </AuroraText>{" "}
            with prebuilt components, blocks &amp; pages{" "}
          </h1>
          <p className="text-xl mb-12 text-secondary-foreground/60 max-w-[700px] text-center mx-auto leading-relaxed ">
            No more starting from scratch—simply pick, copy, and paste to speed
            up your development from growing librabry of beautifully crafted UI
            components, landing pages, and dashboards
          </p>
          <div className="flex items-center justify-center" aria-hidden>
            <Button size="lg">Start Saving Time</Button>
          </div>
        </div>
      </section>
    </Container>
  )
}
