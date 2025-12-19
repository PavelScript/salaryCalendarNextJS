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

const ShiftsReady = () => {
  const router = useRouter();

  const goBack = () => {
    router.push("/steps/choosestartdaypage");
  };
  const currentMonthRef = useRef<HTMLDivElement>(null);
  const currentMonth = new Date().getMonth();

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

  const daysByMonth2025: Day[][] = Array.from({ length: 12 }, () => []);
  const daysByMonth2026: Day[][] = Array.from({ length: 12 }, () => []);

  for (const day of DAYS) {
    if (day.year === 2025) {
      // Только дни выбранного года
      daysByMonth2025[day.month].push(day);
    }
  }

  for (const day of DAYS) {
    if (day.year === 2026) {
      // Только дни выбранного года
      daysByMonth2026[day.month].push(day);
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
      {/* <div className={styles.adUpper}>
        <YandexAd blockId="R-A-17629664-4" />
      </div> */}
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
          {/* <div className={styles.ad}>
            <YandexAd blockId="R-A-17629664-3" />
          </div> */}
          <div className={styles.infoDesktop}>
            <Info />
          </div>
        </div>

        <p>Ваш график смен на 2025-2026</p>
        <p className={styles.currentYear}>2025</p>
        <div className={styles.calendarYear}>
          {daysByMonth2025.map((_, monthIndex) => (
            <div
              key={monthIndex}
              ref={monthIndex === currentMonth ? currentMonthRef : null}
            >
              <Month
                key={monthIndex}
                monthIndex={monthIndex}
                year={2025}
                showAd={monthIndex === 13}
              />
            </div>
          ))}
        </div>
        <p className={styles.currentYear}>2026</p>
        <div className={styles.calendarYear}>
          {daysByMonth2026.map((_, monthIndex) => (
            <div key={monthIndex}>
              <Month
                key={monthIndex}
                monthIndex={monthIndex}
                year={2026}
                showAd={monthIndex === 1}
              />
            </div>
          ))}
        </div>
      </div>
      {/* <YandexAd blockId="R-A-17629664-1" /> */}
    </div>
  );
};

export default ShiftsReady;
