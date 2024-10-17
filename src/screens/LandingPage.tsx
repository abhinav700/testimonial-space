import FeatureSection from '@/components/FeatureSection/FeatureSection'
import Hero from '@/components/Hero/Hero'
import VideoDemo from '@/components/VideoDemo'
import React from 'react'
import HowItWorks from './HowItWorks/HowItWorks'

const LandingPage = () => {
  return (
    <>
      <Hero />
      <FeatureSection />
      <HowItWorks />
      <VideoDemo />   
    </>
  )
}

export default LandingPage