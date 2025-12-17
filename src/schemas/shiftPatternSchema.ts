import { z } from "zod";

export const shiftBlockSchema = z.object({
  id: z.string(),
  type: z.enum(["dayShift", "nightShift", "offShift"]),
  days: z.string().min(1, "Минимум 1 день").regex(/^\d+$/, "Только цифры"),
});

export const shiftPatternSchema = z.object({
  blocks: z.array(shiftBlockSchema).min(1, "Добавьте хотя бы один период")
    .refine(
      (blocks) => blocks.some((b) => b.type !== "offShift"),
      "График должен содержать хотя бы один рабочий день (день или ночь)"
    ),
});