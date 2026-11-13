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

    const len = shiftPatternArray.length;

    for (let i = 0; i < len; i++) {
      if (shiftPatternArray[i] === "dayShift") {
        dayHours[i] += hours;
      } else if (shiftPatternArray[i] === "nightShift") {
        // Следующий день берём по кругу: паттерн повторяется,
        // поэтому остаток ночной смены в конце паттерна уходит в его начало
        const next = (i + 1) % len;
        dayHours[i] += 2;
        nightHours[i] += 2;
        dayHours[next] += 2;
        nightHours[next] += Math.max(0, hours - 6);
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
