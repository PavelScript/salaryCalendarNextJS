export const CountMoney = (
  dayByMonth,
  salaryPerMonthInput,
  districtCoefficient,
  northCoefficient,
  bonusPercent,
  nightHourBonus,
  normalHours,
) => {


  const moneyPerMonth = [];
  const monthHoursSum = [];

  const bonusPercentMultiplier = (bonusPercent ?? 0) / 100;
  const nightHourBonusMultiplier = (nightHourBonus ?? 0) / 100;

  for (let i = 0; i < dayByMonth.length; i++) {
    let regularDayHours = 0;
    let regularNightHours = 0;
    let holidayDayHours = 0;
    let holidayNightHours = 0;

    for (const day of dayByMonth[i]) {
      if (day.holiday) {
        holidayDayHours += day.dayHours || 0;
        holidayNightHours += day.nightHours || 0;
      } else {
        regularDayHours += day.dayHours || 0;
        regularNightHours += day.nightHours || 0;
      }
    }

    const totalHours = regularDayHours + regularNightHours + holidayDayHours + holidayNightHours;
    monthHoursSum.push(totalHours);

    const rate = salaryPerMonthInput / normalHours[i];

    // Обычная оплата за непраздничные часы
    const regularPay = rate * (regularDayHours + regularNightHours) * districtCoefficient * northCoefficient;

    // Двойная оплата за праздничные часы
    const holidayPay = rate * 2 * (holidayDayHours + holidayNightHours) * districtCoefficient * northCoefficient;

    // Доплата за все ночные часы (и обычные, и праздничные)
    const nightBonus = rate * (regularNightHours + holidayNightHours) * nightHourBonusMultiplier;

    // Бонус от предыдущего месяца
    let bonusFromLastMonth = 0;
    if (i > 0) {
      const prevRate = salaryPerMonthInput / normalHours[i - 1];
      const prevTotalHours = monthHoursSum[i - 1];
      bonusFromLastMonth = bonusPercentMultiplier * prevRate * prevTotalHours * districtCoefficient * northCoefficient;
    }

    const taxableBase = regularPay + holidayPay + nightBonus + bonusFromLastMonth;
    const totalPay = taxableBase * 0.87; // НДФЛ 13%
    moneyPerMonth.push(Math.round(totalPay));
  }

  return {
    moneyPerMonth,
    monthHoursSum,
    normalHours,
  };
};
