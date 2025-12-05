
import type { Metadata } from "next";
import DistrictCoefficient from "./DistrictCoefficient";

export const metadata: Metadata = {
  title: "Выбор районного коэффициента", 
  description:
    "Укажите ваш районный коэффициент для точного расчёта зарплаты с учётом отработанных часов за месяц",

      robots: {
    index: false,
    follow: true,
  },
};


export default function DictrictCoefficientPage() {
  return (
    <DistrictCoefficient />
  )
}