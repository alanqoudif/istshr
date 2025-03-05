import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navigation from "@/components/layout/Navigation";
import ClientAuthInitializer from "@/components/auth/ClientAuthInitializer";
import BetaNotification from "@/components/ui/BetaNotification";

const inter = Inter({ subsets: ["latin", "arabic"] });

export const metadata: Metadata = {
  title: "استشر - منصة الاستشارات الرقمية",
  description: "تواصل مع مستشارين خبراء للحصول على التوجيه والدعم",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl">
      <body className={inter.className}>
        <ClientAuthInitializer />
        <Navigation />
        {children}
        <BetaNotification language="ar" />
      </body>
    </html>
  );
}
