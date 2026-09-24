import { describe, expect, it } from "vitest";
import { interviewSchema } from "@/lib/validations/interview";

describe("interviewSchema", () => {
  it("accepts a valid interview", () => {
    const result = interviewSchema.safeParse({
      applicationId: "6ab4e58da44ee05b3fa4dcfe",
      round: "Technical Interview",
      scheduledAt: "2026-10-01T10:00:00",
      interviewer: "John",
      meetingUrl: "https://meet.example.com/interview",
      result: "PENDING",
      notes: "Prepare system design questions",
    });

    expect(result.success).toBe(true);
  });

  it("rejects a missing application", () => {
    const result = interviewSchema.safeParse({
      applicationId: "",
      round: "Technical Interview",
      scheduledAt: "2026-10-01T10:00:00",
    });

    expect(result.success).toBe(false);
  });

  it("rejects an empty interview round", () => {
    const result = interviewSchema.safeParse({
      applicationId: "123",
      round: "",
      scheduledAt: "2026-10-01T10:00:00",
    });

    expect(result.success).toBe(false);
  });

  it("rejects an invalid meeting URL", () => {
    const result = interviewSchema.safeParse({
      applicationId: "123",
      round: "Technical Interview",
      scheduledAt: "2026-10-01T10:00:00",
      meetingUrl: "invalid-url",
    });

    expect(result.success).toBe(false);
  });

  it("rejects an invalid interview result", () => {
    const result = interviewSchema.safeParse({
      applicationId: "123",
      round: "Technical Interview",
      scheduledAt: "2026-10-01T10:00:00",
      result: "INVALID",
    });

    expect(result.success).toBe(false);
  });
});