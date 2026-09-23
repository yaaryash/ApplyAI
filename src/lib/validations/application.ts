import { z } from "zod";

export const applicationSchema = z.object({
  company: z
    .string()
    .trim()
    .min(1, "Company name is required")
    .max(100, "Company name is too long"),

  jobTitle: z
    .string()
    .trim()
    .min(1, "Job title is required")
    .max(100, "Job title is too long"),

  jobUrl: z
    .string()
    .trim()
    .url("Enter a valid job URL")
    .optional()
    .or(z.literal("")),

  location: z
    .string()
    .trim()
    .max(100, "Location is too long")
    .optional(),

  salary: z
    .string()
    .trim()
    .max(100, "Salary is too long")
    .optional(),

  jobType: z
    .enum(["FULL_TIME", "PART_TIME", "CONTRACT", "INTERNSHIP"])
    .optional(),

  status: z
    .enum([
      "APPLIED",
      "SCREENING",
      "INTERVIEW",
      "OFFER",
      "REJECTED",
      "WITHDRAWN",
    ])
    .optional(),

  appliedDate: z.coerce.date().optional(),

  deadline: z.coerce.date().optional(),

  notes: z
    .string()
    .trim()
    .max(2000, "Notes are too long")
    .optional(),

  resumeUsed: z
    .string()
    .trim()
    .max(200, "Resume name is too long")
    .optional(),
});

export type ApplicationInput = z.infer<typeof applicationSchema>;