'use client' // ← Обязательно на первой строке!
import styles from "./page.module.scss";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter(); // ✅ Используем router.push
  const goToCalculation = () => {
    router.push("/questions/first"); // ✅ Перенаправление в Next.js
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h3>ShiftSalary</h3>
      </div>
      <section className={styles.firstSection}>
        <div className={styles.flexContainer}>
          <Image
            src="/images/logo.png"
            alt="ShiftSalary"
            width={200}
            height={100}
          />
          <button onClick={goToCalculation} className={styles.startCalcBtn}>
            ПОСТРОИТЬ ГРАФИК И УЗНАТЬ ЗП
          </button>
        </div>
      </section>
      <section className={styles.secondSection}>
        <div className={styles.flexContainer}>
          <div className={styles.leftSide}>
            <h3>График работы всегда под рукой</h3>
            <p>Планируй жизнь наперёд</p>
          </div>
          <div className={styles.rightSide}>
            <Image
              src="/images/shiftCalendar.png"
              alt="ShiftSalaryIcon"
              width={900}
              height={200}
            />
          </div>
        </div>
      </section>
      <section className={styles.thirdSection}>
        <div className={styles.flexContainer}>
          <div className={styles.leftSide}>
            <Image
              src="/images/oneMonth.png"
              alt="ShiftSalaryIcon"
              width={200}
              height={200}
            />
          </div>
          <div className={styles.rightSide}>
            <h3>График работы всегда под рукой</h3>
            <p>Планируй жизнь наперёд</p>
          </div>
        </div>
      </section>
    </div>
  );
}
