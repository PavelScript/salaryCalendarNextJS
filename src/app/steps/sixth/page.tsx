//Pick the first Day Page
"use client";

import styles from "./page.module.scss";
import { useRouter } from "next/navigation";
import { useShiftStore } from "@/store/useShiftStore";
import { useMemo, useEffect, useState } from "react";
import { generateShiftPattern } from "@/lib/salary/generateYearArrayByMonths";
import ChooseStartDay from "./chooseStartDay";
import Header from "@/components/Header/Header";


const Sixth = () => {
  const router = useRouter();
  const {
    startDayPattern,
    setStartDayPattern,
    shiftPattern,
    setDayByMonth,
    dayHours,
    nightHours,
  } = useShiftStore();

  const [selectedDay, setSelectedDay] = useState<{ id: number; month: number } | null>(null);

  // dayByMonth готовый календарь со сменами на год по месяцам
  const dayByMonth = useMemo(
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
    setDayByMonth(dayByMonth);
  }, [dayByMonth, setDayByMonth]);

  const handleDaySelect = (dayId:number, monthIndex:number) => {
    const foundDay = dayByMonth[monthIndex]?.find((day) => day.id === dayId);

    if (!foundDay) {
    return;
  }
    setSelectedDay({ id: dayId, month: monthIndex });
    setStartDayPattern(foundDay.yearId); // Обновляем startDayPattern
    router.push("/steps/seventh");
  };

  console.log(dayByMonth)


  return (
    <div className={styles.container}>
      <Header />
      <div className={styles.fieldContainer}>
        <p>Выберите день с которого начать строить график смен</p>
        <div className={styles.gridContainer}>
          {dayByMonth.map((monthDays, monthIndex) => (
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

export default Sixth;
