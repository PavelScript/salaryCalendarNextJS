"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import styles from "./QuestionSelect.module.scss";
import { shiftSelectSchema } from "@/schemas/shiftSelectOptions";
import type { ShiftSelectData } from "@/schemas/shiftSelectOptions";

type QuestionFormProps = {
  title: string;
  label: string;
  options: { value: string; label: string }[];
  onSubmit: (data: ShiftSelectData) => void;
   onBack: () => void;
  defaultValue?: string;
};

const QuestionSelect = ({
  title,
  label,
  options,
  onSubmit,
  onBack,
  defaultValue,
}: QuestionFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ShiftSelectData>({
    resolver: zodResolver(shiftSelectSchema),
    mode: "onChange",
    defaultValues: {
      shiftPatternKey: defaultValue,
    },
  });

  const onSubmitHandler = (data: ShiftSelectData) => {
    onSubmit(data);
  };

  return (
    <div className={styles.container}>
      <div className={styles.inputField}>
        <h2>{title}</h2>
        <form onSubmit={handleSubmit(onSubmitHandler)}>
          <label>{label}</label>
          <select
            {...register("shiftPatternKey")}
            className={styles.select}
            required
          >
            <option value="" disabled hidden>
              Выберите график
            </option>
            {options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>

          <div className={styles.buttons}>
            <button
              type="button"
              onClick={onBack}
              className={styles.backButton}
            >
              Назад
            </button>
            <button type="submit">Далее</button>
          </div>
        </form>
      </div>
      <div className={styles.errorMessageContainer}>
        {errors.shiftPatternKey && (
          <p className={styles.errorMessage}>
            {errors.shiftPatternKey.message}
          </p>
        )}
      </div>
    </div>
  );
};

export default QuestionSelect;
