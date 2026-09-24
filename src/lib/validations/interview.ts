import { z } from "zod";

export const interviewSchema = z.object({
  applicationId: z
    .string()
    .min(1, "Application is required"),

  round: z
    .string()
    .trim()
    .min(1, "Interview round is required")
    .max(100, "Interview round is too long"),

  scheduledAt: z.coerce.date({
    message: "Enter a valid interview date and time",
  }),

  interviewer: z
    .string()
    .trim()
    .max(100, "Interviewer name is too long")
    .optional()
    .or(z.literal("")),

  meetingUrl: z
    .string()
    .trim()
    .url("Enter a valid meeting URL")
    .optional()
    .or(z.literal("")),

  result: z
    .enum(["PENDING", "PASSED", "FAILED"])
    .optional(),

  notes: z
    .string()
    .trim()
    .max(2000, "Notes are too long")
    .optional()
    .or(z.literal("")),
});

export type InterviewInput = z.infer<typeof interviewSchema>;