import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "@/themes/next-star/globals.css";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ReactQueryProvider } from "./providers";
import { profileData } from "@/themes/next-star/components/bio/data";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL("https://pandev00.sitehub.bio"),
  title: {
    default: "Ban Nguyen | (@pandev00)",
    template: "%s | (@pandev00)",
  },
  description:
    "Building things with code, expressing through music, centering with mindfulness",
  keywords: [
    "fullstack developer",
    "Ban Nguyen",
    "pandev00",
    "10 years experience",
    "sagozen digital",
    "web development",
    "mobile development",
    "nextjs developer",
    "react developer",
    "typescript developer",
    "cloudflare developer",
    "software engineer",
  ],
  authors: [{ name: "Ban Nguyen", url: "https://pandev00.sitehub.bio" }],
  creator: "Ban Nguyen",
  publisher: "Sagozen Digital",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://pandev00.sitehub.bio",
    title: "Ban Nguyen | (@pandev00)",
    description:
      "Building things with code, expressing through music, centering with mindfulness",
    siteName: "Ban Nguyen",
    images: [
      {
        url: profileData.avatarUrl,
        width: 1200,
        height: 630,
        alt: "Ban Nguyen",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Ban Nguyen | (@pandev00)",
    description:
      "Building things with code, expressing through music, centering with mindfulness",
    images: [profileData.avatarUrl],
    creator: "@pandev00",
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
    canonical: "https://pandev00.sitehub.bio",
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
