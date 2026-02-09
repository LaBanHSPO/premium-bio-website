
import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "SiteHub Bio",
    description: "Your bio link page",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className="antialiased">
                {children}
            </body>
        </html>
    );
}
