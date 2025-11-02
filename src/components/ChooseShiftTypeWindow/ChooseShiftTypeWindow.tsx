import styles from "./ChooseShiftTypeWindow.module.scss";

interface Props {
  dayId: number | string;
  onClose: () => void;
  // Опционально: если нужно уведомлять о выборе смены
  onSelect: (shiftType: "dayShift" | "nightShift" | "none") => void;
}

const ChooseShiftTypeWindow = ({onClose, onSelect }: Props) => {
  const handleSelect = (shiftType: "dayShift" | "nightShift" | "none") => {
    onSelect(shiftType); // ← ДОЛЖНО ВЫЗВАТЬСЯ!
    onClose(); // закрываем после выбора
  };

  return (
    <div
      className={styles.ChooseShiftTypeWindow}
      onClick={(e) => e.stopPropagation()}
    >
      <button
        className={styles.dayShift}
        onClick={() => handleSelect("dayShift")}
      >
        Дневная
      </button>
      <button
        className={styles.nightShift}
        onClick={() => handleSelect("nightShift")}
      >
        Ночная
      </button>
      <button
        className={styles.deleteShift}
        onClick={() => handleSelect("none")}
      >
        Удалить смену
      </button>
      <button className={styles.back} onClick={onClose}>
        Отмена
      </button>
    </div>
  );
};

export default ChooseShiftTypeWindow;
