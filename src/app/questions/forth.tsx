import styles from "./Questions.module.scss";
import { useNavigate } from "react-router-dom";
import { useSalaryStore } from "../../store/useShiftStore";
import { useEffect, useState } from "react";

const StepFour = () => {
  const navigate = useNavigate();
  const { setDistrictCoefficient, districtCoefficient } = useSalaryStore();

  // Локальное состояние для ввода
  const [inputValue, setInputValue] = useState("");
  const [useDefaultCoefficient, setUseDefaultCoefficient] = useState(false);

  // Блокировка кнопки "Далее"
  const [isDisabled, setIsDisabled] = useState(true);

  // Синхронизация начального значения из стора
  useEffect(() => {
    if (districtCoefficient === 1) {
      // Проверяем, установлено ли значение по умолчанию
      setUseDefaultCoefficient(true);
      setInputValue("1");
    } else {
      setUseDefaultCoefficient(false);
      setInputValue(districtCoefficient.toString());
    }
  }, [districtCoefficient]);

  // Валидация при изменении
  useEffect(() => {
    if (useDefaultCoefficient) {
      setIsDisabled(false);
    } else {
      const numValue = parseFloat(inputValue.replace(/,/g, "."));
      setIsDisabled(inputValue === "" || isNaN(numValue) || numValue < 1);
    }
  }, [inputValue, useDefaultCoefficient]);

  const toNextQuestion = () => navigate("/questions/step-5");
  const toPreviousQuestion = () => navigate("/questions/step-3");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    // Заменяем запятые на точки, но храним ввод с запятыми для UX
    const formattedValue = value.replace(/,/g, ".");
    setInputValue(value); // Сохраняем оригинальный ввод (с запятыми)

    const numValue = parseFloat(formattedValue);
    if (!isNaN(numValue) && numValue >= 1) {
      setDistrictCoefficient(numValue);
      setUseDefaultCoefficient(false); // Если пользователь вводит своё значение
    }
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const isChecked = e.target.checked;
    setUseDefaultCoefficient(isChecked);

    if (isChecked) {
      setDistrictCoefficient(1);
      setInputValue("1");
    } else {
      setInputValue("");
    }
  };

  return (
    <div className={styles.inputField}>
      <div className={styles.question}>
        <p>Введите районный коэффициент</p>
        <input
          type="text"
          inputMode="decimal"
          placeholder="Например, 1,15"
          value={inputValue}
          onChange={handleInputChange}
        />
        <div className={styles.checkboxContainer}>
          <p>У меня нет районного коэффициента</p>
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

export default StepFour;