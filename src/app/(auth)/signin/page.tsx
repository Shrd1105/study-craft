'use client'

import { SignInForm } from "@/components/auth/SignInForm"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

export default function SignInPage() {
  const { data: session } = useSession()
  const router = useRouter()

  useEffect(() => {
    if (session) {
      router.push('/home')
    }
  }, [session, router])

  return (
    <div className="container mx-auto max-w-md mt-20">
      <div className="bg-white p-8 rounded-xl border-2 border-black">
        <h1 className="text-2xl font-bold text-center mb-6">Sign In to Mind Mentor</h1>
        <SignInForm />
        <p className="mt-4 text-center text-sm text-gray-600">
          Don't have an account?{' '}
          <a href="/register" className="text-[#7fb236] hover:underline">
            Sign up
          </a>
        </p>
      </div>
    </div>
  )
} 