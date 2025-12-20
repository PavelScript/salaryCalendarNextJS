"use client";
import styles from "./SelectRegion.module.scss";
import { useForm } from "react-hook-form";
import RegionalCoefficients from "./RegionalCoefficients";

const SelectRegion = () => {
  const { register, handlesubmit } = useForm();

  const inputOptions: string[] = [];
  for (const region in RegionalCoefficients) {
    inputOptions.push(region);
  }
  console.log(inputOptions);
  const onSubmit = (data: any) => {
    console.log(data);
  };

  return (
    <div className={styles.container}>
      <div className={styles.inputField}>
        <input
          {...register("Region")}
          placeholder="Введите регион"
          list="region-suggestions"
        ></input>
        <datalist id="region-suggestions">
          {inputOptions.map((region1) => (
            <option key={region1} value={region1} />
          ))}
        </datalist>
      </div>
    </div>
  );
};

export default SelectRegion;
