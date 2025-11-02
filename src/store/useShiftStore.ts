import { create } from "zustand";
import { persist } from "zustand/middleware";

// Типы смен
type ShiftType = "dayShift" | "nightShift" | "offShift";

interface Day {
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

type MonthDays = Day[];
interface ShiftState {
  startDayPattern: number;
  startDayChosen: boolean;
  shiftPatternKey: string;
  shiftPattern: ShiftType[];
  dayHours: number[];
  nightHours: number[];
  dayByMonth: MonthDays[];
  setStartDayPattern: (value: number) => void;
  setStartDayChosen: (value: boolean) => void;
  setShiftPatternKey: (value: string) => void;
  setShiftPattern: (pattern: ShiftType[]) => void;
  setDayHours: (pattern: number[]) => void;
  setNightHours: (pattern: number[]) => void;
  setDayByMonth: (days: MonthDays[]) => void;
  setWorkShift: (
    monthIndex: number,
    dayId: number,
    shiftType: ShiftType | "none"
  ) => void;
}

export const useShiftStore = create<ShiftState>()(
  persist(
    (set) => ({
      startDayPattern: 0,
      startDayChosen: false,
      shiftPatternKey: "",
      shiftPattern: [],
      dayByMonth: [],
      dayHours: [],
      nightHours: [],
      setStartDayPattern: (value) => set({ startDayPattern: value }),
      setStartDayChosen: (value) => set({ startDayChosen: value }),
      setShiftPatternKey: (value) => set({ shiftPatternKey: value }),
      setShiftPattern: (pattern) => set({ shiftPattern: pattern }),
      setDayHours: (pattern) => set({ dayHours: pattern }),
      setNightHours: (pattern) => set({ nightHours: pattern }),
      setDayByMonth: (days) => set({ dayByMonth: days }),
      setWorkShift: (
        monthIndex: number,
        dayId: number,
        shiftType: ShiftType | "none"
      ) =>
        set((state) => {
          const newDayByMonth = [...state.dayByMonth];

          if (!newDayByMonth[monthIndex]) return state;

          const newMonth = [...newDayByMonth[monthIndex]];
          const dayIndex = newMonth.findIndex((day) => day.id === dayId);
          if (dayIndex === -1) return state;

          const workShift = shiftType === "none" ? "offShift" : shiftType;

          // Определяем часы в зависимости от типа смены
          let dayHours = 0;
          let nightHours = 0;

          if (workShift === "dayShift") {
            dayHours = 12;
            nightHours = 0;
          } else if (workShift === "nightShift") {

            
          }
          // для "offShift" остаются 0

          newMonth[dayIndex] = {
            ...newMonth[dayIndex],
            workShift,
            dayHours,
            nightHours,
          };

          newDayByMonth[monthIndex] = newMonth; 

          return { dayByMonth: newDayByMonth };
        }),
    }),
    {
      name: "shift-storage", // unique name for localStorage key
      // Optional: you can serialize/deserialize Date objects if needed
      partialize: (state) => ({
        ...state,
        // Add any special serialization here if needed
      }),
    }
  )
);
