import z from "zod";

export const emailRule = z.email({ error: "Invalid email" });
export const passwordRule = z
    .string()
    .min(8, { error: "Password must be at least 8 characters long" })
    .max(32, { error: "Password cannot exceed 32 characters" })
    .refine((val) => /[A-Z]/.test(val), {
        error: "Password must contain at least one uppercase letter",
    })
    .refine((val) => /[a-z]/.test(val), {
        error: "Password must contain at least one lowercase letter",
    })
    .refine((val) => /[0-9]/.test(val), {
        error: "Password must contain at least one number",
    })
    .refine((val) => /[^A-Za-z0-9]/.test(val), {
        error: "Password must contain at least one special character",
    })