import z from "zod";
import { emailRule, passwordRule } from "@/lib/validations/index";

export const loginSchema = z.object({
  email: emailRule,
  password: passwordRule,
  remember: z.boolean().default(false),
});

export const registerSchema = z
  .object({
    fullName: z
      .string("")
      .min(1, { error: "Full name is required." })
      .max(20, { error: "Full name is to long make it shorter." }),
    email: emailRule,
    password: passwordRule,
    confirmPassword: z.string().min(1, { error: "Confirm your password" }),
    isAgreeTermsPolicy: z.boolean().refine((val) => val === true, {
      message:
        "You must accept the terms of services and privacy policy to proceed.",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export const forgotPasswordSchema = z.object({
  email: emailRule,
});

export const resetPasswordSchema = z
  .object({
    password: passwordRule,
    confirmPassword: z.string().min(1, { error: "Confirm your password" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export const verifyOTPSchema = z.object({
  otp: z
    .string()
    .length(6, { error: "OTP must be exactly 6 digits" })
    .regex(/^\d+$/, { error: "OTP must contain only numbers" }),
});
