import { z } from "zod";

const envSchema = z.object({
  PORT: z.coerce.number().default(8080),
  DATABASE_URL: z.string().min(1, "MongoDB URI is required"),
  DATABASE_NAME: z.string().min(1, "Database name is required"),
});

export const env = envSchema.parse(process.env);
