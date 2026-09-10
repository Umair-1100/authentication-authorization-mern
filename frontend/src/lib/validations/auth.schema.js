import z from "zod";
import { emailRule, passwordRule } from "@/lib/validations/index";

export const loginSchema = z.object({
    email: emailRule,
    password: passwordRule,
    remember: z.boolean().default(false),
})