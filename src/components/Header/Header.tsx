import styles from "./Header.module.scss";
import Link from "next/link";

const Header = () => {
  return (
    <div className={styles.header}>
      <Link href="/" className={styles.home}>
        Главная
      </Link>
      {/* <Link href="/" className={styles.help}>
        Помощь
      </Link> */}
    </div>
  );
};

export default Header;
