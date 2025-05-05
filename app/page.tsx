import { Navbar } from "@/components/navbar"
import { DashboardPreview } from "@/components/pages/home/dashboard-preview"
import { HeroSection } from "@/components/pages/home/hero-section"

export default async function Home() {
  return (
    <>
      <Navbar />
      <HeroSection />
      <DashboardPreview />
    </>
  )
}
