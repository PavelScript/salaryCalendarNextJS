// app/questions/third/page.tsx

"use client";

import { useRouter } from "next/navigation";
import QuestionSelect from "@/components/Question/QuestionSelect/QuestionSelect";
import styles from "../Questions.module.scss";
import Header from "@/components/Header/Header";
import { useShiftStore } from "@/store/useShiftStore";

const StepThree = () => {
  const router = useRouter();

  const {
    shiftPatternKey,
    setShiftPatternKey,
    setShiftPattern,
    setDayHours,
    setNightHours,
  } = useShiftStore();

  const shiftOptionsKey = [
    { value: "1day1dayOff", label: "1 день / 1 выходной" },
    { value: "2days2daysOff", label: "2 дня / 2 выходных" },
    { value: "2days2nights4daysOff", label: "2 дня / 2 ночи / 4 выходных" },
    { value: "1day1nightDayOff", label: "1 день / 1 ночь / выходной" },
  ];

    const goBack = () => {
    router.push("/steps/second");
  };


  const handleSubmit = ({ shiftPatternKey }: { shiftPatternKey: string }) => {
    setShiftPatternKey(shiftPatternKey);
    switch (shiftPatternKey) {
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
    router.push("/steps/fourth");
  };

  //Получить выбранный график сменности от пользователя из QuestionSelect

  return (
    <div className={styles.container}>
      <Header />
      <div className={styles.questionForm}>
        <QuestionSelect
          title="Выберите свой график работы"
          label="График работы"
          options={shiftOptionsKey}
          onSubmit={handleSubmit}
          defaultValue={shiftPatternKey}
          onBack={goBack}
        />
      </div>
    </div>
  );
};

export default StepThree;
