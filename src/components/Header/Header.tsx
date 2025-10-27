import styles from "./Header.module.scss";
import Link from "next/link";
import { useShiftStore } from "@/store/useShiftStore";

const Header = () => {
  const { dayByMonth } = useShiftStore();

  // Проверяем, что dayByMonth — массив и содержит хотя бы один месяц с данными
  const hasSchedule = Array.isArray(dayByMonth) && dayByMonth.length > 0;

  return (
    <div className={styles.header}>
      <Link href="/" className={styles.home}>
        Главная
      </Link>
      {hasSchedule && (
        <Link href="/steps/eighth" className={styles.shiftReady}>
          Готовый график смен
        </Link>
      )}
    </div>
  );
};

export default Header;