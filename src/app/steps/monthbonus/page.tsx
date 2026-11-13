import type { Metadata } from "next";
import MonthBonus from "./MonthBonus";

export const metadata: Metadata = {
  title: "Укажите премию за прошлый месяц работы в процентах",
  description:
    "Наш калькулятор учитывает премию за прошлый месяц для расчёта зарплаты",

  robots: {
    index: false,
    follow: true,
  },
};

export default function MonthBonusPage() {
  return <MonthBonus />;
}
