"use client";

import { useRouter } from "next/navigation";
import ShiftPatternConstructor from "@/components/ShiftPatternConstructor/ShiftPatternConstructor";
import styles from "../Questions.module.scss";
import Header from "@/components/Header/Header";
import { useShiftStore } from "@/store/useShiftStore";
import { useSalaryStore } from "@/store/useSalaryStore";
import type { ShiftType } from "@/types/user.types";

const ShiftPatternConstructorPage = () => {
  const router = useRouter();
  const { hoursPerShift } = useSalaryStore();
  const { setShiftPattern, setDayHours, setNightHours } = useShiftStore();

  const goBack = () => {
    router.push("/steps/hourspershift");
  };

  const buildScheduleFromArray = (shiftPatternArray: ShiftType[]) => {
    const dayHours: number[] = Array.from(
      { length: shiftPatternArray.length },
      () => 0
    );
    const nightHours: number[] = Array.from(
      { length: shiftPatternArray.length },
      () => 0
    );

    const hours = hoursPerShift || 8;

    for (let i = 0; i < shiftPatternArray.length; i++) {
      if (shiftPatternArray[i] === "dayShift") {
        dayHours[i] = hours;
      } else if (shiftPatternArray[i] === "nightShift") {
        dayHours[i] = dayHours[i] + 2;
        dayHours[i + 1] = dayHours[i + 1] + 2;
        nightHours[i] = nightHours[i] + 2;
        nightHours[i + 1] = nightHours[i + 1] + hours-6;
      } else if (shiftPatternArray[i] === "offShift") {
        dayHours[i] = dayHours[i];
        nightHours[i] = nightHours[i];
      }
    }

    return { dayHours, nightHours };
  };

  const handleConstructorSubmit = (shiftPatternArray: ShiftType[]) => {
    const { dayHours, nightHours } = buildScheduleFromArray(shiftPatternArray);

    setShiftPattern(shiftPatternArray);
    setDayHours(dayHours);
    setNightHours(nightHours);

    const hasNightShift = shiftPatternArray.some((b) => b === "nightShift");

    if (hasNightShift) {
      router.push("/steps/nightBonus");
    } else {
      router.push("/steps/districtcoefficient");
    }
  };

  return (
    <div className={styles.container}>
      <Header />
      <div className={styles.questionForm}>
        <ShiftPatternConstructor
          onSubmit={handleConstructorSubmit}
          onBack={goBack}
        />
      </div>
    </div>
  );
};

export default ShiftPatternConstructorPage;
