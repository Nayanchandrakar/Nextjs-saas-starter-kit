import { Marquee } from "@/components/magicui/marquee"
import Container from "@/components/shared/container"
import { BuildData } from "@/lib/constants/build-marquee-data"

export const BuildSection = () => {
  return (
    <Container className="mt-20 md:mt-28">
      <h2 className="text-base text-muted-foreground uppercase text-center font-semibold -mb-4">
        Powered By
      </h2>
      <div className="relative flex w-full flex-col items-center justify-center overflow-hidden">
        <Marquee pauseOnHover className="[--duration:20s] [--gap:1.8rem]">
          {BuildData.map(({ id, label, Icon }) => (
            <span
              key={id}
              className="flex items-center justify-center gap-2 transition duration-200 grayscale hover:grayscale-0 hover:text-foreground hover:cursor-pointer"
            >
              {Icon && <Icon className="w-auto h-10" />}
              {label && <span className="text-3xl font-semibold">{label}</span>}
            </span>
          ))}
        </Marquee>
        <div className="pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r from-background" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-1/4 bg-gradient-to-l from-background" />
      </div>
    </Container>
  )
}
