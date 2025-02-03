export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-[#FFFAEC] w-full max-w-[100vw] overflow-x-hidden">
      {children}
    </div>
  )
} 