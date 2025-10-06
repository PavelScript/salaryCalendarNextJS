import { z } from 'zod';

export const salarySchemaNumbers = z.object({
  salary: z.string()
    .min(1, 'Поле обязательно для заполнения')
    .refine(
      (val) => {
        // Проверяем, что строка содержит только цифры, одну точку/запятую и не начинается с них
        const validPattern = /^\d+(\.\d+)?$/; // или /^(\d+\.?\d*)?$/ — зависит от нужного формата
        return validPattern.test(val);
      },
      { message: 'Введите корректную сумму (только цифры и одна точка)' }
    )
    .refine(
      (val) => {
        const num = parseFloat(val);
        return !isNaN(num) && num >= 0;
      },
      { message: 'Сумма должна быть неотрицательной' }
    ),
});