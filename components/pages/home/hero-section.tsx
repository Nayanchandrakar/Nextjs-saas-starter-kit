import { AnimatedGroup } from "@/components/magicui/animated-group"
import { TextEffect } from "@/components/magicui/text-effect"
import { buttonVariants } from "@/components/ui/button"
import { baseTransition } from "@/lib/motion/transitions"
import { ArrowRight } from "lucide-react"
import Link from "next/link"
import React from "react"

export function HeroSection() {
  return (
    <section className="relative mt-20 md:mt-28">
      <div className="text-center sm:mx-auto lg:mr-auto lg:mt-0">
        <AnimatedGroup variants={baseTransition}>
          <Link
            href="/callback"
            className="hover:bg-background dark:hover:border-t-border bg-muted group mx-auto flex w-fit items-center gap-4 rounded-full border p-1 pl-4 shadow-md shadow-zinc-950/5 transition-colors duration-300 dark:border-t-white/5 dark:shadow-zinc-950"
          >
            <span className="text-foreground text-sm">
              ✨ Introducing Next.js Saas Starter kit
            </span>
            <div className="bg-background group-hover:bg-muted size-6 overflow-hidden rounded-full duration-500">
              <div className="flex w-12 -translate-x-1/2 duration-500 ease-in-out group-hover:translate-x-0">
                <span className="flex size-6">
                  <ArrowRight className="m-auto size-3" />
                </span>
                <span className="flex size-6">
                  <ArrowRight className="m-auto size-3" />
                </span>
              </div>
            </div>
          </Link>
        </AnimatedGroup>

        <TextEffect
          preset="fade-in-blur"
          speedSegment={0.3}
          as="h1"
          className="mt-8 text-balance text-6xl md:text-7xl lg:mt-14 xl:text-[5.25rem] font-acorn mx-auto max-w-2xl"
        >
          Ship Faster with a Next.js SaaS Kit
        </TextEffect>

        <TextEffect
          per="line"
          preset="fade-in-blur"
          speedSegment={0.3}
          delay={0.5}
          as="p"
          className="mx-auto mt-7 max-w-2xl text-balance text-lg "
        >
          Launch your next saas product with Next.js 15, Drizzle, Neon
          Serverless, Better auth, Nodemailer, AWS, Shadcn/ui, Stripe.
        </TextEffect>

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
          className="mt-10 flex flex-col items-center justify-center gap-2 md:flex-row"
        >
          <Link
            className={buttonVariants({
              size: "lg",
              className: "rounded-xl px-5 text-base",
            })}
            href="/callback"
          >
            Start Building
          </Link>

          <Link
            className={buttonVariants({
              variant: "ghost",
              size: "lg",
              className: "h-10.5 rounded-xl px-5",
            })}
            href="/callback"
          >
            Try a demo
          </Link>
        </AnimatedGroup>
      </div>
    </section>
  )
}
