"use client";

import styles from "./page.module.scss";
import { useState } from "react";
import { useShiftStore } from "@/store/useShiftStore";
import Header from "@/components/Header/Header";
import type { Day } from "@/types/user.types";
import Info from "@/components/Info/Info";

import Month from "./Month";

const ShiftsReady = () => {
  const [showInfo, setShowInfo] = useState(false);
  const [text, setText] = useState("Показать справку по цветовым обозначениям");
  const { DAYS } = useShiftStore();

  const daysByMonth: Day[][] = Array.from({ length: 12 }, () => []);

  for (const day of DAYS) {
    daysByMonth[day.month].push(day);
  }

  const showInfoFunc = () => {
    if (showInfo) {
      setShowInfo(false);
      setText("Показать справку по цветовым обозначениям");
    } else {
      setShowInfo(true);
      setText("Скрыть справку по цветовым обозначениям");
    }
  };

  return (
    <div className={styles.container}>
      <Header />
      <div className={styles.fieldContainer}>
        {showInfo && <Info />}
        <button
          className={
            showInfo ? styles.showInfoButtonGray : styles.showInfoButtonDefault
          }
          onClick={showInfoFunc}
        >
          {text}
        </button>

        <p>Ваш график смен на 2025 год </p>
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
