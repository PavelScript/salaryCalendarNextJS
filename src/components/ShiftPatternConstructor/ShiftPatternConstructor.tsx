
import { z } from "zod";
import { useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import styles from "./ShiftPatternConstructor.module.scss";
import type { ShiftType } from "@/types/user.types";
import RedCrossIcon from "../../../public/icons/redCrossIcon";
import { shiftPatternSchema} from "@/schemas/shiftPatternSchema";

type ShiftPatternFormData = z.infer<typeof shiftPatternSchema>;

type Props = {
  onSubmit: (shiftPatternArray: ShiftType[]) => void;
  onBack: () => void;
  initialBlocks?: Array<{ type: ShiftType; days: number }>;
};

const ShiftPatternConstructor = ({ onSubmit, onBack, initialBlocks }: Props) => {
  const {
    control,
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isValid },
  } = useForm<ShiftPatternFormData>({
    resolver: zodResolver(shiftPatternSchema),
    mode: "onChange",
    defaultValues: {
      blocks: initialBlocks 
        ? initialBlocks.map((block, index) => ({
            id: String(index + 1),
            type: block.type as "dayShift" | "nightShift" | "offShift",
            days: String(block.days),
          }))
        : [{ id: "1", type: "dayShift", days: "2" }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "blocks",
  });

  const shiftOptions = [
    { value: "dayShift", label: "дневные" },
    { value: "nightShift", label: "ночные" },
    { value: "offShift", label: "выходные" },
  ];

  const addBlock = () => {
    const newId = String(Date.now());
    append({ id: newId, type: "offShift", days: "1" });
  };

  const removeBlock = (index: number) => {
    if (fields.length > 1) {
      remove(index);
    }
  };

  const handleFormSubmit = (data: ShiftPatternFormData) => {
    
    const shiftPatternArray: ShiftType[] = [];

    for (const block of data.blocks) {
      const days = parseInt(block.days) || 1;
      for (let i = 0; i < days; i++) {
        shiftPatternArray.push(block.type);
      }
    }

    onSubmit(shiftPatternArray);
  };

  const watchedBlocks = watch("blocks");
  const hasWorkDays = watchedBlocks?.some((b) => b.type !== "offShift");

  return (
    <div className={styles.container}>
      <div className={styles.inputField}>
        <h2>Составьте свой график работы</h2>
        
        <form onSubmit={handleSubmit(handleFormSubmit)}>
          <div className={styles.blocksContainer}>
            {fields.map((field, index) => (
              <div key={field.id} className={styles.blockRow}>
                <div className={styles.inputGroup}>
                  <input
                    type="text"
                    inputMode="numeric"
                    placeholder="Дни"
                    className={`${styles.daysInput} ${
                      errors.blocks?.[index]?.days ? styles.inputError : ""
                    }`}
                    {...register(`blocks.${index}.days` as const, {
                      onChange: (e) => {
                        const value = e.target.value;
                        // Автоматическая валидация при вводе
                        if (value === "") {
                          setValue(`blocks.${index}.days`, "", {
                            shouldValidate: true,
                          });
                        } else if (/^\d+$/.test(value)) {
                          setValue(`blocks.${index}.days`, value, {
                            shouldValidate: true,
                          });
                        }
                      },
                    })}
                    onBlur={(e) => {
                      const value = e.target.value;
                      if (value === "" || parseInt(value) < 1) {
                        setValue(`blocks.${index}.days`, "1", {
                          shouldValidate: true,
                        });
                      }
                    }}
                    onFocus={(e) => e.target.select()}
                  />
                </div>

                <div className={styles.inputGroup}>
                  <select
                    className={styles.typeSelect}
                    {...register(`blocks.${index}.type` as const)}
                  >
                    {shiftOptions.map((opt) => (
                      <option key={opt.value} value={opt.value}>
                        {opt.label}
                      </option>
                    ))}
                  </select>
                </div>

                <button
                  type="button"
                  onClick={() => removeBlock(index)}
                  className={styles.removeBtn}
                  disabled={fields.length <= 1}
                  aria-label="Удалить период"
                >
                  <RedCrossIcon size={20} />
                </button>
              </div>
            ))}
          </div>

          {errors.blocks?.root && (
            <div className={styles.formError}>
              {errors.blocks.root.message}
            </div>
          )}

          {!hasWorkDays && fields.length > 0 && (
            <div className={styles.warningMessage}>
              ⚠️ Добавьте хотя бы один рабочий день (дневные или ночные смены)
            </div>
          )}

          <button
            type="button"
            onClick={addBlock}
            className={styles.addButton}
          >
            + Добавить период
          </button>

          <div className={styles.formControls}>
            <button
              type="button"
              onClick={onBack}
              className={styles.backButton}
            >
              Назад
            </button>
            <button
              type="submit"
              className={styles.nextButton}
              disabled={!isValid || !hasWorkDays}
            >
              Далее
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ShiftPatternConstructor;