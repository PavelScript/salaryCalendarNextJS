import styles from "./Header.module.scss";
import Link from "next/link";
import { useShiftStore } from "@/store/useShiftStore";

const Header = () => {
  const { DAYS } = useShiftStore();
  const hasSchedule = Array.isArray(DAYS) && DAYS.length > 0;

  const handleHomeClick = () => {
    // Гарантируем, что при переходе на главную — пользователь останется там
    sessionStorage.setItem("stayOnHomePage", "true");
  };

  return (
    <div className={styles.header}>
      <Link href="/" onClick={handleHomeClick} className={styles.home}>
        Главная
      </Link>
      {hasSchedule && (
        <Link href="/steps/shiftsready" className={styles.shiftReady}>
          Готовый график смен
        </Link>
      )}
    </div>
  );
};

export default Header;