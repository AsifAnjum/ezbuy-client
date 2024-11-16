import { z } from "zod";

export const signupSchema = z
  .object({
    fullName: z
      .string()
      .trim()
      .min(3, { message: "Name must be at least 3 characters long" })
      .max(150, { message: "Name must be less than 150 characters long" })
      .regex(/^[a-zA-Z\s]+$/, {
        message: "Name must contain only alphabetic characters",
      }),

    email: z
      .string()
      .trim()
      .email({ message: "Invalid email address" })
      .toLowerCase(),

    password: z
      .string()
      .min(6, { message: "Password must be at least 6 characters long" }),

    confirmPassword: z.string().min(6, {
      message: "Confirm password must be at least 6 characters long",
    }),

    gender: z.enum(["male", "female", "other"], {
      errorMap: () => ({
        message: "Gender is Required",
      }),
    }),
    address: z.string().optional(),
    contactNumber: z.string().optional(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Password don't match",
    path: ["confirmPassword"],
  });

export const loginSchema = z.object({
  email: z
    .string()
    .trim()
    .email({ message: "Invalid email address" })
    .toLowerCase(),

  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters long" }),
});

export const profileSchema = z
  .object({
    fullName: z
      .string()
      .trim()
      .min(3, { message: "Name must be at least 3 characters long" })
      .max(150, { message: "Name must be less than 150 characters long" })
      .regex(/^[a-zA-Z\s]+$/, {
        message: "Name must contain only alphabetic characters",
      }),

    email: z
      .string()
      .trim()
      .email({ message: "Invalid email address" })
      .toLowerCase(),

    gender: z.enum(["male", "female", "other"], {
      errorMap: () => ({
        message: "Must be Male , Female or Other",
      }),
    }),
    address: z.string(),
    contactNumber: z.string(),
  })
  .partial();

//? coupon
