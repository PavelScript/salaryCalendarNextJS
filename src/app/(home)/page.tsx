import type { Metadata } from "next";
import Home from "./home";
import SectionOne from "./sectionOne/sectionOne";

export const metadata: Metadata = {
  title: "Расчётки.ру ",
  description:
    "Бесплатный онлайн-кальклуятор зарплаты при сменном графике работы, график смен",

  robots: {
    index: true, 
    follow: true,
  },

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
};

export default function WagePage() {
  return (
    <>
      <Home />
      <SectionOne />
    </>
  );
}
