import { describe, expect, it } from "vitest";
import { applicationSchema } from "@/lib/validations/application";

describe("applicationSchema", () => {
  it("accepts a valid application", () => {
    const result = applicationSchema.safeParse({
      company: "TechNova",
      jobTitle: "Full Stack Developer",
      jobUrl: "https://example.com/job",
      location: "Remote",
      salary: "10 LPA",
      jobType: "FULL_TIME",
      status: "APPLIED",
      notes: "Applied through company website",
    });

    expect(result.success).toBe(true);
  });

  it("rejects an empty company", () => {
    const result = applicationSchema.safeParse({
      company: "",
      jobTitle: "Developer",
    });

    expect(result.success).toBe(false);
  });

  it("rejects an invalid job URL", () => {
    const result = applicationSchema.safeParse({
      company: "TechNova",
      jobTitle: "Developer",
      jobUrl: "not-a-url",
    });

    expect(result.success).toBe(false);
  });

  it("rejects an excessively long notes field", () => {
    const result = applicationSchema.safeParse({
      company: "TechNova",
      jobTitle: "Developer",
      notes: "a".repeat(2001),
    });

    expect(result.success).toBe(false);
  });

  it("accepts supported job types", () => {
    const result = applicationSchema.safeParse({
      company: "TechNova",
      jobTitle: "Developer",
      jobType: "FULL_TIME",
    });

    expect(result.success).toBe(true);
  });
});