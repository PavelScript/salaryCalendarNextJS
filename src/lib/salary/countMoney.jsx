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



// export const CountMoney = (
//   dayByMonth,
//   salaryPerMonthInput,
//   districtCoefficient,
//   northCoefficient,
//   bonusPercent,
//   nightHourBonus
// ) => {
//   // Норматив по часам для каждого месяца
//   const normalHours = [
//     136, 160, 167, 175, 144, 151, 184, 168, 176, 184, 151, 176,
//   ];

//   const dayHoursSum = [];
//   const nightHoursSum = [];
//   const monthHoursSum = [];
//   const moneyPerHour = [];
//   const moneyPerMonth = [];
//   const bonusPercentMultiplier = (bonusPercent ?? 0) / 100;
//   const nightHourBonusMultiplier = (nightHourBonus ?? 0) / 100;

//   for (let i = 0; i < dayByMonth.length; i++) {
//     // Суммируем дневные и ночные часы за месяц
//     const dayTotal = dayByMonth[i].reduce((acc, day) => acc + day.dayHours, 0);
//     const nightTotal = dayByMonth[i].reduce(
//       (acc, day) => acc + day.nightHours,
//       0
//     );
//     const holidayHours = dayByMonth[i].reduce((acc, day) => {
//       if (day.holiday) {
//         return acc + day.dayHours + day.nightHours;
//       }
//       return acc;
//     }, 0);

//     dayHoursSum.push(dayTotal);
//     nightHoursSum.push(nightTotal);
//     monthHoursSum.push(dayTotal + nightTotal);

//     // Стоимость часа в текущем месяце
//     const rateThisMonth = salaryPerMonthInput / normalHours[i];
//     moneyPerHour.push(rateThisMonth);

//     // Основная зарплата (до налогов)
//     const baseSalary =
//       rateThisMonth * monthHoursSum[i] * districtCoefficient * northCoefficient; // основная часть
//     const nightBonus = rateThisMonth * nightTotal * nightHourBonusMultiplier; // доплата за ночь

    

//     // Бонус от прошлого месяца (до налогов)
//     let bonusFromLastMonth = 0;
//     if (i > 0) {
//       const rateLastMonth = moneyPerHour[i - 1];
//       const hoursLastMonth = monthHoursSum[i - 1];
//       bonusFromLastMonth =
//         bonusPercentMultiplier *
//         rateLastMonth *
//         hoursLastMonth *
//         districtCoefficient *
//         northCoefficient;
//     }

//     //Налогооблагаемая база
//     const taxableBase = baseSalary + nightBonus + bonusFromLastMonth;
//     //Зарплата на руки (после НДФЛ 13%)
//     const totalPay = taxableBase * 0.87;
//     moneyPerMonth.push(Math.round(totalPay));
//   }

//   return {
//     moneyPerMonth,
//     monthHoursSum,
//     normalHours,
//   };
// };
