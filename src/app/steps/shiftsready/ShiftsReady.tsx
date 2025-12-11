"use client";

import styles from "./page.module.scss";
import { useState, useEffect, useRef } from "react";
import { useShiftStore } from "@/store/useShiftStore";
import Header from "@/components/Header/Header";
import type { Day } from "@/types/user.types";
import Info from "@/components/Info/Info";
import YandexAd from "@/components/YandexAd/yandexAd";
import { useRouter } from "next/navigation";
import Month from "./Month";
import { useSalaryStore } from "@/store/useSalaryStore";

const ShiftsReady = () => {
  const router = useRouter();
  const { bonusPercent, salaryPerMonth, hoursPerShift } = useSalaryStore();

  useEffect(() => {
    const timer = setTimeout(() => {
      const isDataLoaded =
        bonusPercent !== undefined &&
        salaryPerMonth !== undefined &&
        hoursPerShift !== undefined;

      if (!isDataLoaded) {
        console.warn("Данные не загрузились вовремя");
        return;
      }

      const isValidData =
        bonusPercent != null &&
        bonusPercent >= 0 &&
        salaryPerMonth != null &&
        salaryPerMonth > 0 &&
        hoursPerShift != null &&
        hoursPerShift > 0;

      if (!isValidData) {
        console.log("Некорректные данные, редирект...");
        router.push("/");
      }
    }, 800); 

    return () => clearTimeout(timer);
  }, [bonusPercent, salaryPerMonth, hoursPerShift, router]);

  const goBack = () => {
    router.push("/steps/choosestartdaypage");
  };
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
      <div className={styles.adUpper}>
        <YandexAd blockId="R-A-17629664-4" />
      </div>
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
        <div className={styles.adPlusBackButton}>
          <button onClick={goBack} className={styles.goBack}>
            Назад
          </button>
          <div className={styles.ad}>
            <YandexAd blockId="R-A-17629664-3" />
          </div>
          <div className={styles.infoDesktop}>
            <Info />
          </div>
        </div>

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
              <Month
                key={monthIndex}
                monthIndex={monthIndex}
                year={year}
                showAd={monthIndex === 13}
              />
            </div>
          ))}
        </div>
        <div className={styles.yearSelectionSecond}>
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
      </div>
      <YandexAd blockId="R-A-17629664-1" />
    </div>
  );
};

export default ShiftsReady;
