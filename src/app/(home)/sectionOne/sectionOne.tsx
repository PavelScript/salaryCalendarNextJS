"use client";
import styles from "./sectionOne.module.scss";
import Image from "next/image";
import Info from "@/components/Info/Info";

export default function SectionOne() {
  return (
    <div className={styles.container}>
      <div className={styles.flexContainer}>
        <h2>Калькулятор зарплаты для сменного графика</h2>
        <h3>Устали считать зарплату для сменного графика вручную?</h3>
        <p>
          «Расчётки» — это бесплатный сервис, который помогает рассчитать
          заработную плату при любом скользящем графике работы (суммированном
          учётё рабочего времени). Просто укажите ваш оклад, и система
          автоматически построит график сменности на год и посчитает итоговый
          доход.
        </p>
        <div className={styles.flexImageLi}>
          <div className={styles.dayExplanationDiv}>
            <Image
              src="/images/designationExplanation.png"
              className={styles.dayExplanationImage}
              width={320}
              height={400}
              alt="График сменности и расчёт зарплаты для сменного графика — как работает калькулятор"
            />
          </div>
          <div className={styles.listOfParameters}>
            Расчёты производятся с учётом:
            <ul>
              <li> Ночных смен (с 22:00 до 08:00)</li>
              <li>Сверхурочных часов и переработок</li>{" "}
              <li>Праздничных дней</li>
              <li>Нормы рабочих часов по производственному календарю</li>
            </ul>
          </div>
        </div>
        {/* <div className={styles.flexContainerFirst}>
          <Info />
        </div> */}
      </div>
    </div>
  );
}
