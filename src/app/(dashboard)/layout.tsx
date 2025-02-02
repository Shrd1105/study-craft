import { DashboardNav } from "@/components/dashboard/DashboardNav"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-[calc(100vh-3.5rem)] mt-14">
      <div className="flex">
        <div className="fixed left-0 w-64 h-[calc(100vh-3.5rem)] border-r border-black bg-white">
          <DashboardNav className="h-full" />
        </div>
        <div className="pl-64 w-full">
          <main className="container mx-auto p-8">
            {children}
          </main>
        </div>
      </div>
    </div>
  )
} 