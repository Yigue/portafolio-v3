import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/ui/Navbar";
import SmoothScroll from "@/components/ui/SmoothScroll";
import { metadata as portfolioMetadata } from "@/data/portfolio-data";
import { LanguageProvider } from '@/context/LanguageContext';

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
});

export const metadata: Metadata = {
  title: portfolioMetadata.title,
  description: portfolioMetadata.description,
  openGraph: {
    title: portfolioMetadata.title,
    description: portfolioMetadata.description,
    type: "website",
    locale: portfolioMetadata.locale,
    images: [
      {
        url: "/og-image.jpg", // User should provide this image in public/
        width: 1200,
        height: 630,
        alt: portfolioMetadata.title,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: portfolioMetadata.title,
    description: portfolioMetadata.description,
    images: ["/og-image.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={`${inter.variable} ${jetbrainsMono.variable}`}>
      <body className={inter.className}>
        <LanguageProvider>
          <SmoothScroll>
            <Navbar />
            {children}
          </SmoothScroll>
        </LanguageProvider>
      </body>
    </html>
  );
}
