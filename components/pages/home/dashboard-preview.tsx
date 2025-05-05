import { BorderBeam } from "@/components/magicui/border-beam"
import { NeonGradientCard } from "@/components/magicui/neon-gradient"
import Container from "@/components/shared/container"
import Image from "next/image"

export const DashboardPreview = () => {
  return (
    <Container>
      <div className="relative overflow-hidden rounded-lg ">
        <BorderBeam
          duration={10}
          size={250}
          colorFrom="#c084fc"
          colorTo="#3b82f6"
        />
        <div className="absolute w-full inset-0 bg-gradient-to-b from-transparent via-transparent to-black  blur-[1px]" />
        <Image
          alt="hero-image"
          src="/home/hero-dark.png"
          sizes="100vw"
          width={1000}
          height={1000}
          className="size-full h-fit"
          priority
        />
      </div>
    </Container>
  )
}
