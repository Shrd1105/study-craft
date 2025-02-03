import { DashboardNav } from "@/components/dashboard/DashboardNav"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-[calc(100vh-3.5rem)] mt-14">
      <div className="flex flex-col md:flex-row">
        {/* Mobile nav - shown only on small screens */}
        <div className="md:hidden fixed bottom-0 left-0 right-0 h-16 border-t border-black bg-white z-50">
          <DashboardNav className="h-full" />
        </div>

        {/* Desktop nav - hidden on small screens */}
        <div className="hidden md:block fixed left-0 w-64 h-[calc(100vh-3.5rem)] border-r border-black bg-white">
          <DashboardNav className="h-full" />
        </div>

        {/* Main content */}
        <div className="w-full md:pl-64 pb-16 md:pb-0">
          <main className="container mx-auto p-4 md:p-8">
            {children}
          </main>
        </div>
      </div>
    </div>
  )
}