import styles from "../Questions.module.scss";

const First = () => {
  return (
    <div className={styles.container}>
      <div className={styles.inputField}>


        <h1>Добро пожаловать в наш калькулятор ЗП <br></br> и графиков сменности</h1>

        <p>
          В несколько простых шагов мы отобразим график на год и примерный доход
          за каждый месяц.
        </p>
        <p>
          Все введенные данные не передаются третьим лицам. Хранятся у вас на
          устройстве.
        </p>

        <button>Приступим</button>
      </div>
    </div>
  );
};

export default First;
