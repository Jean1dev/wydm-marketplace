import { Geist, Geist_Mono } from "next/font/google";
import type { Metadata } from "next";
import "./globals.css";
import Layout from "./layout-client";
import { Providers } from "./providers";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Comunidade Crypto",
  description: "Comunidade Crypto",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <Providers>
          <Layout>
            {children}
          </Layout>
        </Providers>
      </body>
    </html>
  );
}
