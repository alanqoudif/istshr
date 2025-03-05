import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navigation from "@/components/layout/Navigation";
import ClientAuthInitializer from "@/components/auth/ClientAuthInitializer";
import BetaNotification from "@/components/ui/BetaNotification";

const inter = Inter({ 
  subsets: ["latin"],
  variable: "--font-inter"
});

export const metadata: Metadata = {
  title: "Istashr - Digital Counselling Platform",
  description: "Connect with expert counsellors for guidance and support",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ClientAuthInitializer />
        <Navigation />
        {children}
        <BetaNotification language="en" />
      </body>
    </html>
  );
}
