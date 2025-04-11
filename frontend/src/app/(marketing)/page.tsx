'use client'

import { BookOpen, Brain, Clock } from 'lucide-react'
import { HeroSection } from '@/components/sections/HeroSection'
import { FeaturesGrid } from '@/components/sections/FeatureGrid'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export default function Page() {
  const { data: session } = useSession()
  const router = useRouter()

  useEffect(() => {
    if (session) {
      router.push('/home')
    }
  }, [session, router])

  const features = [
    {
      icon: <BookOpen className="h-5 w-5 sm:h-6 sm:w-6 text-[#7fb236]" />,
      title: "Personalized Study Plans", 
      description: "Get tailored study plans based on your goals and learning style."
    },
    {
      icon: <Brain className="h-5 w-5 sm:h-6 sm:w-6 text-[#7fb236]" />,
      title: "AI-Curated Resources",
      description: "Access the best learning materials curated by our AI."
    },
    {
      icon: <Clock className="h-5 w-5 sm:h-6 sm:w-6 text-[#7fb236]" />,
      title: "Time Management",
      description: "Manage your time effectively and stay on top of your studies."
    }
  ]

  return (
    <div className="container mx-auto px-4 py-8 sm:py-16 bg-[#EFE9D5]">
      <HeroSection
        title="Welcome to"
        highlightedText="Study Craft"
        description="Your AI-powered study assistant for accelerated learning"
        ctaText={session ? "Go to Dashboard" : "Get Started"}
        ctaLink={session ? "/home" : "/register"}
      />
      
      <FeaturesGrid features={features} />
    </div>
  )
}