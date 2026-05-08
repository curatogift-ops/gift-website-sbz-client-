import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import QueryProvider from "@/components/providers/QueryProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Giftz Gallerei | Premium Corporate & Personalized Gifting",
  description: "Discover luxury gift hampers, corporate gifting solutions, and personalized gifts at Giftz Gallerei. Bangalore's finest gifting experience.",
  keywords: "corporate gifting, personalized hampers, luxury gifts, Bangalore gifting, Giftz Gallerei",
  openGraph: {
    title: "Giftz Gallerei | Premium Gifting",
    description: "Bangalore's finest corporate and personalized gifting platform.",
    type: "website",
    locale: "en_IN",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col bg-background text-foreground font-sans">
        <QueryProvider>
          {children}
        </QueryProvider>
      </body>
    </html>
  );
}
