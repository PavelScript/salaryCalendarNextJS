"use client";

import { useRouter } from "next/navigation";
import QuestionInput from "@/components/Question/QuestionInput/QuestionInput";
import Header from "@/components/Header/Header";
import styles from "../Questions.module.scss";
import { useSalaryStore } from "@/store/useSalaryStore";
import Link from 'next/link'

const DistrictCoefficient = () => {
  const { setDistrictCoefficient, districtCoefficient } = useSalaryStore();
  const router = useRouter();

  const goBack = () => {
    router.push("/steps/shiftpattern");
  };

  const handleSubmit = (data: { salary: string }) => {
    let value = data.salary.trim();
    if (value.includes(",")) {
      value = value.replace(/,/g, ".");
    }
    setDistrictCoefficient(parseFloat(value));
    router.push("/steps/northcoefficient");
  };

  return (
    <div className={styles.container}>
      <Header />
      <div className={styles.questionForm}>
         <div className={styles.note}><p>Коэффициент не может быть меньше 1<br></br> Узнать свой коэффициент можно здесь:  <Link className={styles.link} href="https://www.consultant.ru/document/cons_doc_LAW_118861/">районные коэффициенты</Link></p></div>
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
          currentValue={districtCoefficient?.toString()}
        />
      </div>
    </div>
  );
};

export default DistrictCoefficient;
