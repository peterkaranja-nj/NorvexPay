'use client'
import { useState, useCallback } from 'react'
import Preloader from '@/components/shared/Preloader'
import CustomCursor from '@/components/shared/CustomCursor'
import ScrollProgress from '@/components/shared/ScrollProgress'
import Navbar from '@/components/shared/Navbar'
import Footer from '@/components/shared/Footer'
import HeroSection from '@/components/landing/HeroSection'
import TrustBar from '@/components/landing/TrustBar'
import BentoGrid from '@/components/landing/BentoGrid'
import DeveloperSection from '@/components/landing/DeveloperSection'
import SolutionsSection from '@/components/landing/SolutionsSection'
import SecuritySection from '@/components/landing/SecuritySection'
import MetricsSection from '@/components/landing/MetricsSection'
import Testimonials from '@/components/landing/Testimonials'
import PricingSection from '@/components/landing/PricingSection'
import CTABanner from '@/components/landing/CTABanner'

export default function Home() {
  const [loaded, setLoaded] = useState(false)

  const handleComplete = useCallback(() => {
    setLoaded(true)
  }, [])

  return (
    <>
      <Preloader onComplete={handleComplete} />
      {loaded && (
        <>
          <CustomCursor />
          <ScrollProgress />
          <Navbar />
          <main>
            <HeroSection />
            <TrustBar />
            <BentoGrid />
            <DeveloperSection />
            <SolutionsSection />
            <SecuritySection />
            <MetricsSection />
            <Testimonials />
            <PricingSection />
            <CTABanner />
          </main>
          <Footer />
        </>
      )}
    </>
  )
}
