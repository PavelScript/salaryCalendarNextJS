import styles from "./Info.module.scss";

const Info = () => {


  return (
  <div className={styles.container}>
    <p>Обозначения цветов</p>
    <div className={styles.dayShift}>Дневная смена</div>
    <div className={styles.nightShift}>Ночная смена</div>
    <div className={styles.holidayDaysChosen}>Дневная праздничная смена</div>
    <div className={styles.holidayNightChosen}>Ночная праздничная смена</div>
    <div className={styles.holidayOffShift}>Праздничный день</div>
    <div className={styles.offShift}>Выходной день</div>
  </div>);
};

export default Info;
