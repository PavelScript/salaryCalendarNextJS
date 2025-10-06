"use client"; // ← Обязательно на первой строке!
import styles from "./page.module.scss";
import { useRouter } from "next/navigation";
import Header from "@/components/Header/Header";

export default function Home() {
  const router = useRouter(); // ✅ Используем router.push
  const goToCalculation = () => {
    router.push("/steps/first"); // ✅ Перенаправление в Next.js
  };

  return (
    <div className={styles.container}>
      <Header />
      <p className={styles.text}>
        Построй график <br></br>рассчитай зарплату <br></br> <span>на год вперед</span>
      </p>


      <button onClick={goToCalculation} className={styles.startCalcBtn}>
            ПОСТРОИТЬ ГРАФИК И УЗНАТЬ ЗП
          </button>
    </div>
  );
}
