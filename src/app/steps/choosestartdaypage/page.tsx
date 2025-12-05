import type { Metadata } from "next";
import ChooseStartDayPage from "./chooseStartDayPage";

export const metadata: Metadata = {
  title: "Выбор первого дня для построения графика работы",
  description: "Выберите день с которого построить ваш график работы",

  robots: {
    index: false,
    follow: true,
  },
};

export default function ChooseStartDay() {
  return <ChooseStartDayPage />;
}
