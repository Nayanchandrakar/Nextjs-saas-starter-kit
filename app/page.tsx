import { Navbar } from "@/components/navbar"
import { BuildSection } from "@/components/pages/home/build-section"
import { DashboardPreview } from "@/components/pages/home/dashboard-preview"
import { HeroSection } from "@/components/pages/home/hero-section"

export default function Home() {
  return (
    <>
      <Navbar />
      <HeroSection />
      <DashboardPreview />
      <BuildSection />
    </>
  )
}
