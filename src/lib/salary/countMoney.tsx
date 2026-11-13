import type { Day } from "@/types/user.types";

interface Props {
  dayByMonth: Day[][];
  salaryPerMonthInput: number | null;
  districtCoefficient: number;
  northCoefficient: number;
  bonusPercent: number | null;
  nightHourBonus: number | null;
  normalHours: number[];
}

export const CountMoney = ({
  dayByMonth,
  salaryPerMonthInput,
  districtCoefficient,
  northCoefficient,
  bonusPercent,
  nightHourBonus,
  normalHours,
}: Props) => {
  const moneyPerMonth1: number[] = [];
  const moneyPerMonth2: number[] = [];
  const monthHoursSum: number[] = [];
  const grossPerMonth: number[] = [];

  const salary = Math.max(0, Number(salaryPerMonthInput) || 0);
  const district = Number(districtCoefficient) || 1;
  const north = Number(northCoefficient) || 1;
  const bonusRate = Math.max(0, Number(bonusPercent) || 0) / 100;
  const nightRate = Math.max(0, Number(nightHourBonus) || 0) / 100;
  const coefficient = district * north;

  for (let monthIndex = 0; monthIndex < (dayByMonth?.length || 0); monthIndex++) {
    const monthDays = dayByMonth[monthIndex] || [];
    const norm = Number(normalHours?.[monthIndex]) || 0;
    const hourlyRate = norm > 0 ? salary / norm : 0;

    let totalHours = 0;
    let grossFirstHalf = 0;
    let grossSecondHalf = 0;

    monthDays.forEach((day, index) => {
      const dayHours = Math.max(0, Number(day.dayHours) || 0);
      const nightHours = Math.max(0, Number(day.nightHours) || 0);
      const hours = dayHours + nightHours;
      totalHours += hours;

      const multiplier = day.holiday ? 2 : 1;
      const basePay = hourlyRate * hours * multiplier * coefficient;
      const nightPay = hourlyRate * nightHours * nightRate * coefficient;
      const gross = basePay + nightPay;

      if (index < 15) grossFirstHalf += gross;
      else grossSecondHalf += gross;
    });

    // The monthly bonus is based on the previous month's gross earnings
    // (including holiday and night premiums, but excluding the bonus itself).
    const previousMonthGross = monthIndex > 0 ? grossPerMonth[monthIndex - 1] || 0 : 0;
    const bonusFromPreviousMonth = previousMonthGross * bonusRate;

    const firstHalfAfterTax = Math.round(grossFirstHalf * 0.87);
    const secondHalfAfterTax = Math.round((grossSecondHalf + bonusFromPreviousMonth) * 0.87);

    moneyPerMonth1.push(firstHalfAfterTax);
    moneyPerMonth2.push(secondHalfAfterTax);
    grossPerMonth.push(grossFirstHalf + grossSecondHalf);
    monthHoursSum.push(totalHours);
  }

  const moneyPerMonth = moneyPerMonth1.map(
    (firstHalf, index) => firstHalf + (moneyPerMonth2[index] || 0)
  );

  return {
    moneyPerMonth,
    monthHoursSum,
    moneyPerMonth1,
    moneyPerMonth2,
    normalHours: normalHours || [],
  };
};
