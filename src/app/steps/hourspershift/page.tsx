"use client";

import { useRouter } from "next/navigation";
import QuestionInput from "@/components/Question/QuestionInput/QuestionInput";
import Header from "@/components/Header/Header";
import styles from "../Questions.module.scss";
import { useSalaryStore } from "@/store/useSalaryStore";



const HoursPerShift = () => {

  const { hoursPerShift, setHoursPerShift } = useSalaryStore();
  const router = useRouter();

  const goBack = () => {
    router.push("/steps/monthbonus");
  };

  const handleSubmit = (data: { salary: string }) => {
    setHoursPerShift(parseInt(data.salary));
    router.push("/steps/shiftpattern");
  };
  

  return (
    <div className={styles.container}>
      <Header />
      <div className={styles.questionForm}>
        <QuestionInput
          title="Введите количество часов в смене"
          label="Количество часов в смене"
          inputMode="decimal"
          placeholder="   Например: 12"
          onSubmit={handleSubmit}
          onBack={goBack}
          currentValue = {hoursPerShift?.toString() ?? ""}
        />
      </div>
    </div>
  );
};

export default HoursPerShift;
