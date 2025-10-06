import { create } from "zustand";
import { persist } from "zustand/middleware";

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
      salaryPerMonth: 50000,
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