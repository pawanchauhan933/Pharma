import { z } from "zod";

export const manufacturerSchema = z.object({
  name: z.string().trim().min(1, "Manufacturer name is required"),

  contactPerson: z.string().optional(),

  phone: z.string().optional(),

  email: z
    .string()
    .email("Invalid email address")
    .optional()
    .or(z.literal("")),

  address: z.string().optional(),

  description: z.string().optional(),

  active: z.boolean().default(true),
});

export type ManufacturerFormData = z.output<typeof manufacturerSchema>;