"use client";

import { useRouter } from "next/navigation";
import QuestionInput from "@/components/Question/QuestionInput/QuestionInput";
import Header from "@/components/Header/Header";
import styles from "../Questions.module.scss";
import { useSalaryStore } from "@/store/useSalaryStore";



const NightHourBonus = () => {

  const { setNightHourBonus, nightHourBonus } = useSalaryStore();
  const router = useRouter();

  const goBack = () => {
    router.push("/steps/fourth");
  };

  const handleSubmit = (data: { salary: string }) => {
    setNightHourBonus(parseInt(data.salary));
    router.push("/steps/fifth");
  };
  

  return (
    <div className={styles.container}>
      <Header />
      <div className={styles.questionForm}>
        <QuestionInput
          title="Введите сколько % доплата за ночные часы"
          label="Процент доплаты"
          inputMode="decimal"
          placeholder="   Например: 40"
          onSubmit={handleSubmit}
          onBack={goBack}
          currentValue = {nightHourBonus?.toString() ?? ""}
        />
      </div>
    </div>
  );
};

export default NightHourBonus;
