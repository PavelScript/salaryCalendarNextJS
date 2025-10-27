import { create } from "zustand";
import { persist } from "zustand/middleware";

interface SalaryState {
  salaryPerMonth: number | null;
  districtCoefficient: number;
  northCoefficient: number;
  bonusPercent: number | null;

  setSalaryPerMonth: (value: number | null) => void;
  setDistrictCoefficient: (value: number) => void;
  setNorthCoefficient: (value: number) => void;
  setBonusPercent: (value: number) => void;
}

export const useSalaryStore = create<SalaryState>()(
  persist(
    (set) => ({
      salaryPerMonth: null,
      districtCoefficient: 1,
      northCoefficient: 1,
      bonusPercent: null,

      setSalaryPerMonth: (value) => set({ salaryPerMonth: value }),
      setDistrictCoefficient: (value) => set({ districtCoefficient: value }),
      setNorthCoefficient: (value) => set({ northCoefficient: value }),
      setBonusPercent: (value) => set({bonusPercent: value})
    }),
    {
      name: "salary-storage", // unique name for localStorage key
    }
  )
);