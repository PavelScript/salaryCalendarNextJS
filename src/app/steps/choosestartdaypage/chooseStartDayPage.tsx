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
import Image from "next/image";

const ChooseStartDayPage = () => {
  const currentMonth = new Date().getMonth();
  const router = useRouter();

  const goBack = () => {
    router.push("/steps/northcoefficient");
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
    router.push("/steps/shiftsready");
  };

  return (
    <div className={styles.container}>
      <Header />
      <div className={styles.fieldContainer}>
        <button onClick={goBack} className={styles.goBack}>
          Назад
        </button>
        <h2>Выберите день с которого начать строить график смен</h2>
        <Image
          src="/images/SelectDay.gif"
          className={styles.selectDayGif}
          unoptimized={true}
          width={277}
          height={244}
          alt="howToSelectFirstDay"
        />
        <p>С этого дня применится выбранный вами паттерн работы</p>
        <div className={styles.gridContainer}>
          {daysByMonth.slice(11).map((monthDays, monthIndex) => (
            <ChooseStartDay
              key={`month-${monthIndex}`}
              monthIndex={currentMonth}
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

export default ChooseStartDayPage;
