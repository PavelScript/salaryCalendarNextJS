import styles from "./Info.module.scss";

const Info = () => {
  return (
    <div className={styles.container}>
      <p>Обозначения цветов</p>
      <div className={styles.dayTypeRow}>
        <div className={styles.dayShift}></div>
        <span>Дневная смена</span>
      </div>
      <div className={styles.dayTypeRow}>
        <div className={styles.nightShift}></div>
        <span>Ночная смена</span>
      </div>
      <div className={styles.dayTypeRow}>
        <div className={styles.holidayDaysChosen}></div>
        <span>Дневная праздничная смена</span>
      </div>
      <div className={styles.dayTypeRow}>
        <div className={styles.holidayNightChosen}></div>
        <span>Ночная праздничная смена</span>
      </div>
      <div className={styles.dayTypeRow}>
        <div className={styles.holidayOffShift}></div>
        <span>Праздничный день</span>
      </div>
      <div className={styles.dayTypeRow}>
        <div className={styles.offShift}></div>
        <span>Выходной день</span>
      </div>
    </div>
  );
};

export default Info;
