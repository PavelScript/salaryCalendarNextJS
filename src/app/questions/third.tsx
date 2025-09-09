import styles from "./Questions.module.scss";
import { useNavigate } from "react-router-dom";
import { useShiftStore } from "../../store/useShiftStore";
import { useEffect, useState } from "react";

const StepThree = () => {
  const navigate = useNavigate();
  // Получаем все необходимые значения и методы из хранилища
  const { 
    shiftPattern,
    setShiftPattern,
    setDayHours,
    setNightHours,
  } = useShiftStore();
  
  // Определяем текущий выбранный вариант на основе shiftPattern
  const [selectedValue, setSelectedValue] = useState("");

  // При монтировании компонента определяем выбранный ранее вариант
  useEffect(() => {
    if (shiftPattern.length === 0) {
      setSelectedValue("");
      return;
    }

    // Определяем patternKey на основе текущего shiftPattern
    let patternKey = "";
    if (shiftPattern.includes("nightShift")) {
      if (shiftPattern.length === 3) {
        patternKey = "1day1nightDayOff";
      } else if (shiftPattern.length === 8) {
        patternKey = "2days2nights4daysOff";
      }
    } else {
      if (shiftPattern.length === 3) {
        patternKey = "1day1dayOff";
      } else if (shiftPattern.length === 4) {
        patternKey = "2days2daysOff";
      }
    }

    setSelectedValue(patternKey);
  }, [shiftPattern]);

  const toNextQuestion = () => {
    navigate("/questions/step-4");
  };

  const toPreviousQuestion = () => {
    navigate("/questions/step-2");
  };

  const [isDisabled, setIsDisabled] = useState(true);

  useEffect(() => {
    setIsDisabled(!selectedValue);
  }, [selectedValue]);

  const handleAnswer = (value: string) => {
    setSelectedValue(value);
    switch (value) {
      case "1day1dayOff":
        setShiftPattern(["dayShift", "nightShift", "offShift"]);
        setDayHours([12, 2, 2]);
        setNightHours([0, 2, 6]);
        break;
      case "2days2daysOff":
        setShiftPattern(["dayShift", "dayShift", "offShift", "offShift"]);
        setDayHours([12, 12, 0, 0]);
        setNightHours([0, 0, 0, 0]);
        break;
      case "2days2nights4daysOff":
        setShiftPattern([
          "dayShift",
          "dayShift",
          "nightShift",
          "nightShift",
          "offShift",
          "offShift",
          "offShift",
          "offShift",
        ]);
        setDayHours([12, 12, 2, 4, 2, 0, 0, 0]);
        setNightHours([0, 0, 2, 6, 6, 0, 0, 0]);
        break;
      case "1day1nightDayOff":
        setShiftPattern(["dayShift", "nightShift", "offShift"]);
        setDayHours([12, 2, 2]);
        setNightHours([0, 2, 6]);
        break;
      default:
        setShiftPattern([]);
    }
  };

  return (
    <div className={styles.inputField}>
      <div className={styles.question}>
        <p>Какой у вас график сменности?</p>

        <select
          className={styles.select}
          value={selectedValue}
          onChange={(e) => handleAnswer(e.target.value)}
          required
        >
          <option value="" disabled hidden>
            Выберите вариант
          </option>
          <option value="1day1dayOff">1 день/ 1 выходной</option>
          <option value="2days2daysOff">2 дня / 2 выходных</option>
          <option value="2days2nights4daysOff">
            2 дня/ 2 ночи / 4 выходных
          </option>
          <option value="1day1nightDayOff">1 день / 1 ночь / выходной</option>
        </select>


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

export default StepThree;