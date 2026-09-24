"use server";

import { generateObject } from "ai";
import { z } from "zod";
import { getServerSession } from "next-auth";

import { groq } from "@/lib/ai";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

const analysisSchema = z.object({
  matchScore: z.number().int().min(0).max(100),

  summary: z.string().min(1).max(2000),

  strengths: z.array(z.string()).max(10),

  missingSkills: z.array(z.string()).max(10),

  recommendations: z.array(z.string()).max(10),
});

type AIAnalysisResult =
  | {
      success: true;
      analysis: {
        id: string;
        applicationId: string;
        matchScore: number | null;
        summary: string | null;
        strengths: string | null;
        missingSkills: string | null;
        recommendations: string | null;
        createdAt: Date;
        updatedAt: Date;
      };
    }
  | {
      success: false;
      error: string;
      analysis: null;
    };

export async function analyzeJobDescription(
  applicationId: string,
  jobDescription: string,
): Promise<AIAnalysisResult> {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    return {
      success: false,
      error: "Unauthorized",
      analysis: null,
    };
  }

  if (!applicationId) {
    return {
      success: false,
      error: "Application ID is required",
      analysis: null,
    };
  }

  const cleanedDescription = jobDescription.trim();

  if (!cleanedDescription) {
    return {
      success: false,
      error: "Job description is required",
      analysis: null,
    };
  }

  if (cleanedDescription.length > 15000) {
    return {
      success: false,
      error: "Job description is too long",
      analysis: null,
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
        analysis: null,
      };
    }

    const { object } = await generateObject({
      model: groq("openai/gpt-oss-120b"),

      schema: analysisSchema,

      system: `
You are a job application analysis assistant.

Analyze the provided job description for the candidate.

Return:
- matchScore: estimated percentage match from 0 to 100
- summary: concise summary of the role
- strengths: skills or areas the candidate appears to match
- missingSkills: important skills that appear to be missing
- recommendations: practical recommendations for improving the candidate's fit

Be factual and avoid inventing candidate experience.
The analysis should be based only on the information provided.
      `,

      prompt: `
Job Title: ${application.jobTitle}
Company: ${application.company}

Job Description:
${cleanedDescription}
      `,
    });

    const analysis = await prisma.aIAnalysis.create({
      data: {
        applicationId: application.id,
        matchScore: object.matchScore,
        summary: object.summary,
        strengths: JSON.stringify(object.strengths),
        missingSkills: JSON.stringify(object.missingSkills),
        recommendations: JSON.stringify(object.recommendations),
      },
    });

    return {
      success: true,
      analysis,
    };
  } catch (error) {
    console.error("AI job analysis error:", error);

    return {
      success: false,
      error: "Failed to analyze job description",
      analysis: null,
    };
  }
}