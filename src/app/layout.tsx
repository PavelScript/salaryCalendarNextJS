import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import YandexMetrika from "@/components/YandexMetrica/YandexMetrica";

const inter = Inter({
  subsets: ["latin", "cyrillic"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Расчётки.ру",
  description:
    "Бесплатный онлайн-калькулятор зарплаты при сменном графике работы, график смен",
  keywords:
    "рассчитать зарплату по сменам, калькулятор зарплаты, сменный график, график смен, зарплата онлайн, 2/2, сутки через трое, ночные смены, переработка, производственный календарь, расчёт заработной платы, суммированный учет рабочего времени",

  // Open Graph (для Facebook, Telegram, VK и т.д.)
  openGraph: {
    title: "Расчётка.ру — Бесплатный калькулятор смен и зарплаты",
    description:
      "Постройте график смен и рассчитайте зарплату на год вперед. Быстро, удобно, бесплатно.",
    url: "https://raschetki.ru",
    siteName: "Расчётки.ру",
    images: [
      {
        url: "/images/raschetkiMainPage.png",
        width: 1100,
        height: 800,
      },
    ],
    locale: "ru_RU",
    type: "website",
  },

  // Twitter Card (для Twitter/X)
  twitter: {
    card: "summary_large_image",
    title: "Расчётка.ру — Бесплатный калькулятор смен и зарплаты",
    description:
      "Постройте график смен и рассчитайте зарплату на год вперед. Быстро, удобно, бесплатно.",
    images: ["/images/raschetkiMainPage.png"],
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },

  icons: {
    icon: "/favicon.ico",
    apple: "/appleIcon.png",
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
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Расчётки.ру" />
      </head>
      <body className={inter.variable}>
        {children}
        <YandexMetrika />
      </body>
    </html>
  );
}
