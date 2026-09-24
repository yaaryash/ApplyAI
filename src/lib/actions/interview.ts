"use server";

import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";

import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { interviewSchema } from "@/lib/validations/interview";

export async function createInterview(input: unknown) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    return {
      success: false,
      error: "Unauthorized",
    };
  }

  const result = interviewSchema.safeParse(input);

  if (!result.success) {
    return {
      success: false,
      error: "Invalid interview data",
      fields: result.error.flatten().fieldErrors,
    };
  }

  const data = result.data;

  try {
    // Make sure the application belongs to the logged-in user.
    const application = await prisma.application.findFirst({
      where: {
        id: data.applicationId,
        userId: session.user.id,
      },
      select: {
        id: true,
      },
    });

    if (!application) {
      return {
        success: false,
        error: "Application not found",
      };
    }

    const interview = await prisma.interview.create({
      data: {
        applicationId: data.applicationId,
        round: data.round,
        scheduledAt: data.scheduledAt,
        interviewer: data.interviewer || null,
        meetingUrl: data.meetingUrl || null,
        result: data.result ?? "PENDING",
        notes: data.notes || null,
      },
    });

    revalidatePath("/dashboard/interviews");
    revalidatePath("/dashboard");

    return {
      success: true,
      interview,
    };
  } catch (error) {
    console.error("Create interview error:", error);

    return {
      success: false,
      error: "Failed to create interview",
    };
  }
}

export async function getInterviews() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    return {
      success: false,
      error: "Unauthorized",
      interviews: [],
    };
  }

  try {
    const interviews = await prisma.interview.findMany({
      where: {
        application: {
          userId: session.user.id,
        },
      },
      include: {
        application: {
          select: {
            id: true,
            company: true,
            jobTitle: true,
          },
        },
      },
      orderBy: {
        scheduledAt: "asc",
      },
    });

    return {
      success: true,
      interviews,
    };
  } catch (error) {
    console.error("Get interviews error:", error);

    return {
      success: false,
      error: "Failed to fetch interviews",
      interviews: [],
    };
  }
}

export async function updateInterview(
  interviewId: string,
  input: unknown,
) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    return {
      success: false,
      error: "Unauthorized",
    };
  }

  if (!interviewId) {
    return {
      success: false,
      error: "Interview ID is required",
    };
  }

  const result = interviewSchema.safeParse(input);

  if (!result.success) {
    return {
      success: false,
      error: "Invalid interview data",
      fields: result.error.flatten().fieldErrors,
    };
  }

  const data = result.data;

  try {
    // Verify the interview belongs to an application
    // owned by the logged-in user.
    const existingInterview = await prisma.interview.findFirst({
      where: {
        id: interviewId,
        application: {
          userId: session.user.id,
        },
      },
      select: {
        id: true,
      },
    });

    if (!existingInterview) {
      return {
        success: false,
        error: "Interview not found",
      };
    }

    // Verify the new application also belongs to the user.
    const application = await prisma.application.findFirst({
      where: {
        id: data.applicationId,
        userId: session.user.id,
      },
      select: {
        id: true,
      },
    });

    if (!application) {
      return {
        success: false,
        error: "Application not found",
      };
    }

    const interview = await prisma.interview.update({
      where: {
        id: interviewId,
      },
      data: {
        applicationId: data.applicationId,
        round: data.round,
        scheduledAt: data.scheduledAt,
        interviewer: data.interviewer || null,
        meetingUrl: data.meetingUrl || null,
        result: data.result ?? "PENDING",
        notes: data.notes || null,
      },
    });

    revalidatePath("/dashboard/interviews");
    revalidatePath("/dashboard");

    return {
      success: true,
      interview,
    };
  } catch (error) {
    console.error("Update interview error:", error);

    return {
      success: false,
      error: "Failed to update interview",
    };
  }
}

export async function getInterviewById(interviewId: string) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    return {
      success: false as const,
      error: "Unauthorized",
      interview: null,
    };
  }

  if (!interviewId) {
    return {
      success: false as const,
      error: "Interview ID is required",
      interview: null,
    };
  }

  try {
    const interview = await prisma.interview.findFirst({
      where: {
        id: interviewId,
        application: {
          userId: session.user.id,
        },
      },
    });

    if (!interview) {
      return {
        success: false as const,
        error: "Interview not found",
        interview: null,
      };
    }

    return {
      success: true as const,
      interview,
    };
  } catch (error) {
    console.error("Get interview error:", error);

    return {
      success: false as const,
      error: "Failed to fetch interview",
      interview: null,
    };
  }
}

export async function deleteInterview(interviewId: string) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    return {
      success: false,
      error: "Unauthorized",
    };
  }

  if (!interviewId) {
    return {
      success: false,
      error: "Interview ID is required",
    };
  }

  try {
    const existingInterview = await prisma.interview.findFirst({
      where: {
        id: interviewId,
        application: {
          userId: session.user.id,
        },
      },
      select: {
        id: true,
      },
    });

    if (!existingInterview) {
      return {
        success: false,
        error: "Interview not found",
      };
    }

    await prisma.interview.delete({
      where: {
        id: interviewId,
      },
    });

    revalidatePath("/dashboard/interviews");
    revalidatePath("/dashboard");

    return {
      success: true,
    };
  } catch (error) {
    console.error("Delete interview error:", error);

    return {
      success: false,
      error: "Failed to delete interview",
    };
  }
}

export async function getUpcomingInterviews() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    return {
      success: false,
      error: "Unauthorized",
      interviews: [],
    };
  }

  try {
    const interviews = await prisma.interview.findMany({
      where: {
        scheduledAt: {
          gte: new Date(),
        },
        result: "PENDING",
        application: {
          userId: session.user.id,
        },
      },
      include: {
        application: {
          select: {
            company: true,
            jobTitle: true,
          },
        },
      },
      orderBy: {
        scheduledAt: "asc",
      },
      take: 5,
    });

    return {
      success: true,
      interviews,
    };
  } catch (error) {
    console.error("Get upcoming interviews error:", error);

    return {
      success: false,
      error: "Failed to fetch upcoming interviews",
      interviews: [],
    };
  }
}