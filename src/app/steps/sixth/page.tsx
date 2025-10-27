"use client";

import { useRouter } from "next/navigation";
import QuestionInput from "@/components/Question/QuestionInput/QuestionInput";
import Header from "@/components/Header/Header";
import styles from "../Questions.module.scss";
import { useSalaryStore } from "@/store/useSalaryStore";

const StepSix = () => {
  const { setNorthCoefficient, northCoefficient } = useSalaryStore();
  const router = useRouter();

  const goBack = () => {
    router.push("/steps/fifth");
  };

  const handleSubmit = (data: { salary: string }) => {
    let value = data.salary.trim();
    if (value.includes(",")) {
      value = value.replace(/,/g, ".");
    }
    setNorthCoefficient(parseFloat(value));
    router.push("/steps/seventh");
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
          currentValue={northCoefficient?.toString()}
        />
      </div>
    </div>
  );
};

export default StepSix;
