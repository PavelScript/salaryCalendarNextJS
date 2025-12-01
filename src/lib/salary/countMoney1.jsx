export const CountMoney1 = (
  dayByMonth,
  salaryPerMonthInput,
  districtCoefficient,
  northCoefficient,
  bonusPercent,
  nightHourBonus,
  normalHours
) => {
  const moneyPerMonth1 = [];
  const moneyPerMonth2 = [];
  const monthHoursSum1 = [];
  const monthHoursSum2 = [];
  const monthHoursSumTotal = [];

  const bonusPercentMultiplier = (bonusPercent ?? 0) / 100;
  const nightHourBonusMultiplier = (nightHourBonus ?? 0) / 100;

  let regularDayHours1 = 0;
  let regularNightHours1 = 0;
  let holidayDayHours1 = 0;
  let holidayNightHours1 = 0;
  let regularDayHours2 = 0;
  let regularNightHours2 = 0;
  let holidayDayHours2 = 0;
  let holidayNightHours2 = 0;

  //First part of the month
  for (const day of dayByMonth.slice(0, 15)) {
    const { holiday, dayHours, nightHours } = day;

    if (holiday) {
      holidayDayHours1 += dayHours;
      holidayNightHours1 += nightHours;
    } else {
      regularDayHours1 += dayHours;
      regularNightHours1 += nightHours;
    }
  }

  //Second part of the month
  for (const day of dayByMonth.slice(15)) {
    const { holiday, dayHours, nightHours } = day;

    if (holiday) {
      holidayDayHours2 += dayHours;
      holidayNightHours2 += nightHours;
    } else {
      regularDayHours2 += dayHours;
      regularNightHours2 += nightHours;
    }
  }

  const totalHours1 =
    regularDayHours1 +
    regularNightHours1 +
    holidayDayHours1 +
    holidayNightHours1;
  monthHoursSum1.push(totalHours1);

  const totalHours2 =
    regularDayHours2 +
    regularNightHours2 +
    holidayDayHours2 +
    holidayNightHours2;
  monthHoursSum2.push(totalHours2);

  const rate = salaryPerMonthInput / normalHours[i];

  // Обычная оплата за непраздничные часы
  const regularPay1 =
    rate *
    (regularDayHours1 + regularNightHours1) *
    districtCoefficient *
    northCoefficient;

  const regularPay2 =
    rate *
    (regularDayHours2 + regularNightHours2) *
    districtCoefficient *
    northCoefficient;

  // Двойная оплата за праздничные часы
  const holidayPay1 =
    rate *
    2 *
    (holidayDayHours1 + holidayNightHours1) *
    districtCoefficient *
    northCoefficient;

  const holidayPay2 =
    rate *
    2 *
    (holidayDayHours2 + holidayNightHours2) *
    districtCoefficient *
    northCoefficient;

  // Доплата за все ночные часы (и обычные, и праздничные)
  const nightBonus1 =
    rate * (regularNightHours1 + holidayNightHours1) * nightHourBonusMultiplier;

  const nightBonus2 =
    rate * (regularNightHours2 + holidayNightHours2) * nightHourBonusMultiplier;

  // Бонус от предыдущего месяца
  let bonusFromLastMonth = 0;
  if (i > 0) {
    const prevRate = salaryPerMonthInput / normalHours[i - 1];
    const prevTotalHours = monthHoursSumTotal[i - 1];
    bonusFromLastMonth =
      bonusPercentMultiplier *
      prevRate *
      prevTotalHours *
      districtCoefficient *
      northCoefficient;
  }

  const taxableBase1 = regularPay1 + holidayPay1 + nightBonus1;
  const totalPay1 = taxableBase1 * 0.87; // НДФЛ 13%
  moneyPerMonth1.push(Math.round(totalPay1));

  const taxableBase2 =
    regularPay2 + holidayPay2 + nightBonus2 + bonusFromLastMonth;
  const totalPay2 = taxableBase2 * 0.87; // НДФЛ 13%
  moneyPerMonth2.push(Math.round(totalPay2));
};

//Total month hours
monthHoursSumTotal.push(monthHoursSum1 + monthHoursSum2);

return {
  moneyPerMonth1,
  moneyPerMonth2,
  monthHoursSumTotal,
  normalHours,
};
