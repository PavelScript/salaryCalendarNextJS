"use client";
import styles from "./SelectRegion.module.scss";
import { useForm } from "react-hook-form";
import { inputOptions } from "./RegionalCoefficients";

const SelectRegion = () => {
  type FormValues = {
    region: string;
  };
  const { register, handleSubmit } = useForm<FormValues>();

  const onSubmit = (data: FormValues) => console.log(data.region);

  return (
    <div className={styles.container}>
      <div className={styles.inputField}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <input
            {...register("region", { required: true })}
            placeholder="Введите регион"
            list="region-suggestions"
          ></input>
          <datalist id="region-suggestions">
            {inputOptions.map((region) => (
              <option key={region} value={region} />
            ))}
          </datalist>
          <input
            {...register("region", { required: true })}
            placeholder="Введите регион"
            list="region-suggestions"
          ></input>
          <datalist id="region-suggestions">
            {inputOptions.map((region) => (
              <option key={region} value={region} />
            ))}
          </datalist>
          <button type="submit">Далее</button>
        </form>
      </div>
    </div>
  );
};

export default SelectRegion;
