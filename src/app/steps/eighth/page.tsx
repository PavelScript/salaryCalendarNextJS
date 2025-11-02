"use client";

import styles from "./page.module.scss";
import { useShiftStore } from "@/store/useShiftStore";
import Header from "@/components/Header/Header";

import Month from "./Month";

const ShiftsReady = () => {
  const { dayByMonth } = useShiftStore();

  return (
    <div className={styles.container}>
      <Header />
      <div className={styles.fieldContainer}>
        <p>Ваш график смен на год</p>
        <div className={styles.calendarYear}>
          {dayByMonth.map((_, monthIndex) => (
            <Month key={monthIndex} monthIndex={monthIndex} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ShiftsReady;
