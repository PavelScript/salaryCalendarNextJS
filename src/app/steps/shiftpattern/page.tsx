// app/questions/third/page.tsx

import type { Metadata } from "next";
import ShiftPattern from "./ShiftPattern"

export const metadata: Metadata = {
  title: "Выбор типа сменного графика", 
  description:
    "Укажите ваш паттерн работы по сменам, чтобы расставить дни на два года и вы могли знать когда вам на работу",
};

export default function ShiftPatternPage() {
  return (
    <ShiftPattern/>
  )
}