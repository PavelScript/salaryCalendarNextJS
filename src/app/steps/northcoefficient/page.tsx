
import type { Metadata } from "next";
import NorthCoefficient from "./NorthCoefficient"

export const metadata: Metadata = {
  title: "Выбор северного коэффициента", 
  description:
    "Укажите ваш северный коэффициент для точного расчёта зарплаты с учётом отработанных часов за месяц",
};


export default function NorthCoefficientPage() {
  return(
    <NorthCoefficient/>
  )
}