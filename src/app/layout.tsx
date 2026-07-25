import type { Metadata } from "next";
import { DM_Sans, Fraunces } from "next/font/google";
import { AdminMenu } from "@/components/builder/AdminMenu";
import "./globals.css";

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
});

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Platform — Website Builder",
    template: "%s · Platform",
  },
  description: "Nền tảng dựng website kéo thả giống Shopify / WordPress",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="vi"
      className={`${dmSans.variable} ${fraunces.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans">
        {children}
        <AdminMenu />
      </body>
    </html>
  );
}
