import { z } from "zod";

const websiteUrlSchema = z.string().url("Website must be a valid URL.");

export const earlyAccessInputSchema = z.object({
  name: z.string().trim().min(2, "Name is required."),
  email: z.string().trim().email("Enter a valid email address."),
  company: z.string().trim().min(2, "Company is required."),
  website: z
    .string()
    .trim()
    .default("")
    .refine((value) => value.length === 0 || websiteUrlSchema.safeParse(value).success, {
      message: "Website must be a valid URL.",
    }),
  role: z.enum(["agency", "merchant"]),
});

export const earlyAccessRequestSchema = earlyAccessInputSchema.transform((value) => {
  const website = value.website.length > 0 ? value.website : undefined;

  return website !== undefined
    ? {
        name: value.name,
        email: value.email,
        company: value.company,
        website,
        role: value.role,
      }
    : {
        name: value.name,
        email: value.email,
        company: value.company,
        role: value.role,
      };
});

export const earlyAccessResponseSchema = z.object({
  success: z.boolean(),
  message: z.string().optional(),
  error: z.string().optional(),
  request_id: z.string().optional(),
});

export type EarlyAccessFormInput = z.input<typeof earlyAccessInputSchema>;

export type EarlyAccessValidationErrors = Partial<Record<keyof EarlyAccessFormInput, string>>;

export function mapValidationErrors(validationError: z.ZodError<EarlyAccessFormInput>): EarlyAccessValidationErrors {
  const errors: EarlyAccessValidationErrors = {};

  for (const issue of validationError.issues) {
    const field = issue.path[0];
    if (field !== undefined && typeof field === "string" && errors[field as keyof EarlyAccessFormInput] === undefined) {
      errors[field as keyof EarlyAccessFormInput] = issue.message;
    }
  }

  return errors;
}
