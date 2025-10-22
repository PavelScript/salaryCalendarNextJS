import React from "react";
import styles from "./chooseStartDay.module.scss";

interface Day {
  yearId: number;
  id: number; // день месяца (1–31)
  year: number;
  month: number; // 0–11 (как в JS Date)
  workShift: "dayShift" | "nightShift" | "offShift";
  weekDay: number; // 0 (воскресенье) – 6 (суббота)
  holiday: boolean;
  extraShift: boolean;
  dayHours: number;
  nightHours: number;
}

interface Props {
  monthIndex: number;
  days: Day[];
  onChange: (dayId: number, monthIndex: number) => void;
  selectedDay: { id: number; month: number } | null;
}

const DAYS_OF_WEEK = ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"];

const ChooseStartDay: React.FC<Props> = ({
  monthIndex,
  days,
  onChange,
  selectedDay,
}) => {
  // Вычисляем день недели первого числа месяца
  const startDayOfWeek = new Date(2025, monthIndex, 1).getDay();
  const emptyCellsBefore = startDayOfWeek === 0 ? 6 : startDayOfWeek - 1;

  return (
    <div className={styles.container}>
      <div className={styles.grid}>
        {/* Заголовок месяца */}
        <div></div>
        <div className={styles.month}>
          {new Date(2025, monthIndex).toLocaleString("ru", { month: "long" })}
        </div>
        <div></div>

        {/* Дни недели */}
        {DAYS_OF_WEEK.map((day, idx) => (
          <div key={idx} className={styles.dayOfWeek}>
            {day}
          </div>
        ))}

        {/* Пустые ячейки перед первым днем */}
        {Array.from({ length: emptyCellsBefore }).map((_, idx) => (
          <div key={`empty-${idx}`} className={styles.emptyCell}></div>
        ))}

        {/* Рендеринг дней */}
        {days.map((day) => {
          // ✅ Используем selectedDay из пропсов
          const isChosen =
            selectedDay?.month === monthIndex && selectedDay.id === day.id;

          let btnClass = styles.btnDefault;
          if (isChosen) btnClass = styles.btnChosen;

          return (
            <button
              key={day.id}
              className={btnClass}
              onClick={() => onChange(day.id, monthIndex)}
            >
              {day.id}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default ChooseStartDay;