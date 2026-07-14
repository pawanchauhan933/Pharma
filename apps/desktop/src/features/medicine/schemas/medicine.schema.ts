import { z } from "zod";

export const medicineSchema = z.object({
  medicineName: z.string().trim().min(1, "Medicine name is required"),
  genericName: z.string().optional(),
  manufacturer: z.string().min(1, "Manufacturer is required"),
  category: z.string().min(1, "Category is required"),
  description: z.string().optional(),

  purchasePrice: z.coerce
    .number()
    .min(0, "Purchase price must be greater than or equal to 0"),

  sellingPrice: z.coerce
    .number()
    .min(0, "Selling price must be greater than or equal to 0"),

  minimumStock: z.coerce
    .number()
    .min(0, "Minimum stock cannot be negative"),

  active: z.boolean().default(true),
});

export type MedicineFormData = z.output<typeof medicineSchema>;