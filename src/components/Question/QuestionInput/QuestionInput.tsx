"use client";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import styles from "./QuestionInput.module.scss";
import { salarySchemaNumbers } from "@/schemas/salarySchemaNumbers";

type SalaryFormData = z.infer<typeof salarySchemaNumbers>;

type QuestionFormProps = {
  title: React.ReactNode;
  label: string;
  inputMode: "decimal" | "numeric" | "tel" | "text";
  placeholder: string;
  currentValue: number;
  onSubmit: (data: SalaryFormData) => void;
  onBack: () => void; // 👈 Теперь передаём объект, а не строку
};
const QuestionInput = ({
  title,
  label,
  inputMode,
  placeholder,
  currentValue,
  onSubmit,
  onBack,
}: QuestionFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SalaryFormData>({
    resolver: zodResolver(salarySchemaNumbers),
    mode: "onChange",
    defaultValues: {
      salary: String(currentValue), // 👈 Предзаполнение!
    },
  });

  const onSubmitHandler = (data: SalaryFormData) => {
    // Отправляем полный объект (можно расширить позже)
    onSubmit(data);
  };

  return (
    <div className={styles.container}>
      <div className={styles.inputField}>
        <h2>{title}</h2>
        <form onSubmit={handleSubmit(onSubmitHandler)}>
          <label>{label}</label>
          <input
            {...register("salary")} // 👈 Регистрация поля по имени из схемы
            type="tel"
            inputMode={inputMode}
            placeholder={placeholder}
            className={errors.salary ? styles.inputError : ""}
          />
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
        {" "}
        {errors.salary && (
          <p className={styles.errorMessage}>{errors.salary.message}</p>
        )}
      </div>
    </div>
  );
};

export default QuestionInput;
