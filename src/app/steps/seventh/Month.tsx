"use client";

import React, { useState, useEffect, useMemo } from "react";
import styles from "./Month.module.scss";
import { CountMoney } from "@/lib/salary/countMoney";
import { useShiftStore } from "@/store/useShiftStore";
import { useSalaryStore } from "@/store/useSalaryStore";

const DAYS_OF_WEEK = ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"];

const Month = ({ monthIndex, days }) => {
  const { dayByMonth } = useShiftStore();
  const { salaryPerMonth, districtCoefficient, northCoefficient } = useSalaryStore();

  // Защита от пустых данных
  if (!days || days.length === 0) {
    return <div className={styles.container}>Загрузка...</div>;
  }

  // Расчёт зарплаты с мемоизацией
  const moneyPerMonth = useMemo(() => {
    return CountMoney(
      dayByMonth,
      salaryPerMonth,
      districtCoefficient,
      northCoefficient
    );
  }, [dayByMonth, salaryPerMonth, districtCoefficient, northCoefficient]);

  // Извлечение смен и праздников
  const holidays = days.filter((day) => day.holiday).map((day) => day.id);
const dayShifts = useMemo(() => {
  return days
    .filter((day) => day.workShift === "dayShift")
    .map((day) => day.id);
}, [days]);

const nightShifts = useMemo(() => {
  return days
    .filter((day) => day.workShift === "nightShift")
    .map((day) => day.id);
}, [days]);

  // Состояние выбранных дней
  const [daysChosen, setDaysChosen] = useState([]);
  const [nightsChosen, setNightsChosen] = useState([]);

  // Обновление состояния при изменении смен
  useEffect(() => {
    setDaysChosen(dayShifts);
  }, [dayShifts]);

  useEffect(() => {
    setNightsChosen(nightShifts);
  }, [nightShifts]);

  // Обработчики выбора
  const choseDay = (id) => {
    setDaysChosen((prev) =>
      prev.includes(id)
        ? prev.filter((dayId) => dayId !== id)
        : [...prev, id]
    );
  };

  const choseNight = (id) => {
    setNightsChosen((prev) =>
      prev.includes(id)
        ? prev.filter((dayId) => dayId !== id)
        : [...prev, id]
    );
  };

  // Календарь
  const startDayOfWeek = new Date(2025, monthIndex, 1).getDay();
  const emptyCellsBefore = startDayOfWeek === 0 ? 6 : startDayOfWeek - 1;



  return (
    <div className={styles.container}>
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
          const isChosenDay = daysChosen.includes(day.id);
          const isChosenNight = nightsChosen.includes(day.id);

          let btnClass = styles.btnDefault;
          if (isChosenDay && isHoliday) btnClass = styles.holidayDaysChosen;
          else if (isChosenDay) btnClass = styles.btnChosenDay;
          else if (isChosenNight) btnClass = styles.btnChosenNight;
          else if (isHoliday) btnClass = styles.holidayDays;

          // Определяем, какую функцию вызывать
          const handleClick = () => {
            if (day.workShift === "dayShift") {
              choseDay(day.id);
            } else if (day.workShift === "nightShift") {
              choseNight(day.id);
            }
          };

          return (
            <button
              key={day.id}
              className={btnClass}
              onClick={handleClick}
            >
              {day.id}
            </button>
          );
        })}
      </div>
      <div className={styles.moneyPerMonth}>
        Заработано за месяц: {moneyPerMonth[monthIndex]?.toFixed(2) || 0} ₽
      </div>
    </div>
  );
};

export default Month;