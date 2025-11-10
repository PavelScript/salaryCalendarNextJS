"use client";

import React, { useState, useMemo} from "react";
import styles from "./Month.module.scss";
import { CountMoney } from "@/lib/salary/countMoney";
import { useShiftStore } from "@/store/useShiftStore";
import { useSalaryStore } from "@/store/useSalaryStore";
import ChooseShiftTypeWindow from "@/components/ChooseShiftTypeWindow/ChooseShiftTypeWindow";
import { createPortal } from "react-dom";

const DAYS_OF_WEEK = ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"];

const Month = ({ monthIndex, year }) => {
  const { DAYS, setWorkShift } = useShiftStore();

  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth();
  const currentDay = currentDate.getDate();

  const daysByMonth = useMemo(() => {
    const result = Array.from({ length: 12 }, () => []);
    for (const day of DAYS) {
      if (day.month >= 0 && day.month < 12 && day.year === year) {
        result[day.month].push(day);
      }
    }
    return result;
  }, [DAYS]);

  const isCurrentDay = (dayId, month) => {
    return (
      currentYear === year && currentMonth === month && currentDay === dayId
    );
  };

  const days = daysByMonth[monthIndex] || [];
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
      daysByMonth,
      salaryPerMonth,
      districtCoefficient,
      northCoefficient,
      bonusPercent,
      nightHourBonus
    );
  }, [
    daysByMonth,
    salaryPerMonth,
    districtCoefficient,
    northCoefficient,
    bonusPercent,
    nightHourBonus,
  ]);

  // Мемоизируйте все вычисления на основе `days`
  const holidays = useMemo(
    () => days.filter((d) => d.holiday).map((d) => d.id),
    [days]
  );

  const dayShifts = useMemo(
    () => days.filter((d) => d.workShift === "dayShift").map((d) => d.id),
    [days]
  );

  const nightShifts = useMemo(
    () => days.filter((d) => d.workShift === "nightShift").map((d) => d.id),
    [days]
  );

  const handleSelectShift = (dayId, shiftType) => {
    setWorkShift(monthIndex, dayId, shiftType);
    setShiftWindowPosition(null);
  };

  const handleClick = (e, dayId) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const popupWidth = 180;
    const popupHeight = 200; // исправил опечатку: height, а не heigth

    // Позиция по X
    let x = rect.left;
    if (rect.left + popupWidth > window.innerWidth) {
      x = window.innerWidth - popupWidth; // прижать к правому краю
    }
    x = Math.max(x, 0); // не уходить за левый край

    // Позиция по Y
    let y = rect.bottom; // по умолчанию — под кнопкой

    // Если не помещается снизу — показываем ВЫШЕ кнопки
    if (rect.bottom + popupHeight > window.innerHeight) {
      y = rect.top - popupHeight; // окно над кнопкой
    }

    // Защита: не уходить за верхний край экрана
    y = Math.max(y, 0);

    setShiftWindowPosition({ x, y, dayId });
  };

  const startDayOfWeek = new Date(year, monthIndex, 1).getDay();
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
              onSelect={(shiftType) =>
                handleSelectShift(shiftWindowPosition.dayId, shiftType)
              }
            />
          </div>,
          document.body
        )}

      <div className={styles.grid}>
        <div></div>
        <div className={styles.month}>
          {new Date(year, monthIndex).toLocaleString("ru", { month: "long" })}
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
          const isToday = isCurrentDay(day.id, monthIndex);

          let btnClass = styles.btnDefault;
          if (isChosenDay && isHoliday) btnClass = styles.holidayDaysChosen;
          else if (isChosenNight && isHoliday)
            btnClass = styles.holidayNightChosen;
          else if (isChosenDay) btnClass = styles.btnChosenDay;
          else if (isChosenNight) btnClass = styles.btnChosenNight;
          else if (isHoliday) btnClass = styles.holidayDays;

          if (isToday) {
            btnClass = `${btnClass} ${styles.currentDay}`;
          }

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
