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
  shiftPattern: ShiftType[];
  dayHours: number[];
  nightHours: number[];
  dayByMonth: MonthDays[];
  setStartDayPattern: (value: number) => void;
  setStartDayChosen: (value: boolean) => void;
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
      shiftPattern: [],
      dayByMonth: [],
      dayHours: [],
      nightHours: [],
      setStartDayPattern: (value) => set({ startDayPattern: value }),
      setStartDayChosen: (value) => set({ startDayChosen: value }),
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

interface SalaryState {
  salaryPerMonth: number;
  districtCoefficient: number;
  northCoefficient: number;

  setSalaryPerMonth: (value: number) => void;
  setDistrictCoefficient: (value: number) => void;
  setNorthCoefficient: (value: number) => void;
}

export const useSalaryStore = create<SalaryState>()(
  persist(
    (set) => ({
      salaryPerMonth: 0,
      districtCoefficient: 1,
      northCoefficient: 1,

      setSalaryPerMonth: (value) => set({ salaryPerMonth: value }),
      setDistrictCoefficient: (value) => set({ districtCoefficient: value }),
      setNorthCoefficient: (value) => set({ northCoefficient: value }),
    }),
    {
      name: "salary-storage", // unique name for localStorage key
    }
  )
);