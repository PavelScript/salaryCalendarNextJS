"use client";

import { useRouter } from "next/navigation";
import QuestionInput from "@/components/Question/QuestionInput/QuestionInput";
import Header from "@/components/Header/Header";
import styles from "../Questions.module.scss";
import { useSalaryStore } from "@/store/useSalaryStore";

const MonthBonus = () => {
  const { setBonusPercent, bonusPercent} = useSalaryStore();
  const router = useRouter();

  const goBack = () => {
    router.push("/steps/wage");
  };

  const handleSubmit = (data: { salary: string }) => {
    setBonusPercent(parseInt(data.salary));
    router.push("/steps/hourspershift");
  };

  return (
    <div className={styles.container}>
      <Header />
      <div className={styles.questionForm}>
        <QuestionInput
          title="Введите сколько % от оклада составляет ежемесячная премия"
          label="Процент премии"
          inputMode="decimal"
          placeholder="   Например: 30"
          onSubmit={handleSubmit}
          onBack={goBack}
          currentValue={bonusPercent?.toString() ?? ""}
        />
      </div>
    </div>
  );
};

export default MonthBonus;
