import { z } from "zod";

const ACCEPTED_IMAGE_MIME_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];
const MAX_FILE_SIZE = 1024 * 1024 * 5;

export const productSchema = z.object({
  title: z
    .string()
    .trim()
    .min(5, { message: "Name must be at least 5 characters long" })
    .max(150, { message: "Name must be less than 150 characters long" }),
  brand: z
    .string()
    .trim()
    .min(4, { message: "Brand name must be at least 4 characters long" })
    .regex(/^[a-zA-Z\s]+$/, {
      message: "Brand name must contain only alphabetic characters",
    }),
  description: z
    .string()
    .trim()
    .min(10, {
      message: "Product description must be at least 4 characters long",
    })
    .max(1000, {
      message: "Product description must be less than 1000 characters long",
    }),

  images: z
    .any()
    .refine((files) => files.length >= 1, "Image Required")
    .refine((files) => {
      return files?.[0]?.size <= MAX_FILE_SIZE;
    }, `Max image size is 5MB.`)
    .refine(
      (files) => ACCEPTED_IMAGE_MIME_TYPES.includes(files?.[0]?.type),
      "Only .jpg, .jpeg, .png and .webp formats are supported."
    ),
  category: z.enum(
    [
      "Electronics",
      "Clothing",
      "Books",
      "Kitchen",
      "Toys",
      "Sports",
      "Gaming",
      "Others",
    ],
    {
      errorMap: () => ({
        message: "Category is Required",
      }),
    }
  ),
  price: z
    .number()
    .nonnegative()
    .gt(0, { message: "product price at least 1 dollar" }),

  stock: z.number().int().nonnegative(),

  tags: z.string(),
});

export const editProductSchema = z
  .object({
    title: z
      .string()
      .trim()
      .min(5, { message: "Name must be at least 5 characters long" })
      .max(150, { message: "Name must be less than 150 characters long" }),
    brand: z
      .string()
      .trim()
      .min(4, { message: "Brand name must be at least 4 characters long" })
      .regex(/^[a-zA-Z\s]+$/, {
        message: "Brand name must contain only alphabetic characters",
      }),
    description: z
      .string()
      .trim()
      .min(10, {
        message: "Product description must be at least 4 characters long",
      })
      .max(1000, {
        message: "Product description must be less than 1000 characters long",
      }),

    images: z
      .any()
      .refine((files) => {
        if (!files.length) {
          return true;
        }
        return files?.[0]?.size <= MAX_FILE_SIZE;
      }, `Max image size is 5MB.`)
      .refine((files) => {
        if (!files.length) {
          return true;
        }

        return ACCEPTED_IMAGE_MIME_TYPES.includes(files?.[0]?.type);
      }, "Only .jpg, .jpeg, .png and .webp formats are supported."),

    category: z.enum(
      [
        "Electronics",
        "Clothing",
        "Books",
        "Kitchen",
        "Toys",
        "Sports",
        "Gaming",
        "Others",
      ],
      {
        errorMap: () => ({
          message: "Category is Required",
        }),
      }
    ),
    price: z
      .number()
      .nonnegative()
      .gt(0, { message: "product price at least 1 dollar" }),

    stock: z.number().int().nonnegative(),

    tags: z.string(),
    sale: z.number(),
    status: z.string(),
  })
  .partial();
