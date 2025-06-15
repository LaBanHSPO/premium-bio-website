import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import '../globals.css'
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ReactQueryProvider } from './providers'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'My Bio - Professional Bio Link',
  description: 'Free bio-web for everyone. Wanted help non-tech founder scale your SaaS for better profits & UX!',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ReactQueryProvider>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <Analytics/>
            {children}
          </TooltipProvider>
        </ReactQueryProvider>
      </body>
    </html>
  )
}
