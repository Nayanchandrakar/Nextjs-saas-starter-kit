"use client"
import { AnimatedGroup } from "@/components/magicui/animated-group"
import { BorderBeam } from "@/components/magicui/border-beam"
import { Container } from "@/components/shared/container"
import { baseTransition } from "@/lib/motion/transitions"
import Image from "next/image"
import { useMediaQuery } from "usehooks-ts"

export const DashboardPreview = () => {
  const isMobile = useMediaQuery("(max-width: 767px)")
  const beamSize = isMobile ? 150 : 250

  return (
    <Container className="mt-8 sm:mt-12 md:mt-20">
      <AnimatedGroup
        variants={{
          container: {
            visible: {
              transition: {
                staggerChildren: 0.05,
                delayChildren: 0.75,
              },
            },
          },
          ...baseTransition,
        }}
      >
        <div className="relative overflow-hidden rounded-lg inset-shadow-2xs dark:inset-shadow-white/20 bg-background shadow-lg shadow-zinc-950/15">
          <BorderBeam duration={10} size={beamSize} />
          <div
            aria-hidden
            className="bg-linear-to-b to-background absolute inset-0 z-10 from-transparent from-35%"
          />

          <Image
            className="bg-background aspect-15/8  hidden rounded-2xl dark:block"
            src="/home/hero-dark.png"
            alt="app screen"
            width="2700"
            height="1440"
            priority
          />
          <Image
            className="z-2 border-border/25 aspect-15/8 rounded-2xl border dark:hidden"
            src="/home/hero-light.png"
            alt="app screen"
            width="2700"
            height="1440"
            priority
          />
        </div>
      </AnimatedGroup>
    </Container>
  )
}
