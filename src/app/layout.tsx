import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import YandexMetrika from "@/components/YandexMetrica/YandexMetrica";

const inter = Inter({
  subsets: ["latin", "cyrillic"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Расчётки.ру ",
  description:
    "Бесплатный онлайн-кальклуятор зарплаты при сменном графике работы, график смен",

  icons: {
    icon: "/images/favicon.svg",
    apple: "/images/iphoneIco.png",

  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <head>
        <link rel="manifest" href="/manifest.json" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="SalaryCalendar" />
      </head>
      <body className={inter.variable}>
        {children}
        <YandexMetrika />
      </body>
    </html>
  );
}
