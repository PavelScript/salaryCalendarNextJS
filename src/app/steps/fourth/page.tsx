"use client";

import { useRouter } from "next/navigation";
import QuestionInput from "@/components/Question/QuestionInput/QuestionInput";
import Header from "@/components/Header/Header";
import styles from "../Questions.module.scss";
import { useSalaryStore } from "@/store/useSalaryStore";



const StepFour = () => {

  const { setDistrictCoefficient, districtCoefficient } = useSalaryStore();
  const router = useRouter();

  const handleSubmit = (data: { salary: string }) => {
    setDistrictCoefficient(parseFloat(data.salary));
    router.push("/steps/fifth");
  };

  return (
    <div className={styles.container}>
      <Header />
      <div className={styles.questionForm}>
        <QuestionInput
          title="Введите размер районного коэффициента"
          label="В формате: 1.15 или 1"
          inputMode="decimal"
          placeholder="   Например: 1.15 или 1"
          onSubmit={handleSubmit}
          currentValue = {districtCoefficient}
        />
      </div>
    </div>
  );
};

export default StepFour;
