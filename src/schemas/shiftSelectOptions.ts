import { z } from 'zod';

const VALID_PATTERNS = [
  "1day1dayOff",
  "2days2daysOff",
  "2days2nights4daysOff", 
  "1day1nightDayOff",
] as const;

type ValidPattern = typeof VALID_PATTERNS[number];

// Вспомогательная функция для проверки
const isValidPattern = (value: string): value is ValidPattern => {
  return VALID_PATTERNS.some(pattern => pattern === value);
};

export const shiftSelectSchema = z.object({
  shiftPatternKey: z.string()
    .min(1, 'Поле обязательно для заполнения')
    .refine(isValidPattern, {
      message: 'Выберите один из предложенных вариантов графиков работы',
    }),
});

export type ShiftSelectData = z.infer<typeof shiftSelectSchema>;
export type ShiftPatternType = ValidPattern;