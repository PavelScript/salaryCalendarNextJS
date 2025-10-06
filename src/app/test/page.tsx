 "use client"

import { useSalaryStore } from "@/store/useSalaryStore";

import { useShiftStore } from "@/store/useShiftStore";

import styles from "@/app/test/page.module.scss"

const Values = () => {
  const { salaryPerMonth, districtCoefficient, northCoefficient } =
    useSalaryStore();
  const {
    startDayPattern,
    startDayChosen,
    shiftPatternKey,
    shiftPattern,
    dayHours,
    nightHours,
    dayByMonth,
  } = useShiftStore();
  console.log(dayHours)

  return (
    <div className={styles.container}>
      <p>salary</p> = {salaryPerMonth}
      <p>districtCoefficient</p> = {districtCoefficient}
      <p>northCoefficient</p> = {northCoefficient}
      <p>startDayPattern</p> = {startDayPattern}
      <p>startDayChosen</p> = {startDayChosen}
      <p>shiftPatternKey</p> = {shiftPatternKey}
      <p>shiftPattern</p> = {shiftPattern}
      <p>dayHours</p> = {dayHours}
      <p>nightHours</p> = {nightHours}
      {/* <p>dayByMonth</p> = dayByMonth.map  */}
      

    </div>
  );
};

export default Values;
