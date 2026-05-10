import { z } from "zod";

export const createBookSchema = z.object({
  name: z
    .string({ required_error: "Назва обов'язкова" })
    .min(1, "Назва обов'язкова")
    .max(100, "Максимум 100 символів")
    .trim(),

  description: z
    .string()
    .max(500, "Максимум 500 символів")
    .trim()
    .optional()
    .default(""),

  price: z
    .number({
      required_error: "Ціна обов'язкова",
      invalid_type_error: "Ціна має бути числом",
    })
    .min(0, "Ціна не може бути від'ємною"),

  emoji: z
    .string()
    .max(10, "Emoji максимум 10 символів")
    .optional()
    .default("📘"),

  category: z.enum(
    ["Фантастика", "Роман", "Детектив", "Поезія", "Інше"],
    {
      errorMap: () => ({
        message:
          "Категорія має бути: Фантастика, Роман, Детектив, Поезія або Інше",
      }),
    }
  ),

  available: z.boolean().optional().default(true),
});

export const updateBookSchema = createBookSchema.partial();