import styles from "./Questions.module.scss";
import { useNavigate } from 'react-router-dom';
import { useSalaryStore } from "../../store/useShiftStore";
import { useState, useEffect } from "react";

const StepTwo = () => {

     const navigate = useNavigate();
  const {
    setSalaryPerMonth,
    salaryPerMonth
  } = useSalaryStore();


  //Переход к следующему вопросу
  const toNextQuestion = () => {
    navigate("/questions/step-3");
  };

 //Переход к предыдущему вопросу
  const toPreviousQuestion = () => {
    navigate("/questions");
  };

  //Проверка правильности ввода пользователем
  const [isDisabled, setIsDisabled] = useState(true);

const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
  if (e.key === 'Enter' && !isDisabled) {
    toNextQuestion();
  }
};

  useEffect(() => {
    setIsDisabled(salaryPerMonth === undefined 
    || salaryPerMonth === 0 
    || Number.isNaN(salaryPerMonth));
  }, [salaryPerMonth]);

  return (
      <div className={styles.inputField}>


          <div className={styles.question}>
            <p>
             Введите сумму вашего оклада
            </p>
            
            <input
              type="number"
              placeholder="Например, 50000"
              onKeyDown={handleKeyDown}
              onChange={(e)=> setSalaryPerMonth(parseInt(e.target.value))}
              value={salaryPerMonth}
              
              ></input>


            <div className={styles.buttonContainer}>
            <button
              onClick={toPreviousQuestion}
            >
              Назад
            </button>
            <button disabled={isDisabled}
              onClick={toNextQuestion}
            >
              Далее
            </button>
            </div>
          </div>
      </div>
  );
};

export default StepTwo;
