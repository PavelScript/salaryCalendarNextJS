interface ShiftDay {
  yearId: number;
  id: number; // день месяца (1–31)
  year: number;
  month: number; // 0–11 (как в JS Date)
  workShift: "dayShift" | "nightShift" | "offShift";
  weekDay: number; // 0 (воскресенье) – 6 (суббота)
  holiday: boolean;
  extraShift: boolean;
  dayHours: number;
  nightHours: number;
}

export const generateShiftPattern = (
  year: number,
  startDayPattern: number,
  shiftPattern: ("dayShift" | "nightShift" | "offShift")[],
  dayHours: number[],
  nightHours: number[]
) => {
  const DAYS: ShiftDay[] = [];
  let yearId = 0;

  for (let month = 0; month < 12; month++) {
    // Количество дней в месяце
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    for (let id = 1; id <= daysInMonth; id++) {
      // День недели (0 - воскресенье, 6 - суббота)
      const weekDay = new Date(year, month, id).getDay();

      DAYS.push({
        yearId: yearId++,
        id: id,
        year: year,
        month: month,
        workShift: "offShift",
        weekDay: weekDay,
        holiday: false,
        extraShift: false,
        dayHours: 0,
        nightHours: 0,
      });
    }
  }

  //Push holidayDays into DAYS
  const addHolidays = (holidaysArray:number[], monthId:number) => {
    holidaysArray.forEach((dayId) => {
      const day = DAYS.find((d) => d.month === monthId && d.id === dayId);
      if (day) day.holiday = true;
    });
  };

  const januaryHolidays = [1, 2, 3, 4, 5, 6, 7, 8];
  const februaryHolidays = [23];
  const marchHolidays = [8];
  const mayHolidays = [1, 9];
  const juneHolidays = [12];
  const novemberHolidays = [4];

  addHolidays(januaryHolidays, 0);
  addHolidays(februaryHolidays, 1);
  addHolidays(marchHolidays, 2);
  addHolidays(mayHolidays, 4);
  addHolidays(juneHolidays, 5);
  addHolidays(novemberHolidays, 10);

  //Паттерн работы

  let patternIndex = 0;
  startDayPattern = startDayPattern ?? 0;

  for (let i = startDayPattern; i < DAYS.length; i++) {
    const day = DAYS[i];

    day.workShift = shiftPattern[patternIndex % shiftPattern.length];
    day.dayHours = dayHours[patternIndex % dayHours.length];
    day.nightHours = nightHours[patternIndex % nightHours.length];
    patternIndex++;
  }

  // Разделение по месяцам
const daysByMonth: ShiftDay[][] = Array.from({ length: 12 }, () => []);

for (const day of DAYS) {
  daysByMonth[day.month].push(day);
}

  return daysByMonth;
};
