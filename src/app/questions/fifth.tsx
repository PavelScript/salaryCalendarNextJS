import styles from "./Questions.module.scss";
import { useNavigate } from "react-router-dom";
import { useSalaryStore } from "../../store/useShiftStore";
import { useState, useEffect } from "react";

const StepFive = () => {
  const navigate = useNavigate();

  const { setNorthCoefficient, northCoefficient } = useSalaryStore();

  // Состояние ввода
  const [inputValue, setInputValue] = useState("");
  const [useDefaultCoefficient, setUseDefaultCoefficient] = useState(false);

  // Блокировка кнопки "Далее"
  const [isDisabled, setIsDisabled] = useState(true);

  // Валидация при каждом изменении inputValue
  useEffect(() => {
    if (useDefaultCoefficient) {
      // Если чекбокс активен → значение по умолчанию = 1
      setNorthCoefficient(1);
      setIsDisabled(false);
    } else {
      const numValue = parseFloat(inputValue.replace(/,/g, "."));
      setIsDisabled(
        inputValue === "" ||
          isNaN(numValue) ||
          numValue < 1
      );
    }
  }, [inputValue, useDefaultCoefficient, setNorthCoefficient]);

  //Переход к следующему вопросу
  const toNextQuestion = () => {
    navigate("/questions/step-6");
  };

  //Переход к предыдущему вопросу
  const toPreviousQuestion = () => {
    navigate("/questions/step-4");
  };

  // Обработчик изменения ввода
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    // Заменяем запятые на точки
    const formattedValue = value.replace(/,/g, ".");

    setInputValue(formattedValue);

    // Парсим значение и сохраняем в store, если оно корректное
    const numValue = parseFloat(formattedValue);
    if (!isNaN(numValue) && numValue > 0) {
      setNorthCoefficient(numValue);
    }
  };

    // Обработчик клика по чекбоксу
  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const isChecked = e.target.checked;
    setUseDefaultCoefficient(isChecked);

    if (isChecked) {
      // Устанавливаем значение по умолчанию
      setNorthCoefficient(1);
      setInputValue("1");
    } else {
      // Очищаем поле, если чекбокс снят
      setInputValue("");
    }
  };

  return (
    <div className={styles.inputField}>
      <div className={styles.question}>
        <p>Введите размер северной надбавки</p>
        <input
          type="number"
          placeholder="Например, 1,15"
          value={northCoefficient}
          onChange={handleInputChange}
          step="0.01"
          min="1.0"
        ></input>

        <div className={styles.checkboxContainer}>
          <p>У меня нет северного коэффициента</p>
          <input
            type="checkbox"
            className={styles.checkbox}
            checked={useDefaultCoefficient}
            onChange={handleCheckboxChange}
          />
        </div>
        <div className={styles.buttonContainer}>
          <button onClick={toPreviousQuestion}>Назад</button>
          <button disabled={isDisabled} onClick={toNextQuestion}>
            Далее
          </button>
        </div>
      </div>
    </div>
  );
};

export default StepFive;
