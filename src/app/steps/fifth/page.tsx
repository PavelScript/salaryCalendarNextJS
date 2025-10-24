"use client";

import { useRouter } from "next/navigation";
import QuestionInput from "@/components/Question/QuestionInput/QuestionInput";
import Header from "@/components/Header/Header";
import styles from "../Questions.module.scss";
import { useSalaryStore } from "@/store/useSalaryStore";

const StepFive = () => {
  const { setNorthCoefficient, northCoefficient } = useSalaryStore();
  const router = useRouter();

    const goBack = () => {
    router.push("/steps/fourth");
  };

  const handleSubmit = (data: { salary: string }) => {
    setNorthCoefficient(parseFloat(data.salary));
    router.push("/steps/sixth");
  };

  return (
    <div className={styles.container}>
      <Header />
      <div className={styles.questionForm}>
        <QuestionInput
          title={
            <>
              Введите размер{" "}
              <span
                style={{
                  fontWeight: "bold",
                  fontStyle: "italic",
                  color: "rgba(239, 131, 0, 1)",
                }}
              >
                северного
              </span>{" "}
              коэффициента
            </>
          }
          label="В формате: 1.15 или 1"
          inputMode="decimal"
          placeholder="   Например: 1.15 или 1"
          onSubmit={handleSubmit}
          onBack={goBack}
          currentValue={northCoefficient}
        />
      </div>
    </div>
  );
};

export default StepFive;
