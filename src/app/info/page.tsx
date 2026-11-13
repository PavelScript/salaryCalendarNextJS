"use client"; // ← Обязательно на первой строке!
import styles from "./page.module.scss";
import { useRouter } from "next/navigation";
import Header from "@/components/Header/Header";
import Info from "@/components/Info/Info";

export default function Home() {
  const router = useRouter(); // ✅ Используем router.push
  const goToCalculation = () => {
    router.back(); // ✅ Перенаправление в Next.js
  };

  return (
    <div className={styles.container}>
      <Header />
      <Info />

      <button onClick={goToCalculation} className={styles.startCalcBtn}>
        Назад
      </button>
    </div>
  );
}
