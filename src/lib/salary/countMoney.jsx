export const CountMoney = (dayByMonth, salaryPerMonthInput, districtCoefficient, northCoefficient) => {
  // Норматив по часам для каждого месяца
  const normalHours = [
    136, 160, 167, 175, 144, 151, 184, 168, 176, 184, 151, 176,
  ];

  const dayHoursSum = [];
  const nightHoursSum = [];
  const monthHoursSum = [];
  const moneyPerHour = [];
  const moneyPerMonth = [];

  for (let i = 0; i < dayByMonth.length; i++) {
    // Суммируем дневные и ночные часы за месяц
    const dayTotal = dayByMonth[i].reduce((acc, day) => acc + day.dayHours, 0);
    const nightTotal = dayByMonth[i].reduce((acc, day) => acc + day.nightHours, 0);
    const holidaysTotal = dayByMonth[i].reduce((acc, day) => acc + day.holidaysHours, 0);

    dayHoursSum.push(dayTotal);
    nightHoursSum.push(nightTotal);
    monthHoursSum.push(dayTotal + nightTotal);

    // Стоимость часа в текущем месяце
    const rateThisMonth = salaryPerMonthInput / normalHours[i];
    moneyPerHour.push(rateThisMonth);

    // Расчёт зарплаты за текущий месяц
    let currentPay = rateThisMonth * monthHoursSum[i]; // основная часть
    let nightBonus = rateThisMonth * nightTotal * 0.4; // доплата за ночь

    if (i > 0) {
      // Бонус от прошлого месяца: 30% от прошлой ставки × часы прошлого месяца
      const rateLastMonth = moneyPerHour[i - 1];
      const hoursLastMonth = monthHoursSum[i - 1];
      currentPay += 0.3 * rateLastMonth * hoursLastMonth;
    }

    const totalPay = currentPay + nightBonus;
    moneyPerMonth.push(parseInt(totalPay));
  }


  return moneyPerMonth;
};