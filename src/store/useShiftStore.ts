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
      setWorkShift: (
        monthIndex: number,
        dayId: number,
        shiftType: ShiftType | "none"
      ) =>
        set((state) => {
          const newDays = [...state.DAYS];
          const dayIndex = newDays.findIndex(
            (day) => day.month === monthIndex && day.id === dayId
          );

          if (dayIndex === -1) return state;

          const workShift = shiftType === "none" ? "offShift" : shiftType;

          // Обновляем текущий день
          const updatedDay = {
            ...newDays[dayIndex],
            workShift,
            dayHours: 0,
            nightHours: 0,
          };

          if (workShift === "offShift") {
            updatedDay.dayHours = 0;
            const nextDayIndex = dayIndex + 1;
            if (nextDayIndex < newDays.length) {
              newDays[nextDayIndex] = {
                ...newDays[nextDayIndex],
                dayHours: 0,
                nightHours: 0,
              };
            }
          }

          // Устанавливаем часы в зависимости от типа смены
          if (workShift === "dayShift") {
            updatedDay.dayHours = 12;
          } else if (workShift === "nightShift") {
            updatedDay.dayHours = 2;
            updatedDay.nightHours = 2;

            // Обновляем следующий день для ночной смены
            const nextDayIndex = dayIndex + 1;
            if (nextDayIndex < newDays.length) {
              newDays[nextDayIndex] = {
                ...newDays[nextDayIndex],
                dayHours: 2,
                nightHours: 6,
              };
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
