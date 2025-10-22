"use client";

import styles from "./page.module.scss";
import { useShiftStore } from "@/store/useShiftStore";
import Header from "@/components/Header/Header";

import Month from "./Month";

const ShiftsReady = () => {
  //   const navigate = useNavigate();

  const { dayByMonth } = useShiftStore();

  //Переход к следующему вопросу
  //   const toNextQuestion = () => {
  //     navigate("/questions/step-8");
  //   };

  //   //Переход к предыдущему вопросу
  //   const toPreviousQuestion = () => {
  //     navigate("/questions/step-6");
  //   };

  return (
    <div className={styles.container}>
      <Header />
      
      <div className={styles.fieldContainer}>
        <p>Ваш график смен на год</p>
        {dayByMonth.map((monthDays, monthIndex) => (
          <Month
            key={`choose-start-${monthIndex}`}
            monthIndex={monthIndex}
            days={monthDays}
          />
        ))}
      </div>
      <div className={styles.buttonContainer}>
        {/* <button onClick={toPreviousQuestion}>Назад</button>
        <button disabled={isDisabled} onClick={toNextQuestion}>
          Далее
        </button> */}
      </div>
    </div>
  );
};

export default ShiftsReady;
