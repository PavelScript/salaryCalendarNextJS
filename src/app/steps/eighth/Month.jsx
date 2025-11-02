"use client";

import React, { useState, useEffect, useMemo } from "react";
import styles from "./Month.module.scss";
import { CountMoney } from "@/lib/salary/countMoney";
import { useShiftStore } from "@/store/useShiftStore";
import { useSalaryStore } from "@/store/useSalaryStore";
import ChooseShiftTypeWindow from "@/components/ChooseShiftTypeWindow/ChooseShiftTypeWindow";
import { createPortal } from "react-dom";

const DAYS_OF_WEEK = ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"];

const Month = ({ monthIndex }) => {
  const { dayByMonth, setWorkShift } = useShiftStore();
  const days = dayByMonth[monthIndex] || [];
  const [shiftWindowPosition, setShiftWindowPosition] = useState(null);

  const {
    salaryPerMonth,
    districtCoefficient,
    northCoefficient,
    bonusPercent,
    nightHourBonus,
  } = useSalaryStore();

  const { moneyPerMonth, monthHoursSum, normalHours } = useMemo(() => {
    return CountMoney(
      dayByMonth,
      salaryPerMonth,
      districtCoefficient,
      northCoefficient,
      bonusPercent,
      nightHourBonus
    );
  }, [
    dayByMonth,
    salaryPerMonth,
    districtCoefficient,
    northCoefficient,
    bonusPercent,
    nightHourBonus,
  ]);

  // Мемоизируйте все вычисления на основе `days`
  const holidays = useMemo(() => 
    days.filter(d => d.holiday).map(d => d.id), 
    [days]
  );

  const dayShifts = useMemo(() => 
    days.filter(d => d.workShift === "dayShift").map(d => d.id), 
    [days]
  );

  const nightShifts = useMemo(() => 
    days.filter(d => d.workShift === "nightShift").map(d => d.id), 
    [days]
  );

  const handleSelectShift = (dayId, shiftType) => {
    setWorkShift(monthIndex, dayId, shiftType);
    setShiftWindowPosition(null);
  };

  const handleClick = (e, dayId) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const popupWidth = 180;
    let x = rect.left;
    if (rect.left + popupWidth > window.innerWidth) {
      x = window.innerWidth - popupWidth;
    }
    x = Math.max(x, 0);

    setShiftWindowPosition({ x, y: rect.bottom, dayId });
  };

  // useEffect(() => {
  //   const handleClickOutside = () => {
  //     if (shiftWindowPosition) {
  //       setShiftWindowPosition(null);
  //     }
  //   };

  //   if (shiftWindowPosition) {
  //     document.addEventListener("mousedown", handleClickOutside);
  //     return () => document.removeEventListener("mousedown", handleClickOutside);
  //   }
  // }, [shiftWindowPosition]);

  const startDayOfWeek = new Date(2025, monthIndex, 1).getDay();
  const emptyCellsBefore = startDayOfWeek === 0 ? 6 : startDayOfWeek - 1;

  return (
    <div className={styles.container}>
      {shiftWindowPosition &&
        typeof document !== "undefined" &&
        createPortal(
          <div
            style={{
              position: "fixed",
              left: `${shiftWindowPosition.x}px`,
              top: `${shiftWindowPosition.y}px`,
              zIndex: 10000,
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <ChooseShiftTypeWindow
              onClose={() => setShiftWindowPosition(null)}
              onSelect={(shiftType) => handleSelectShift(shiftWindowPosition.dayId, shiftType)}
            />
          </div>,
          document.body
        )}

      <div className={styles.grid}>
        <div></div>
        <div className={styles.month}>
          {new Date(2025, monthIndex).toLocaleString("ru", { month: "long" })}
        </div>
        <div></div>

        {DAYS_OF_WEEK.map((day, idx) => (
          <div key={idx} className={styles.dayOfWeek}>
            {day}
          </div>
        ))}

        {Array.from({ length: emptyCellsBefore }).map((_, idx) => (
          <div key={`empty-${idx}`} className={styles.emptyCell}></div>
        ))}

        {days.map((day) => {
          const isHoliday = holidays.includes(day.id);
          const isChosenDay = dayShifts.includes(day.id);      
          const isChosenNight = nightShifts.includes(day.id);  

          let btnClass = styles.btnDefault;
          if (isChosenDay && isHoliday) btnClass = styles.holidayDaysChosen;
          else if (isChosenDay) btnClass = styles.btnChosenDay;
          else if (isChosenNight) btnClass = styles.btnChosenNight;
          else if (isHoliday) btnClass = styles.holidayDays;

          return (
            <button
              key={day.id}
              className={btnClass}
              onClick={(e) => handleClick(e, day.id)}
            >
              {day.id}
            </button>
          );
        })}
      </div>
      <div className={styles.moneyPerMonth}>
        Заработано за месяц: ≈ {moneyPerMonth[monthIndex]?.toFixed(0) || 0} ₽{" "}
        <br />
        Отработано часов: {monthHoursSum[monthIndex] || 0} ч / Норма:{" "}
        {normalHours[monthIndex]}
      </div>
    </div>
  );
};

export default Month;