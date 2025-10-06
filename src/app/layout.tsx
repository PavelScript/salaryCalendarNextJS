import type { Metadata } from "next";
import { Inter } from "next/font/google"; // ✅ Импортируем Inter
import "./globals.css";

// Настройка шрифта Inter
const inter = Inter({
  subsets: ["latin"],
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
      
      <body className={inter.variable}> {/* ✅ Используем переменную шрифта */}
        {children}
      </body>
    </html>
  );
}