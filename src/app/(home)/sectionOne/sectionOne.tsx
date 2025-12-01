"use client";
import styles from "./sectionOne.module.scss";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function SectionOne() {
  const router = useRouter(); // ✅ Используем router.push
  //   const goToCalculation = () => {
  //     router.push("/steps/first"); // ✅ Перенаправление в Next.js
  //   };

  return (
    <div className={styles.container}>
      <div className={styles.flexContainer}>
        <h2>Калькулятор зарплаты для сменного графика</h2>
        <h3>Устали считать зарплату для сменного графика вручную?</h3>
        <p>
          <br></br>Наш онлайн-калькулятор сделает это за вас! «Расчётки» — это
          бесплатный сервис, который помогает рассчитать заработную плату при
          любом скользящем графике работы (суммированном учётё рабочего
          времени). Просто укажите ваш оклад, и система автоматически построит
          график сменности на год и посчитает итоговый доход.
        </p>
        <div className={styles.listOfParameters}>
          Расчёты производятся с учётом:
          <ul>
            <li> Ночных смен (с 22:00 до 06:00)</li>
            <li>Сверхурочных часов и переработок</li> <li>Праздничных дней</li>
            <li>Нормы рабочих часов по производственному календарю</li>
          </ul>
        </div>
        <div className={styles.flexContainerFirst}>
          <Image
            src="/images/dayTypes.png"
            className={styles.dayTypes}
            width={350}
            height={300}
            alt="Picture of the author"
          />
          <div className={styles.dayExplanationDiv}>
            <Image
              src="/images/designationExplanation.png"
              className={styles.dayExplanationImage}
              width={450}
              height={430}
              alt="Picture of the author"
            />
          </div>
        </div>
        {/* <button onClick={goToCalculation} className={styles.startCalcBtn}>
            ПОСТРОИТЬ ГРАФИК И УЗНАТЬ ЗП
          </button> */}
      </div>
    </div>
  );
}
