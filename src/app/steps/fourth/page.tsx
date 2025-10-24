"use client";

import { useRouter } from "next/navigation";
import QuestionInput from "@/components/Question/QuestionInput/QuestionInput";
import Header from "@/components/Header/Header";
import styles from "../Questions.module.scss";
import { useSalaryStore } from "@/store/useSalaryStore";

const StepFour = () => {
  const { setDistrictCoefficient, districtCoefficient } = useSalaryStore();
  const router = useRouter();

  const goBack = () => {
    router.push("/steps/third");
  };

  const handleSubmit = (data: { salary: string }) => {
    setDistrictCoefficient(parseFloat(data.salary));
    router.push("/steps/fifth");
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
                районного
              </span>{" "}
              коэффициента
            </>
          }
          label="В формате: 1.15 или 1"
          inputMode="decimal"
          placeholder="   Например: 1.15 или 1"
          onSubmit={handleSubmit}
          onBack={goBack}
          currentValue={districtCoefficient}
        />
      </div>
    </div>
  );
};

export default StepFour;
