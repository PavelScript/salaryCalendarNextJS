
import type { Metadata } from "next";
import ShiftsReady from "./ShiftsReady"

export const metadata: Metadata = {
  title: "Ваш готовый график смен на 2025-2026 — Расчётка.ру", 
  description:
    "Просмотрите, отредактируйте и рассчитайте зарплату по готовому графику смен на 2025-2026 годы.",
};

export default function ShiftsReadyPage() {
  return (
    <ShiftsReady/>
  )
}