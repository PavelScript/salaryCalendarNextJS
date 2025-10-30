"use client";

import styles from "./page.module.scss";
import { useShiftStore } from "@/store/useShiftStore";
import Header from "@/components/Header/Header";

import Month from "./Month";

const ShiftsReady = () => {
  //   const navigate = useNavigate();

  const { dayByMonth } = useShiftStore();


  return (
    <div className={styles.container}>
      <Header />
      <div className={styles.fieldContainer}>
        <p>Ваш график смен на год</p>
        <div className={styles.calendarYear}>
          {dayByMonth.map((monthDays, monthIndex) => (
            <Month
              key={`choose-start-${monthIndex}`}
              monthIndex={monthIndex}
              days={monthDays}
            />
          ))}
        </div>
      </div>
      <div className={styles.buttonContainer}>

      </div>
    </div>
  );
};

export default ShiftsReady;
