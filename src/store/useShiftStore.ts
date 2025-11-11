import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Day, ShiftType } from "@/types/user.types";

interface ShiftState {
  startDayPattern: number;
  startDayChosen: boolean;
  shiftPatternKey: string;
  shiftPattern: ShiftType[];
  dayHours: number[];
  nightHours: number[];
  DAYS: Day[];
  setStartDayPattern: (value: number) => void;
  setStartDayChosen: (value: boolean) => void;
  setShiftPatternKey: (value: string) => void;
  setShiftPattern: (pattern: ShiftType[]) => void;
  setDayHours: (pattern: number[]) => void;
  setNightHours: (pattern: number[]) => void;
  setDAYS: (days: Day[]) => void;
  setWorkShift: (
    monthIndex: number,
    dayId: number,
    shiftType: ShiftType | "none",
    year: number
  ) => void;
}

export const useShiftStore = create<ShiftState>()(
  persist(
    (set) => ({
      startDayPattern: 0,
      startDayChosen: false,
      shiftPatternKey: "",
      shiftPattern: [],
      DAYS: [],
      dayHours: [],
      nightHours: [],
      setStartDayPattern: (value) => set({ startDayPattern: value }),
      setStartDayChosen: (value) => set({ startDayChosen: value }),
      setShiftPatternKey: (value) => set({ shiftPatternKey: value }),
      setShiftPattern: (pattern) => set({ shiftPattern: pattern }),
      setDayHours: (pattern) => set({ dayHours: pattern }),
      setNightHours: (pattern) => set({ nightHours: pattern }),
      setDAYS: (days) => set({ DAYS: days }),
      setWorkShift: (monthIndex, dayId, shiftType, year) =>
        set((state) => {
          const newDays = [...state.DAYS];
          console.log(year);
          const dayIndex = newDays.findIndex(
            (d) => d.month === monthIndex && d.id === dayId && d.year === year
          );
          if (dayIndex === -1) return state;

          const oldShift = newDays[dayIndex].workShift;
          const newShift = shiftType === "none" ? "offShift" : shiftType;
          const prevShift = newDays[dayIndex - 1]?.workShift;

          // 1. Удаляем старый "хвост" ночной смены, если был
          if (oldShift === "nightShift") {
            const nextId = dayIndex + 1;

            if (nextId < newDays.length) {
              newDays[nextId] = {
                ...newDays[nextId],
                dayHours: Math.max(0, newDays[nextId].dayHours - 2),
                nightHours: Math.max(0, newDays[nextId].nightHours - 6),
              };
            }
          }

          // 2. Устанавливаем новый тип смены
          const updatedDay = { ...newDays[dayIndex], workShift: newShift };

          if (newShift === "dayShift") {
            updatedDay.dayHours = 12;
            updatedDay.nightHours = 0;
          } else if (newShift === "nightShift") {
            updatedDay.dayHours = 2;
            updatedDay.nightHours = 2;
              if (prevShift === "nightShift") {
                updatedDay.dayHours = 4;
                updatedDay.nightHours = 8;
              }

            // Adding remains of night shift to the next day
            const nextId = dayIndex + 1;
            if (nextId < newDays.length) {
              newDays[nextId] = {
                ...newDays[nextId],
                dayHours: (newDays[nextId].dayHours || 0) + 2,
                nightHours: (newDays[nextId].nightHours || 0) + 6,
              };
            }
          } else {
            if (prevShift === "nightShift") {
              updatedDay.dayHours = 2;
              updatedDay.nightHours = 6;
            } else {
              updatedDay.dayHours = 0;
              updatedDay.nightHours = 0;
            }
          }

          newDays[dayIndex] = updatedDay;
          return { DAYS: newDays };
        }),
    }),
    {
      name: "shift-storage",
      partialize: (state) => ({
        ...state,
      }),
    }
  )
);
