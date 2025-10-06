import { create } from "zustand";
import { persist } from "zustand/middleware";

// Типы смен
type ShiftType = "dayShift" | "nightShift" | "offShift";

interface Day {
  id: number;
  dayOfWeek: number;
  date: Date;
  shift?: ShiftType;
  yearId: number;
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
  setShiftPatternKey:(value: string) => void;
  setShiftPattern: (pattern: ShiftType[]) => void;
  setDayHours: (pattern: number[]) => void;
  setNightHours: (pattern: number[]) => void;
  setDayByMonth: (days: MonthDays[]) => void;

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
      setShiftPatternKey: (value) => set({shiftPatternKey: value}),
      setShiftPattern: (pattern) => set({ shiftPattern: pattern }),
      setDayHours: (pattern) => set({ dayHours: pattern }),
      setNightHours: (pattern) => set({ nightHours: pattern }),
      setDayByMonth: (days) => set({ dayByMonth: days }),

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

