import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { Header } from "@/components/Header";
import { Analytics } from "@vercel/analytics/react"
import { NextAuthProvider } from "@/providers/NextAuthProvider";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});

const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
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
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen bg-[#FFFAEC]`}>
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
