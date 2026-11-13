
import type { Metadata } from "next";
import ShiftPatternConstructorPage from "./ShiftPatternConstructorPage";

export const metadata: Metadata = {
  title: "Выбор типа сменного графика",
  description:
    "Укажите ваш паттерн работы по сменам, чтобы расставить дни на два года и вы могли знать когда вам на работу",

  robots: {
    index: false,
    follow: true,
  },
};

export default function ShiftPatternPage() {
  return <ShiftPatternConstructorPage />;
}
