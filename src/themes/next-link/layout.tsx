import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/components/ThemeProvider";
import bioConfig from "./config";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: bioConfig.seo.title.default,
    description: bioConfig.seo.description,
    openGraph: {
        type: "website",
        locale: "en_US",
        url: bioConfig.seo.url,
        title: bioConfig.seo.title.default,
        description: bioConfig.seo.description,
        siteName: bioConfig.profile.name,
        images: [
            {
                url: bioConfig.profile.avatar,
                width: 1200,
                height: 630,
                alt: bioConfig.profile.name,
            },
        ],
    },
    twitter: {
        card: "summary_large_image",
        title: bioConfig.seo.title.default,
        description: bioConfig.seo.description,
        images: [bioConfig.profile.avatar],
    },
    icons: {
        icon: "/favicon.ico",
    },
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en" suppressHydrationWarning>
            <body className={inter.className}>
                <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
                    <TooltipProvider>
                        <Toaster />
                        <Sonner />
                        {children}
                    </TooltipProvider>
                </ThemeProvider>
            </body>
        </html>
    );
}
