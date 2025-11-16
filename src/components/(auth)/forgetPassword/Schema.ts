import * as z from "zod";
export const forgetPassSchema = z.object({
  email: z
    .string()
    .min(1, "Email required")
    .refine((value) => {
      // Check if it's a valid email
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(value);
    }, "Please enter a valid email address"),
});

export type ForgetPassFormValues = z.infer<typeof forgetPassSchema>;
