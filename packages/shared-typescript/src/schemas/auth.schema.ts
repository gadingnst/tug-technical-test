import { z } from 'zod';

export const LoginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});

export type LoginInput = z.infer<typeof LoginSchema>;

export const AddAdminSchema = z.object({
  email: z.string().email(),
});

export type AddAdminInput = z.infer<typeof AddAdminSchema>;

export const UpgradeAdminSchema = z.object({
  userId: z.string().min(1),
});

export type UpgradeAdminInput = z.infer<typeof UpgradeAdminSchema>;
