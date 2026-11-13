"use client";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import styles from "./QuestionInput.module.scss";
import { salarySchemaCoeffitients } from "@/schemas/salarySchemaNumbers";


type SalaryFormData = z.infer<typeof salarySchemaCoeffitients>;


type QuestionFormProps = {
  title: React.ReactNode;
  label: string;
  inputMode: "decimal" | "numeric" | "tel" | "text";
  placeholder: string;
  currentValue: string;
  onSubmit: (data: SalaryFormData) => void;
  onBack: () => void;
};
const QuestionInputCoefficients = ({
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
    resolver: zodResolver(salarySchemaCoeffitients),
    mode: "onChange",
    defaultValues: {
      value: String(currentValue),
    },
  });

  const onSubmitHandler = (data: SalaryFormData) => {
    onSubmit(data);
  };

  return (
    <div className={styles.container}>
      <div className={styles.inputField}>
        <h2>{title}</h2>
        <form onSubmit={handleSubmit(onSubmitHandler)}>
          <label>{label}</label>
          <input
            {...register("value")}
            type="tel"
            inputMode={inputMode}
            placeholder={placeholder}
            className={errors.value ? styles.inputError : ""}
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
        {errors.value && (
          <p className={styles.errorMessage}>{errors.value.message}</p>
        )}
      </div>
    </div>
  );
};

export default QuestionInputCoefficients;
