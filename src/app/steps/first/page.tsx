import type { Metadata } from "next";
import Greeting from "./greeting";

export const metadata: Metadata = {
  title: "Добро пожаловать в  калькулятор смен Расчётки.ру",
  description: "Мы не храним ваши данные и не передаём их третьим лицам",

  robots: {
    index: false,
    follow: true,
  },
};

export default function GreetingPage() {
  return <Greeting />;
}
