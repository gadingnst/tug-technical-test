import { z } from 'zod';

export const ApiResponseSchema = <T extends z.ZodTypeAny>(payloadSchema: T) => 
  z.object({
    success: z.boolean(),
    errors: z.array(z.string()).default([]),
    message: z.string().default(''),
    payload: payloadSchema.default({}),
  });

export interface ApiResponse<T = any> {
  success: boolean;
  errors: string[];
  message: string;
  payload: T;
}
