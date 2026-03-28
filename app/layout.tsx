import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { ClerkProvider } from "@clerk/nextjs";

const inter = Inter({subsets:['latin'],variable:'--font-sans'});

export const metadata: Metadata = {
  title: "StocKing",
  description: "Ai-powered stock market analysis and prediction tool",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider afterSignOutUrl="/">
    <html lang="en" className={cn("font-sans", inter.variable)}>
      <body
      >
        {children}
      </body>
    </html>
    </ClerkProvider>
  );
}
