export const CountMoney = (
  dayByMonth,
  salaryPerMonthInput,
  districtCoefficient,
  northCoefficient,
  bonusPercent,
  nightHourBonus
) => {
  // Норматив по часам для каждого месяца
  const normalHours = [
    136, 160, 167, 175, 144, 151, 184, 168, 176, 184, 151, 176,
  ];
  console.log(dayByMonth)
  const dayHoursSum = [];
  const nightHoursSum = [];
  const monthHoursSum = [];
  const moneyPerHour = [];
  const moneyPerMonth = [];
  const bonusPercentMultiplier = bonusPercent / 100;
  const nightHourBonusMultiplier = nightHourBonus / 100;

  for (let i = 0; i < dayByMonth.length; i++) {
    // Суммируем дневные и ночные часы за месяц
    const dayTotal = dayByMonth[i].reduce((acc, day) => acc + day.dayHours, 0);
    const nightTotal = dayByMonth[i].reduce(
      (acc, day) => acc + day.nightHours,
      0
    );
    const holidaysTotal = dayByMonth[i].reduce(
      (acc, day) => acc + day.holidaysHours,
      0
    );

    dayHoursSum.push(dayTotal);
    nightHoursSum.push(nightTotal);
    monthHoursSum.push(dayTotal + nightTotal);

    // Стоимость часа в текущем месяце
    const rateThisMonth = salaryPerMonthInput / normalHours[i];
    moneyPerHour.push(rateThisMonth);

    // Основная зарплата (до налогов)
    const baseSalary =
      rateThisMonth * monthHoursSum[i] * districtCoefficient * northCoefficient; // основная часть
    const nightBonus = rateThisMonth * nightTotal * nightHourBonusMultiplier; // доплата за ночь

    // Бонус от прошлого месяца (до налогов)
    let bonusFromLastMonth = 0;
    if (i > 0) {
      const rateLastMonth = moneyPerHour[i - 1];
      const hoursLastMonth = monthHoursSum[i - 1];
      bonusFromLastMonth =
        bonusPercentMultiplier *
        rateLastMonth *
        hoursLastMonth *
        districtCoefficient *
        northCoefficient;
    }

    //Налогооблагаемая база
    const taxableBase = baseSalary + nightBonus + bonusFromLastMonth;
    //Зарплата на руки (после НДФЛ 13%)
    const totalPay = taxableBase * 0.87;
    moneyPerMonth.push(Math.round(totalPay));
  }

  return {
    moneyPerMonth,
    monthHoursSum,
  };
};
