"use client";

import { useRouter } from "next/navigation";
import QuestionInput from "@/components/Question/QuestionInput/QuestionInput";
import Header from "@/components/Header/Header";
import styles from "../Questions.module.scss";
import { useSalaryStore } from "@/store/useSalaryStore";



const StepTwo = () => {

  const { setSalaryPerMonth, salaryPerMonth } = useSalaryStore();
  const router = useRouter();

  const handleSubmit = (data: { salary: string }) => {
    setSalaryPerMonth(parseInt(data.salary)); // 👈 Извлекаем значение из объекта
    router.push("/steps/third");
  };

  return (
    <div className={styles.container}>
      <Header />
      <div className={styles.questionForm}>
        <QuestionInput
          title="Введите сумму вашего оклада"
          label="Оклад (в рублях)"
          inputMode="decimal"
          placeholder="   Например: 54000"
          onSubmit={handleSubmit}
          currentValue = {salaryPerMonth}
        />
      </div>
    </div>
  );
};

export default StepTwo;
