import * as z from "zod";
export const loginSchema = z.object({
  email: z
    .string()
    .min(1, "Email Required")
    .refine((value) => {
      // Check if it's a valid email
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(value);
    }, "Please enter a valid email address"),
  password: z
    .string()
    .min(1, "Password required")
    .max(100, "Password must be less than 100 characters"),
});

export type LoginFormValues = z.infer<typeof loginSchema>;
