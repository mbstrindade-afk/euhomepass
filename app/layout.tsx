
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import I18nProvider from "../components/I18nProvider";
import ClientProviders from './providers';

const appUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(appUrl),
  title: "HomePass — Live Anywhere. Share Everywhere.",
  description: "A primeira comunidade de casas partilhadas por cidadãos da UE — sem renda, sem faturas, com seguro comunitário incluído.",
  icons: {
    icon: "/loguinho.png",
  },
  openGraph: {
    title: "HomePass — Live Anywhere. Share Everywhere.",
    description: "A primeira comunidade de casas partilhadas por cidadãos da UE — sem renda, sem faturas, com seguro comunitário incluído.",
    url: "https://homepass.eu/",
    siteName: "HomePass",
    images: [
      {
        url: "/loguinho.png",
        width: 1200,
        height: 630,
        alt: "HomePass — Live Anywhere. Share Everywhere.",
      },
    ],
    locale: "pt_PT",
    type: "website",
  },
  manifest: "/manifest.json",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt">
      <head>
        <link rel="icon" href="/loguinho.png" />
        <link rel="manifest" href="/manifest.json" />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <I18nProvider>
          <ClientProviders>
            {children}
          </ClientProviders>
        </I18nProvider>
      </body>
    </html>
  );
}
