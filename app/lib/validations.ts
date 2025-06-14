import { z } from "zod"

// Auth schemas
export const signUpSchema = z.object({
    name: z.string().min(2, "Nama harus minimal 2 karakter"),
    email: z.string().email("Email tidak valid"),
    password: z.string().min(8, "Password harus minimal 8 karakter"),
    confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
    message: "Password tidak cocok",
    path: ["confirmPassword"],
})

export const signInSchema = z.object({
    email: z.string().email("Email tidak valid"),
    password: z.string().min(1, "Password diperlukan"),
})

export const forgotPasswordSchema = z.object({
    email: z.string().email("Email tidak valid"),
})

export const resetPasswordSchema = z.object({
    password: z.string().min(8, "Password harus minimal 8 karakter"),
    confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
    message: "Password tidak cocok",
    path: ["confirmPassword"],
})

// Profile schemas
export const updateProfileSchema = z.object({
    name: z.string().min(2, "Nama harus minimal 2 karakter"),
    email: z.string().email("Email tidak valid"),
    bio: z.string().max(500, "Bio maksimal 500 karakter").optional(),
    website: z.string().url("URL tidak valid").optional().or(z.literal("")),
    company: z.string().max(100, "Nama perusahaan maksimal 100 karakter").optional(),
})

export const changePasswordSchema = z.object({
    currentPassword: z.string().min(1, "Password saat ini diperlukan"),
    newPassword: z.string().min(8, "Password baru harus minimal 8 karakter"),
    confirmPassword: z.string(),
}).refine((data) => data.newPassword === data.confirmPassword, {
    message: "Password tidak cocok",
    path: ["confirmPassword"],
})

// Subscription schemas
export const subscriptionSchema = z.object({
    plan: z.enum(["basic", "pro", "enterprise"]),
    interval: z.enum(["monthly", "yearly"]),
})

// Contact/Support schemas
export const contactSchema = z.object({
    name: z.string().min(2, "Nama harus minimal 2 karakter"),
    email: z.string().email("Email tidak valid"),
    subject: z.string().min(5, "Subjek harus minimal 5 karakter"),
    message: z.string().min(10, "Pesan harus minimal 10 karakter"),
})

// Admin schemas
export const createUserSchema = z.object({
    name: z.string().min(2, "Nama harus minimal 2 karakter"),
    email: z.string().email("Email tidak valid"),
    role: z.enum(["user", "admin"]),
    plan: z.enum(["basic", "pro", "enterprise"]).optional(),
})

export const updateUserSchema = z.object({
    name: z.string().min(2, "Nama harus minimal 2 karakter"),
    email: z.string().email("Email tidak valid"),
    role: z.enum(["user", "admin"]),
    plan: z.enum(["basic", "pro", "enterprise"]).optional(),
    isActive: z.boolean(),
})

// Type exports
export type SignUpInput = z.infer<typeof signUpSchema>
export type SignInInput = z.infer<typeof signInSchema>
export type ForgotPasswordInput = z.infer<typeof forgotPasswordSchema>
export type ResetPasswordInput = z.infer<typeof resetPasswordSchema>
export type UpdateProfileInput = z.infer<typeof updateProfileSchema>
export type ChangePasswordInput = z.infer<typeof changePasswordSchema>
export type SubscriptionInput = z.infer<typeof subscriptionSchema>
export type ContactInput = z.infer<typeof contactSchema>
export type CreateUserInput = z.infer<typeof createUserSchema>
export type UpdateUserInput = z.infer<typeof updateUserSchema> 