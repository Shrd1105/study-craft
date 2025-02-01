'use client'

import { BookOpen, Brain, MessageCircle } from 'lucide-react'
import { HeroSection } from './sections/HeroSection'
import { FeaturesGrid } from './sections/FeatureGrid'

export function MindMentorLanding() {
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
      icon: <MessageCircle className="h-6 w-6 text-[#7fb236]" />,
      title: "Intelligent Q&A",
      description: "Get instant answers to your questions as you learn."
    }
  ]

  return (
    <>
      <HeroSection
        title="Welcome to"
        highlightedText="Mind Mentor"
        description="Your AI-powered study assistant for accelerated learning"
        ctaText="Start Learning"
        ctaLink="/home"
      />
      <FeaturesGrid features={features} />
    </>
  )
}