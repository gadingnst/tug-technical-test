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

export const ChangePasswordSchema = z.object({
  currentPassword: z.string().min(1),
  newPassword: z.string().min(8),
});

export type ChangePasswordInput = z.infer<typeof ChangePasswordSchema>;

export const AdminSchema = z.object({
  id: z.number(),
  user_id: z.string(),
  email: z.string().email(),
  created_at: z.union([z.string(), z.date()]),
});

export type Admin = z.infer<typeof AdminSchema>;

export const AdminListResponseSchema = z.array(AdminSchema);

export type AdminListResponse = z.infer<typeof AdminListResponseSchema>;

export const AddAdminResponseSchema = z.object({
  admin: z.object({
    id: z.number(),
    user_id: z.string(),
    created_at: z.union([z.string(), z.date()]),
  }),
  generatedPassword: z.string(),
});

export type AddAdminResponse = z.infer<typeof AddAdminResponseSchema>;
