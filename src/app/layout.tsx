import type { Metadata } from "next";
import { Inter, Lexend } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { Header } from "@/components/Header";
import { Analytics } from "@vercel/analytics/react"
import { NextAuthProvider } from "@/providers/NextAuthProvider";

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

const lexend = Lexend({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-lexend',
});

export const metadata: Metadata = {
  title: "Mind Mentor - Your AI Study Assistant",
  description: "Accelerate your learning with AI-powered study plans and resources",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body 
        className={`${inter.variable} ${lexend.variable} font-sans antialiased min-h-screen bg--background`}
      >
        <NextAuthProvider>
          <Header />
          {children}
          <Toaster />
          <Analytics />
        </NextAuthProvider>
      </body>
    </html>
  );
}
