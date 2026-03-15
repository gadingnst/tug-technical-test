import { z } from 'zod';

export const WellnessPackageSchema = z.object({
  id: z.number().int().positive(),
  name: z.string().min(1, 'Name is required').max(255),
  description: z.string().nullable().optional(),
  price: z.number().int().nonnegative('Price must be a non-negative integer'),
  duration_minutes: z.number().int().positive('Duration must be a positive integer'),
  created_at: z.coerce.date(),
});

export const CreateWellnessPackageDto = WellnessPackageSchema.omit({
  id: true,
  created_at: true,
});

export const UpdateWellnessPackageDto = CreateWellnessPackageDto.partial();

export type WellnessPackage = z.infer<typeof WellnessPackageSchema>;
export type CreateWellnessPackageInput = z.infer<typeof CreateWellnessPackageDto>;
export type UpdateWellnessPackageInput = z.infer<typeof UpdateWellnessPackageDto>;
