// countMoney.tsx
import type { Day } from "@/types/user.types";

interface Props {
  dayByMonth: Day[][]; // Array of months, each containing days
  salaryPerMonthInput: number;
  districtCoefficient: number;
  northCoefficient: number;
  bonusPercent: number;
  nightHourBonus: number;
  normalHours: number[];
}

export const CountMoney = ({
  dayByMonth,
  salaryPerMonthInput,
  districtCoefficient,
  northCoefficient,
  bonusPercent,
  nightHourBonus,
  normalHours
}: Props) => {
  
  if (!dayByMonth || !Array.isArray(dayByMonth)) {
    return {
      moneyPerMonth: [],
      monthHoursSum: [],
      normalHours: normalHours || []
    };
  }

  const moneyPerMonth1: number[] = [];
  const moneyPerMonth2: number[] = [];
  const monthHoursSum: number[] = [];

  const bonusPercentMultiplier = (bonusPercent ?? 0) / 100;
  const nightHourBonusMultiplier = (nightHourBonus ?? 0) / 100;

  for (let i = 0; i < dayByMonth.length; i++) {
    const monthDays = dayByMonth[i] || [];
    const currentNormalHours = normalHours[i];

    let regularDayHours1 = 0;
    let regularNightHours1 = 0;
    let holidayDayHours1 = 0;
    let holidayNightHours1 = 0;
    let regularDayHours2 = 0;
    let regularNightHours2 = 0;
    let holidayDayHours2 = 0;
    let holidayNightHours2 = 0;
    let totalHours = 0;

    if (monthDays.length > 0) {
      // First half of month (days 1-15)
      const firstHalf = monthDays.slice(0, 15);
      for (const day of firstHalf) {
        const { holiday = false, dayHours = 0, nightHours = 0 } = day;
        
        if (holiday) {
          holidayDayHours1 += dayHours;
          holidayNightHours1 += nightHours;
        } else {
          regularDayHours1 += dayHours;
          regularNightHours1 += nightHours;
        }
        totalHours += dayHours + nightHours;
      }

      // Second half of month (days 16+)
      const secondHalf = monthDays.slice(15);
      for (const day of secondHalf) {
        const { holiday = false, dayHours = 0, nightHours = 0 } = day;
        
        if (holiday) {
          holidayDayHours2 += dayHours;
          holidayNightHours2 += nightHours;
        } else {
          regularDayHours2 += dayHours;
          regularNightHours2 += nightHours;
        }
        totalHours += dayHours + nightHours;
      }

      const rate = salaryPerMonthInput / currentNormalHours;

      // Calculate pay for first half
      const regularPay1 = rate * (regularDayHours1 + regularNightHours1) * 
                          districtCoefficient * northCoefficient;
      const holidayPay1 = rate * 2 * (holidayDayHours1 + holidayNightHours1) * 
                          districtCoefficient * northCoefficient;
      const nightBonus1 = rate * (regularNightHours1 + holidayNightHours1) * 
                          nightHourBonusMultiplier;

      // Calculate pay for second half
      const regularPay2 = rate * (regularDayHours2 + regularNightHours2) * 
                          districtCoefficient * northCoefficient;
      const holidayPay2 = rate * 2 * (holidayDayHours2 + holidayNightHours2) * 
                          districtCoefficient * northCoefficient;
      const nightBonus2 = rate * (regularNightHours2 + holidayNightHours2) * 
                          nightHourBonusMultiplier;

      // Bonus from previous month (applies to second half only)
      let bonusFromLastMonth = 0;
      if (i > 0) {
        const prevNormalHours = normalHours[i - 1];
        const prevRate = salaryPerMonthInput / prevNormalHours;
        const prevTotalHours = monthHoursSum[i - 1] || 0;
        bonusFromLastMonth = bonusPercentMultiplier * prevRate * prevTotalHours * 
                            districtCoefficient * northCoefficient;
      }

      // First half pay (without bonus)
      const taxableBase1 = regularPay1 + holidayPay1 + nightBonus1;
      const totalPay1 = Math.round(taxableBase1 * 0.87);
      moneyPerMonth1.push(totalPay1);

      // Second half pay (with bonus from previous month)
      const taxableBase2 = regularPay2 + holidayPay2 + nightBonus2 + bonusFromLastMonth;
      const totalPay2 = Math.round(taxableBase2 * 0.87);
      moneyPerMonth2.push(totalPay2);

    } else {
      moneyPerMonth1.push(0);
      moneyPerMonth2.push(0);
    }

    monthHoursSum.push(totalHours);
  }

  // Combine first and second half payments for total monthly pay
  const moneyPerMonth = moneyPerMonth1.map((pay1, index) => 
    pay1 + (moneyPerMonth2[index] || 0)
  );

  return {
    moneyPerMonth,
    monthHoursSum,
    moneyPerMonth1,
    moneyPerMonth2,
    normalHours
  };
};