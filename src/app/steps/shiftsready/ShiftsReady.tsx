"use client";

import styles from "./page.module.scss";
import { useState, useEffect, useRef } from "react";
import Header from "@/components/Header/Header";
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
  const currentYear = new Date().getFullYear();
  const [selectedYear, setSelectedYear] = useState(2026);
  const monthToScroll = selectedYear === currentYear ? currentMonth : 0;

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
  }, [selectedYear]);

  const [showInfo, setShowInfo] = useState(false);
  const [text, setText] = useState("Показать справку по цветовым обозначениям");

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
      {/* Ad for mobile devices */}
      <div className={styles.adUpper}>
        <YandexAd blockId="R-A-17925515-2" />
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
            Назад к выбору первой смены
          </button>
          {/*Ad for pc devices*/}
          <div className={styles.ad}>
            <YandexAd blockId="R-A-17925515-3" />
          </div>
          <div className={styles.infoDesktop}>
            <Info />
          </div>
        </div>

        <p>Выберите год календаря</p>
        <div className={styles.yearSelection} role="group" aria-label="Выбор года">
          {[2026, 2027].map((year) => (
            <button
              key={year}
              type="button"
              className={selectedYear === year ? styles.yearSelectionActive : ""}
              aria-pressed={selectedYear === year}
              onClick={() => setSelectedYear(year)}
            >
              {year}
            </button>
          ))}
        </div>
        <p className={styles.currentYear}>График смен на {selectedYear} год</p>
        <div className={styles.calendarYear}>
          {Array.from({ length: 12 }, (_, monthIndex) => (
            <div
              key={`${selectedYear}-${monthIndex}`}
              ref={monthIndex === monthToScroll ? currentMonthRef : null}
            >
              <Month
                monthIndex={monthIndex}
                year={selectedYear}
                showAd={selectedYear === 2026 && monthIndex === 1}
              />
            </div>
          ))}
        </div>
      </div>
      <YandexAd blockId="R-A-17925515-1" />
    </div>
  );
};

export default ShiftsReady;
