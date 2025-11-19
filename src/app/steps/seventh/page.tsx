//Pick the first Day Page
"use client";

import styles from "./page.module.scss";
import { useRouter } from "next/navigation";
import { useShiftStore } from "@/store/useShiftStore";
import { useMemo, useEffect, useState } from "react";
import { generateShiftPattern } from "@/lib/salary/generateYearArrayByMonths";
import ChooseStartDay from "./chooseStartDay";
import Header from "@/components/Header/Header";
import type { Day } from "@/types/user.types";

const StepSeven = () => {
  const router = useRouter();

  const goBack = () => {
    router.push("/steps/sixth");
  };
  const {
    startDayPattern,
    setStartDayPattern,
    shiftPattern,
    setDAYS,
    dayHours,
    nightHours,
  } = useShiftStore();

  const [selectedDay, setSelectedDay] = useState<{
    id: number;
    month: number;
  } | null>(null);

  // dayByMonth готовый календарь со сменами на год по месяцам
  const DAYS = useMemo(
    () =>
      generateShiftPattern(
        2025,
        startDayPattern,
        shiftPattern,
        dayHours,
        nightHours
      ),
    [startDayPattern, shiftPattern, dayHours, nightHours]
  );

  useEffect(() => {
    setDAYS(DAYS);
  }, [DAYS, setDAYS]);

  const daysByMonth: Day[][] = Array.from({ length: 12 }, () => []);

  for (const day of DAYS) {
    if (day.year === 2025) {
      daysByMonth[day.month].push(day);
    }
  }

  const handleDaySelect = (dayId: number, monthIndex: number) => {
    const foundDay = daysByMonth[monthIndex]?.find((day) => day.id === dayId);

    if (!foundDay) {
      return;
    }
    setSelectedDay({ id: dayId, month: monthIndex });
    setStartDayPattern(foundDay.yearId); // Обновляем startDayPattern
    router.push("/steps/eighth");
  };

  return (
    <div className={styles.container}>
      <Header />
      <div className={styles.fieldContainer}>
        <button onClick={goBack} className={styles.goBack}>
          Назад
        </button>
        <p>Выберите день с которого начать строить график смен</p>
        <div className={styles.gridContainer}>
          {daysByMonth.map((monthDays, monthIndex) => (
            <ChooseStartDay
              key={`month-${monthIndex}`} // ← УБРАЛИ startDayPattern
              monthIndex={monthIndex}
              days={monthDays}
              onChange={handleDaySelect}
              selectedDay={selectedDay}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default StepSeven;
