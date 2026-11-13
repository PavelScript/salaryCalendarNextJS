import type { Metadata } from "next";
import Wage from "./Wage";

export const metadata: Metadata = {
  title: "Укажите ваш оклад",
  description:
    "Данные не передаются третьим лицам, все расчеты происходят у вас на устройстве",

  robots: {
    index: false,
    follow: true,
  },
};

export default function WagePage() {
  return <Wage />;
}
