//Pick the first Day Page 
"use client";

import styles from "./page.module.scss";
import { useRouter } from "next/navigation";
import { useShiftStore } from "@/store/useShiftStore";
import { useMemo, useEffect } from "react";
import {generateShiftPattern} from "@/lib/salary/generateYearArrayByMonths"



const Sixth = () => {
  const navigate = useRouter();
  const {
    startDayPattern,
    setStartDayPattern,
    shiftPattern,
    setDayByMonth,
    dayHours,
    nightHours,
  } = useShiftStore();

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

  const handleDaySelect = (dayId, monthIndex) => {

    const foundDay = dayByMonth[monthIndex]?.find((day) => day.id === dayId);


      setStartDayPattern(foundDay.yearId); // Обновляем startDayPattern


  };



  return (
    <div className={styles.container}>
      <p>Выберите день с которого начать строить график смен</p>
      <div className={styles.gridContainer}>
        {dayByMonth.map((monthDays, monthIndex) => (
          <ChooseStartDay
            key={`month-${monthIndex}-${startDayPattern}`}
            monthIndex={monthIndex}
            days={monthDays}
            onChange={handleDaySelect}
          />
        ))}
      </div>
    </div>
  );
};

export default Sixth;
