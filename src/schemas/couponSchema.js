import { z } from "zod";

export const couponSchema = z.object({
  code: z
    .string({ message: "Code is required" })
    .regex(/^\S+$/, { message: "Code cannot contain spaces" }),
  discount: z
    .number()
    .min(0, { message: "Discount must be a positive number" })
    .max(100, { message: "Discount must be less than 100%" }),
  expiryDate: z.string().refine(
    (date) => {
      const parsedDate = new Date(date);
      const currentDate = new Date();

      // Check if the date is valid and if it's in the future
      return !isNaN(parsedDate.getTime()) && parsedDate > currentDate;
    },
    { message: "Expiry date must be a valid future date" }
  ),
  stock: z.number().min(0, { message: "Stock must be a positive number" }),
});
