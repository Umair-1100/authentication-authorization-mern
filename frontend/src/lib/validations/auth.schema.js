import z from "zod";
import { emailRule, passwordRule } from "@/lib/validations/index";

export const loginSchema = z.object({
    email: emailRule,
    password: passwordRule,
    remember: z.boolean().default(false),
})

export const registerSchema = z.object({
    fullName: z.string("").min(1, { error: "Full name is required." }).max(20, { error: "Full name is to long make it shorter." }),
    email: emailRule,
    password: passwordRule,
    confirmPassword: z.string().min(1, { error: "Confirm your password" }),
    isAgreeTermsPolicy: z.boolean().refine((val) => val === true, {
        message: "You must accept the terms of services and privacy policy to proceed.",
    }),
}).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
});