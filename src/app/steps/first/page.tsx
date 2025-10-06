'use client'
import styles from "../Questions.module.scss";
import { useRouter } from "next/navigation";
import Header from "@/components/Header/Header"




const First = () => {
  const router = useRouter(); // ✅ Используем router.push
  const nextQuestion = () => {
    router.push("/steps/second"); // ✅ Перенаправление в Next.js
  };
  return (
    <div className={styles.container}>
      <Header/>
      <div className={styles.inputField}>


        <h1>В несколько простых шагов мы отобразим график на год и примерный доход
          за каждый месяц.</h1>

        <p>
          Все введенные данные не передаются третьим лицам. Хранятся у вас на
          устройстве.
        </p>

        <button onClick={nextQuestion}>Приступим</button>
      </div>
    </div>
  );
};

export default First;
