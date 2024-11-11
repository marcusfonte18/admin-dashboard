import type { Metadata } from "next";

import { Work_Sans } from "next/font/google";

import "./globals.css";

const workSans = Work_Sans({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Dashboard - Home",
  description: "",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt">
      <body className={`${workSans.className} antialiased`}>{children}</body>
    </html>
  );
}
