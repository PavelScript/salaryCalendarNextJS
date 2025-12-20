"use client";

import { useRouter } from "next/navigation";
import SelectRegion from "@/components/SelectRegion/SelectRegion";
import Header from "@/components/Header/Header";
import styles from "../Questions.module.scss";
import { useSalaryStore } from "@/store/useSalaryStore";
import Link from "next/link";

const DistrictCoefficient = () => {
  const { setDistrictCoefficient, districtCoefficient } = useSalaryStore();
  const router = useRouter();

  const goBack = () => {
    router.push("/steps/shiftpatternconstructor");
  };

  const handleSubmit = (data: { salary: string }) => {
    let value = data.salary.trim();
    if (value.includes(",")) {
      value = value.replace(/,/g, ".");
    }
    setDistrictCoefficient(parseFloat(value));
    router.push("/steps/northcoefficient");
  };

  return (
    <div className={styles.container}>
      <Header />
      <div className={styles.questionForm}>
        <SelectRegion />
      </div>
    </div>
  );
};

export default DistrictCoefficient;
