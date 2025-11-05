"use client";

import styles from "./page.module.scss";
import { useShiftStore } from "@/store/useShiftStore";
import Header from "@/components/Header/Header";
import type { Day } from "@/types/user.types";

import Month from "./Month";

const ShiftsReady = () => {
  const { DAYS } = useShiftStore();

  const daysByMonth: Day[][] = Array.from({ length: 12 }, () => []);

  for (const day of DAYS) {
    daysByMonth[day.month].push(day);
  }

  return (
    <div className={styles.container}>
      <Header />
      <div className={styles.fieldContainer}>
        <p>Ваш график смен на год</p>
        <div className={styles.calendarYear}>
          {daysByMonth.map((_, monthIndex) => (
            <Month key={monthIndex} monthIndex={monthIndex} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ShiftsReady;
