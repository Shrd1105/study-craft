"use client"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { BookOpen, Brain, FileText, Home, Timer } from "lucide-react"

export function DashboardNav({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  const pathname = usePathname()

  const routes = [
    {
      label: 'Home',
      icon: Home,
      href: '/home',
      color: 'text-sky-500',
    },
    {
      label: 'Study Planner',
      icon: BookOpen,
      href: '/study-plan', 
      color: 'text-violet-500',
    },
    {
      label: 'Resources',
      icon: Brain,
      href: '/resources',
      color: 'text-pink-700',
    },
    {
      label: 'Timer',
      icon: Timer,
      color: 'text-orange-700',
      href: '/timer',
    },
    {
      label: 'Notes',
      icon: FileText,
      color: 'text-emerald-500',
      href: '/notes',
    },
  ]

  return (
    <div className={cn("h-full py-2 sm:py-6", className)} {...props}>
      <div className="space-y-2 sm:space-y-4 py-2 sm:py-4">
        <div className="px-2 sm:px-3 py-1 sm:py-2">
          <div className="flex flex-row sm:flex-col gap-1 sm:gap-2 overflow-x-auto sm:overflow-visible">
            {routes.map((route) => (
              <Button
                key={route.href}
                variant={pathname === route.href ? "default" : "ghost"}
                className={cn(
                  "min-w-[5rem] sm:w-full justify-center sm:justify-start gap-2 px-2 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm",
                  pathname === route.href && "bg-[#c1ff72] hover:bg-[#b1ef62]"
                )}
                asChild
              >
                <Link href={route.href}>
                  <route.icon className={cn("h-4 w-4 sm:h-5 sm:w-5", route.color)} />
                  <span className="hidden sm:inline">{route.label}</span>
                  <span className="inline sm:hidden">{route.label.split(' ')[0]}</span>
                </Link>
              </Button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}