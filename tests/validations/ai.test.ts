import { describe, expect, it } from "vitest";
import { z } from "zod";

const aiAnalysisSchema = z.object({
  matchScore: z.number().int().min(0).max(100),
  summary: z.string().min(1).max(2000),
  strengths: z.array(z.string()).max(10),
  missingSkills: z.array(z.string()).max(10),
  recommendations: z.array(z.string()).max(10),
});

describe("AI analysis schema", () => {
  it("accepts a valid AI analysis", () => {
    const result = aiAnalysisSchema.safeParse({
      matchScore: 85,
      summary: "Strong match for the role.",
      strengths: ["React", "TypeScript", "Next.js"],
      missingSkills: ["AWS"],
      recommendations: ["Review AWS fundamentals"],
    });

    expect(result.success).toBe(true);
  });

  it("rejects a match score above 100", () => {
    const result = aiAnalysisSchema.safeParse({
      matchScore: 101,
      summary: "Test",
      strengths: [],
      missingSkills: [],
      recommendations: [],
    });

    expect(result.success).toBe(false);
  });

  it("rejects a negative match score", () => {
    const result = aiAnalysisSchema.safeParse({
      matchScore: -1,
      summary: "Test",
      strengths: [],
      missingSkills: [],
      recommendations: [],
    });

    expect(result.success).toBe(false);
  });

  it("rejects an empty summary", () => {
    const result = aiAnalysisSchema.safeParse({
      matchScore: 70,
      summary: "",
      strengths: [],
      missingSkills: [],
      recommendations: [],
    });

    expect(result.success).toBe(false);
  });

  it("rejects more than 10 recommendations", () => {
    const result = aiAnalysisSchema.safeParse({
      matchScore: 70,
      summary: "Test",
      strengths: [],
      missingSkills: [],
      recommendations: Array.from({ length: 11 }, (_, i) => `Recommendation ${i}`),
    });

    expect(result.success).toBe(false);
  });
});