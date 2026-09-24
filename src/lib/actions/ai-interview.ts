"use server";

import { generateObject } from "ai";
import { z } from "zod";
import { getServerSession } from "next-auth";

import { groq } from "@/lib/ai";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { rateLimit } from "@/lib/rate-limit";

const interviewPrepSchema = z.object({
  overview: z.string().min(1).max(2000),

  technicalQuestions: z
    .array(
      z.object({
        question: z.string().min(1).max(500),
        answerPoints: z.array(z.string()).max(8),
      }),
    )
    .max(10),

  behavioralQuestions: z
    .array(
      z.object({
        question: z.string().min(1).max(500),
        answerPoints: z.array(z.string()).max(8),
      }),
    )
    .max(10),

  topicsToRevise: z.array(z.string()).max(15),

  preparationTips: z.array(z.string()).max(10),
});

type InterviewPrepResult =
  | {
      success: true;
      preparation: {
        overview: string;
        technicalQuestions: {
          question: string;
          answerPoints: string[];
        }[];
        behavioralQuestions: {
          question: string;
          answerPoints: string[];
        }[];
        topicsToRevise: string[];
        preparationTips: string[];
      };
    }
  | {
      success: false;
      error: string;
      preparation: null;
    };

export async function generateInterviewPreparation(
  applicationId: string,
  interviewRound: string,
): Promise<InterviewPrepResult> {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    return {
      success: false,
      error: "Unauthorized",
      preparation: null,
    };
  }
  const rateLimitResult = rateLimit(`ai-interview:${session.user.id}`);

  if (!rateLimitResult.success) {
    return {
      success: false,
      error: `Too many requests. Try again in ${rateLimitResult.retryAfter} seconds.`,
      preparation: null,
    };
  }

  if (!applicationId) {
    return {
      success: false,
      error: "Application ID is required",
      preparation: null,
    };
  }

  const cleanedRound = interviewRound.trim();

  if (!cleanedRound) {
    return {
      success: false,
      error: "Interview round is required",
      preparation: null,
    };
  }

  if (cleanedRound.length > 100) {
    return {
      success: false,
      error: "Interview round is too long",
      preparation: null,
    };
  }

  try {
    const application = await prisma.application.findFirst({
      where: {
        id: applicationId,
        userId: session.user.id,
      },
      select: {
        id: true,
        jobTitle: true,
        company: true,
      },
    });

    if (!application) {
      return {
        success: false,
        error: "Application not found",
        preparation: null,
      };
    }

    const { object } = await generateObject({
      model: groq("openai/gpt-oss-120b"),

      schema: interviewPrepSchema,

      system: `
You are an interview preparation assistant.

Generate practical interview preparation based only on:
- Job title
- Company
- Interview round

Do not invent company-specific facts.

Provide:
- A concise preparation overview
- Technical interview questions
- Behavioral interview questions
- Important topics to revise
- Practical preparation tips

For each question, provide concise answer points rather than writing a complete fabricated answer.
`,

      prompt: `
Job Title: ${application.jobTitle}
Company: ${application.company}
Interview Round: ${cleanedRound}
`,
    });

    return {
      success: true,
      preparation: object,
    };
  } catch (error) {
    console.error("AI interview preparation error:", error);

    return {
      success: false,
      error: "Failed to generate interview preparation",
      preparation: null,
    };
  }
}
