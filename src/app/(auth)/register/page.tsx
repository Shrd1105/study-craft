'use client'

import { SignUpForm } from "@/components/auth/SignUpForm"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import Link from "next/link"

export default function RegisterPage() {
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
        <h1 className="text-2xl font-bold text-center mb-6">Create your account</h1>
        <SignUpForm />
        <p className="mt-4 text-center text-sm text-gray-600">
          Already have an account?{' '}
          <Link href="/signin" className="text-[#7fb236] hover:underline">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  )
} 