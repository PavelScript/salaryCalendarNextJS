"use client";

import styles from "./page.module.scss";
import { useState, useEffect, useRef } from "react";
import { useShiftStore } from "@/store/useShiftStore";
import Header from "@/components/Header/Header";
import type { Day } from "@/types/user.types";
import Info from "@/components/Info/Info";

import Month from "./Month";

const ShiftsReady = () => {
  const currentMonthRef = useRef<HTMLDivElement>(null);
  const currentMonth = new Date().getMonth();
  const [year, setYear] = useState(2025);

  // Functions for altering year
  const setYear2025 = () => setYear(2025);
  const setYear2026 = () => setYear(2026);

  useEffect(() => {
    if (currentMonthRef.current) {
      setTimeout(() => {
        if (currentMonthRef.current) {
          currentMonthRef.current.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
        }
      }, 150);
    }
  }, []);

  const [showInfo, setShowInfo] = useState(false);
  const [text, setText] = useState("Показать справку по цветовым обозначениям");
  const { DAYS } = useShiftStore();

  const daysByMonth: Day[][] = Array.from({ length: 12 }, () => []);

  for (const day of DAYS) {
    if (day.year === year) {
      // Только дни выбранного года
      daysByMonth[day.month].push(day);
    }
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

        <p>Ваш график смен на год </p>
        <div className={styles.yearSelection}>
          <button
            onClick={setYear2025}
            className={year === 2025 ? styles.yearSelectionActive : ""}
          >
            2025
          </button>
          <button
            onClick={setYear2026}
            className={year === 2026 ? styles.yearSelectionActive : ""}
          >
            2026
          </button>
        </div>
        <div className={styles.calendarYear}>
          {daysByMonth.map((_, monthIndex) => (
            <div
              key={monthIndex}
              ref={monthIndex === currentMonth ? currentMonthRef : null}
            >
              <Month key={monthIndex} monthIndex={monthIndex} year={year} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ShiftsReady;
