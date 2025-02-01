"use client"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { BookOpen, Brain, Home, Settings, BarChart, Timer } from "lucide-react"

interface DashboardNavProps extends React.HTMLAttributes<HTMLDivElement> {}

export function DashboardNav({ className, ...props }: DashboardNavProps) {
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
      label: 'Analytics',
      icon: BarChart,
      color: 'text-emerald-500',
      href: '/analytics',
    },
    {
      label: 'Settings',
      icon: Settings,
      href: '/settings',
    },
  ]

  return (
    <div className={cn("h-full py-6", className)} {...props}>
      <div className="space-y-4 py-4">
        <div className="px-3 py-2">
          <div className="space-y-1">
            {routes.map((route) => (
              <Button
                key={route.href}
                variant={pathname === route.href ? "default" : "ghost"}
                className={cn(
                  "w-full justify-start gap-2",
                  pathname === route.href && "bg-[#c1ff72] hover:bg-[#b1ef62]"
                )}
                asChild
              >
                <Link href={route.href}>
                  <route.icon className={cn("h-5 w-5", route.color)} />
                  {route.label}
                </Link>
              </Button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
} 