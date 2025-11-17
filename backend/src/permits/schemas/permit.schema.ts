import { z } from 'zod';

export const PermitApplicationSchema = z.object({
  applicant_name: z
    .string()
    .min(3, 'Name must be at least 3 characters')
    .max(100, 'Name must not exceed 100 characters')
    .regex(/^[\u0600-\u06FFa-zA-Z\s]+$/, 'Name must contain only letters'),
  applicant_email: z
    .string()
    .email('Invalid email address')
    .min(1, 'Email is required'),
  permit_type: z
    .string()
    .min(1, 'Permit type is required'),
});

export type PermitApplicationInput = z.infer<typeof PermitApplicationSchema>;
