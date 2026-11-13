"use client";
import styles from "./page.module.scss";
import { useRouter } from "next/navigation";
import Header from "@/components/Header/Header";
import Image from "next/image";
import { useShiftStore } from "@/store/useShiftStore";
import { useEffect, useState } from "react";

export default function Home() {
  const router = useRouter();
  const { DAYS } = useShiftStore();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const hasSchedule = Array.isArray(DAYS) && DAYS.length > 0;
    const stayOnHomePage = sessionStorage.getItem("stayOnHomePage") === "true";

    if (hasSchedule && !stayOnHomePage) {
      router.push("/steps/shiftsready");
    } else {
      setReady(true);
    }
  }, [DAYS, router]);

  const goToCalculation = () => {
    sessionStorage.removeItem("stayOnHomePage");
    router.push("/steps/first");
  };

  if (!ready) return null;

  return (
    <div className={styles.container}>
      <Header />
      <div className={styles.flexContainer}>
        <div className={styles.textPlusButton}>
          <Image
            src="/images/raschetkiMainPage.png"
            className={styles.calcImageMini}
            width={330}
            height={240}
            alt="Календарь смен и расчёт зарплаты в сервисе Расчётки — интерфейс калькулятора для сменного графика"
          />
          <h1 className={styles.text}>
            Календарь смен и калькулятор зарплаты <br />
            <span>для сменного графика</span>
          </h1>
          <button onClick={goToCalculation} className={styles.startCalcBtn}>
            ПОСТРОИТЬ ГРАФИК И УЗНАТЬ ЗП
          </button>
        </div>
        <Image
          src="/images/raschetkiMainPage.png"
          className={styles.calcImage}
          width={1100}
          height={800}
          alt="Picture of the author"
        />
      </div>
      <div className={styles.waveSection}>
        <svg
          width="100vw"
          height="15vh"
          className={styles.waveSVG}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1000 140"
        >
          <path
            fill="#282828"
            fillOpacity="1"
            d="M0,224L480,64L960,96L1440,0L1440,320L960,320L480,320L0,320Z"
          ></path>
        </svg>
      </div>
    </div>
  );
}
