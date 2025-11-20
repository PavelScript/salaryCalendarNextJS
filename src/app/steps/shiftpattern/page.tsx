// app/questions/third/page.tsx

"use client";

import { useRouter } from "next/navigation";
import QuestionSelect from "@/components/Question/QuestionSelect/QuestionSelect";
import styles from "../Questions.module.scss";
import Header from "@/components/Header/Header";
import { useShiftStore } from "@/store/useShiftStore";
import { useSalaryStore } from "@/store/useSalaryStore";

const ShiftPattern = () => {
  const router = useRouter();

  const {
    shiftPatternKey,
    setShiftPatternKey,
    setShiftPattern,
    setDayHours,
    setNightHours,
  } = useShiftStore();

  const { hoursPerShift } = useSalaryStore();

  let hoursPerShiftNumber: number;
  
  if (hoursPerShift) {
    hoursPerShiftNumber = hoursPerShift;
  }

  const shiftOptionsKey = [
    { value: "1day1dayOff", label: "1 день / 1 выходной" },
    { value: "2days2daysOff", label: "2 дня / 2 выходных" },
    { value: "1day1nightDayOff", label: "1 день / 1 ночь / выходной" },
    { value: "2days2nights4daysOff", label: "2 дня / 2 ночи / 4 выходных" },
    {
      value: "2daysDayOff2nights3DaysOff",
      label: "2 дня / 1 выходной / 2 ночи / 3 выходных",
    },
  ];

  const goBack = () => {
    router.push("/steps/monthbonus");
  };

  const handleSubmit = ({ shiftPatternKey }: { shiftPatternKey: string }) => {
    setShiftPatternKey(shiftPatternKey);
    switch (shiftPatternKey) {
      case "1day1dayOff":
        setShiftPattern(["dayShift", "nightShift", "offShift"]);
        setDayHours([hoursPerShiftNumber, 2, 2]);
        setNightHours([0, 2, hoursPerShiftNumber-6]);
        router.push("/steps/districtcoefficient");
        break;
      case "2days2daysOff":
        setShiftPattern(["dayShift", "dayShift", "offShift", "offShift"]);
        setDayHours([hoursPerShiftNumber, hoursPerShiftNumber, 0, 0]);
        setNightHours([0, 0, 0, 0]);
        router.push("/steps/districtcoefficient");
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
        setDayHours([hoursPerShiftNumber, hoursPerShiftNumber, 2, 4, 2, 0, 0, 0]);
        setNightHours([0, 0, 2, hoursPerShiftNumber-4, hoursPerShiftNumber-6, 0, 0, 0]);
        router.push("/steps/nightBonus");
        break;
      case "2daysDayOff2nights3DaysOff":
        setShiftPattern([
          "dayShift",
          "dayShift",
          "offShift",
          "nightShift",
          "nightShift",
          "offShift",
          "offShift",
          "offShift",
        ]);
        setDayHours([hoursPerShiftNumber, hoursPerShiftNumber, 0, 2, 4, 2, 0, 0]);
        setNightHours([0, 0, 0, 2, hoursPerShiftNumber-4, hoursPerShiftNumber-6, 0, 0]);
        router.push("/steps/nightBonus");
        break;

      case "1day1nightDayOff":
        setShiftPattern(["dayShift", "nightShift", "offShift"]);
        setDayHours([hoursPerShiftNumber, 2, 2]);
        setNightHours([0, 2, hoursPerShiftNumber-6]);
        router.push("/steps/nightBonus");
        break;
      default:
        setShiftPattern([]);
    }
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

export default ShiftPattern;
