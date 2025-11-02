import type { Metadata } from "next";
import { Inter } from "next/font/google"; // ✅ Импортируем Inter
import "./globals.css";
import YandexMetrika from "@/components/YandexMetrica/YandexMetrica";

const inter = Inter({
  subsets: ["latin", "cyrillic"],
  variable: "--font-inter", // Можно назвать переменную как угодно
});

export const metadata: Metadata = {
  title: "Calcendar",
  description: "ShiftsAndMoney",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="manifest" href="/manifest.json" />
        {/* iOS: позволяет добавлять в «Домашний экран» */}
        <meta name="apple-mobile-web-app-capable" content="yes" />
        {/* Стиль статус-бара (опционально) */}
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        {/* Название приложения (для ярлыка) */}
        <meta name="apple-mobile-web-app-title" content="SalaryCalendar" />
        {/* Иконка для iPhone (разные размеры) */}
        {/* <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/icons/apple-touch-icon.png"
        /> */}
      </head>
      <body className={inter.variable}>
        {children}
        <YandexMetrika />
      </body>
    </html>
  );
}
