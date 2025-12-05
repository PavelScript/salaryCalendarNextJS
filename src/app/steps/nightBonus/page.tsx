import type { Metadata } from "next";
import NightBonus from "./NightBonus";

export const metadata: Metadata = {
  title: "Укажите доплату за работу в ночное время в процентах",
  description:
    "Наш калькулятор учитывает доплату за ночное время для расчёта зарплаты",

  robots: {
    index: false,
    follow: true,
  },
};

export default function NightBonusPage() {
  return <NightBonus />;
}
