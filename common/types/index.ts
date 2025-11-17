import { z } from "zod";

export enum ApplicationStatus {
  PENDING = "Pending",
  APPROVED = "Approved",
  REJECTED = "Rejected",
}

export const PERMIT_TYPES = [
  "تصريح بناء",
  "تصريح تجاري",
  "تصريح مهني",
  "تصريح فعالية",
  "تصريح آخر",
] as const;

export const PermitApplicationSchema = z.object({
  applicant_name: z
    .string()
    .min(3, "الاسم يجب أن يكون 3 أحرف على الأقل")
    .max(100, "الاسم يجب ألا يزيد عن 100 حرف")
    .regex(/^[\u0600-\u06FFa-zA-Z\s]+$/, "الاسم يجب أن يحتوي على أحرف فقط"),
  applicant_email: z
    .string()
    .email("البريد الإلكتروني غير صالح")
    .min(1, "البريد الإلكتروني مطلوب"),
  permit_type: z.enum(PERMIT_TYPES),
});

export const PermitApplicationResponseSchema = PermitApplicationSchema.extend({
  id: z.string().uuid(),
  application_status: z.nativeEnum(ApplicationStatus),
  submitted_at: z.string().or(z.date()),
});

export type PermitApplicationInput = z.infer<typeof PermitApplicationSchema>;
export type PermitApplication = z.infer<typeof PermitApplicationResponseSchema>;

export const STATUS_LABELS: Record<ApplicationStatus, string> = {
  [ApplicationStatus.PENDING]: "قيد المراجعة",
  [ApplicationStatus.APPROVED]: "مقبول",
  [ApplicationStatus.REJECTED]: "مرفوض",
};
