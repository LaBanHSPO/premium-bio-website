import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "@/themes/next-star/globals.css";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ReactQueryProvider } from "./providers";
import { config } from "@/themes/next-star/config";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL(config.seo.url),
  title: {
    default: config.seo.title.default,
    template: config.seo.title.template,
  },
  description: config.seo.description,
  keywords: config.seo.keywords,
  authors: [{ name: config.profile.name, url: config.seo.url }],
  creator: config.profile.name,
  publisher: "SiteHub",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: config.seo.url,
    title: config.seo.title.default,
    description: config.seo.description,
    siteName: config.seo.openGraph.siteName,
    images: [
      {
        url: config.profile.avatarUrl,
        width: 1200,
        height: 630,
        alt: config.profile.name,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: config.seo.title.default,
    description: config.seo.description,
    images: [config.profile.avatarUrl],
    creator: config.seo.twitter.creator,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
  manifest: "/site.webmanifest",
  alternates: {
    canonical: config.seo.url,
  },
  verification: {
    google: "your-google-verification-code",
    yandex: "your-yandex-verification-code",
  },
  category: "technology",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ReactQueryProvider>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <Analytics />
            {children}
          </TooltipProvider>
        </ReactQueryProvider>
      </body>
    </html>
  );
}
