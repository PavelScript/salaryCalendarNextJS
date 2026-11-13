//@/types/user.types

export interface Day {
  yearId: number;
  id: number; // день месяца (1–31)
  year: number;
  month: number; // 0–11 (как в JS Date)
  workShift: "dayShift" | "nightShift" | "offShift";
  weekDay: number; // 0 (воскресенье) – 6 (суббота)
  holiday: boolean;
  extraShift: boolean;
  dayHours: number;
  nightHours: number;
}

export type ShiftType = "dayShift" | "nightShift" | "offShift";

