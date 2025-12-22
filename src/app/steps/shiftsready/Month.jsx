"use client";

import React, { useState, useMemo } from "react";
import styles from "./Month.module.scss";
import { CountMoney } from "@/lib/salary/countMoney";
import { useShiftStore } from "@/store/useShiftStore";
import { useSalaryStore } from "@/store/useSalaryStore";
import ChooseShiftTypeWindow from "@/components/ChooseShiftTypeWindow/ChooseShiftTypeWindow";
import { createPortal } from "react-dom";
import YandexAd from "@/components/YandexAd/yandexAd";


const DAYS_OF_WEEK = ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"];

// Норматив по часам для каждого месяца
const normalHours2025 = [
  136, 160, 167, 175, 144, 151, 184, 168, 176, 184, 151, 176,
];

const normalHours2026 = [
  120, 152, 168, 175, 151, 167, 184, 168, 176, 176, 159, 176,
];

const Month = ({ monthIndex, year, showAd = false }) => {
  const { DAYS, setWorkShift } = useShiftStore();
  const { hoursPerShift } = useSalaryStore();
  // Выбираем нормативы часов в зависимости от года
  const normalHoursCurrent = useMemo(() => {
    return year === 2025 ? normalHours2025 : normalHours2026;
  }, [year]);

  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth();
  const currentDay = currentDate.getDate();

  // Собираем дни для ВСЕХ месяцев текущего года
  const daysByMonthCurrentYear = useMemo(() => {
    const result = Array.from({ length: 12 }, () => []);
    for (const day of DAYS) {
      if (day.month >= 0 && day.month < 12 && day.year === year) {
        result[day.month].push(day);
      }
    }
    return result;
  }, [DAYS, year]);

  // Собираем дни для декабря предыдущего года для расчета премии января
  const decemberPreviousYearDays = useMemo(() => {
    const result = [];
    for (const day of DAYS) {
      if (day.month === 11 && day.year === year - 1) {
        // Декабрь предыдущего года
        result.push(day);
      }
    }
    return result;
  }, [DAYS, year]);

  // Объединяем данные для расчета зарплаты
  const daysForCalculation = useMemo(() => {
    if (monthIndex === 0 && year > 2025) {
      // Для января 2026 и далее
      // Добавляем декабрь предыдущего года в начало
      return [decemberPreviousYearDays, ...daysByMonthCurrentYear];
    }
    return daysByMonthCurrentYear;
  }, [daysByMonthCurrentYear, decemberPreviousYearDays, monthIndex, year]);

  // Аналогично для нормативов часов
  const normalHoursForCalculation = useMemo(() => {
    if (monthIndex === 0 && year > 2025) {
      const prevYearHours = year === 2026 ? normalHours2025 : normalHours2026;
      return [prevYearHours[11], ...normalHoursCurrent]; // Декабрь предыдущего года + текущий год
    }
    return normalHoursCurrent;
  }, [normalHoursCurrent, monthIndex, year]);

  const isCurrentDay = (dayId, month) => {
    return (
      currentYear === year && currentMonth === month && currentDay === dayId
    );
  };

  const days = daysByMonthCurrentYear[monthIndex] || [];
  const [shiftWindowPosition, setShiftWindowPosition] = useState(null);

  const {
    salaryPerMonth,
    districtCoefficient,
    northCoefficient,
    bonusPercent,
    nightHourBonus,
  } = useSalaryStore();

  const {
    moneyPerMonth,
    monthHoursSum,
    moneyPerMonth1,
    moneyPerMonth2,
    normalHours,
  } = useMemo(() => {
    return CountMoney({
      dayByMonth: daysForCalculation,
      salaryPerMonthInput: salaryPerMonth,
      districtCoefficient,
      northCoefficient,
      bonusPercent,
      nightHourBonus,
      normalHours: normalHoursForCalculation,
    });
  }, [
    daysForCalculation,
    salaryPerMonth,
    districtCoefficient,
    northCoefficient,
    bonusPercent,
    nightHourBonus,
    normalHoursForCalculation,
  ]);

  // Для отображения используем данные начиная с текущего месяца
  const displayMonthIndex =
    monthIndex === 0 && year > 2025 ? monthIndex + 1 : monthIndex;

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

  const handleSelectShift = (dayId, shiftType, year) => {
    setWorkShift(monthIndex, dayId, shiftType, year, hoursPerShift);
    setShiftWindowPosition(null);
  };

  const handleClick = (e, dayId) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const popupWidth = 180;
    const popupHeight = 200;

    let x = rect.left;
    if (rect.left + popupWidth > window.innerWidth) {
      x = window.innerWidth - popupWidth;
    }
    x = Math.max(x, 0);

    let y = rect.bottom;
    if (rect.bottom + popupHeight > window.innerHeight) {
      y = rect.top - popupHeight;
    }
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
                handleSelectShift(shiftWindowPosition.dayId, shiftType, year)
              }
            />
          </div>,
          document.body
        )}
      {showAd && (
        <div className={styles.yandexAdDiv}>
          <YandexAd blockId="R-A-17925515-4" />
        </div>
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
        <table>
          <tbody>
            <tr>
              <td>
                Заработано за месяц
              </td>
              <td>{moneyPerMonth[displayMonthIndex]?.toFixed(0) || 0} ₽</td>
            </tr>
            <tr>
              <td>
                За первую половину
              </td>
              <td>{moneyPerMonth1[displayMonthIndex]?.toFixed(0) || 0} ₽</td>
            </tr>
            <tr>
              <td>
                За вторую половину
              </td>
              <td>{moneyPerMonth2[displayMonthIndex]?.toFixed(0) || 0} ₽</td>
            </tr>
            <tr>
              <td>
                Отработано часов/Норма
              </td>
              <td>
                {monthHoursSum[displayMonthIndex] || 0}/
                {normalHours[displayMonthIndex] || 0} ч
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Month;
