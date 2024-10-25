import FeatureSection from './FeatureSection/FeatureSection'
import Hero from '@/components/LandingPage/Hero'
import VideoDemo from '@/components/VideoDemo'
import React from 'react'
import HowItWorks from './HowItWorks'

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