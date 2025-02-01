'use client'

import { BookOpen, Brain, Clock } from 'lucide-react'
import { HeroSection } from '@/components/sections/HeroSection'
import { FeaturesGrid } from '@/components/sections/FeatureGrid'


export default function Page() {
  const features = [
    {
      icon: <BookOpen className="h-6 w-6 text-[#7fb236]" />,
      title: "Personalized Study Plans",
      description: "Get tailored study plans based on your goals and learning style."
    },
    {
      icon: <Brain className="h-6 w-6 text-[#7fb236]" />,
      title: "AI-Curated Resources",
      description: "Access the best learning materials curated by our AI."
    },
    {
      icon: <Clock className="h-6 w-6 text-[#7fb236]" />,
      title: "Time Management",
      description: "Manage your time effectively and stay on top of your studies."
    }
  ]

  return (
    <div className="container mx-auto px-4 py-16">
      <HeroSection
        title="Welcome to"
        highlightedText="Mind Mentor"
        description="Your AI-powered study assistant for accelerated learning"
        ctaText="Start Learning"
        ctaLink="/home"
      />
      <FeaturesGrid features={features} />
    </div>
  )
}