"use server";

import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";

import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { applicationSchema } from "@/lib/validations/application";

export async function createApplication(input: unknown) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    return {
      success: false,
      error: "Unauthorized",
    };
  }

  const result = applicationSchema.safeParse(input);

  if (!result.success) {
    return {
      success: false,
      error: "Invalid application data",
      fields: result.error.flatten().fieldErrors,
    };
  }

  const data = result.data;

  try {
    const application = await prisma.application.create({
      data: {
        userId: session.user.id,

        company: data.company,
        jobTitle: data.jobTitle,
        jobUrl: data.jobUrl || null,
        location: data.location || null,
        salary: data.salary || null,
        jobType: data.jobType ?? null,
        status: data.status ?? "APPLIED",
        appliedDate: data.appliedDate ?? new Date(),
        deadline: data.deadline ?? null,
        notes: data.notes || null,
        resumeUsed: data.resumeUsed || null,
      },
    });

    revalidatePath("/dashboard");
    revalidatePath("/dashboard/applications");

    return {
      success: true,
      application,
    };
  } catch (error) {
    console.error("Create application error:", error);

    return {
      success: false,
      error: "Failed to create application",
    };
  }
}

export async function getApplications() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    return {
      success: false,
      error: "Unauthorized",
      applications: [],
    };
  }

  try {
    const applications = await prisma.application.findMany({
      where: {
        userId: session.user.id,
      },
      orderBy: {
        appliedDate: "desc",
      },
    });

    return {
      success: true,
      applications,
    };
  } catch (error) {
    console.error("Get applications error:", error);

    return {
      success: false,
      error: "Failed to fetch applications",
      applications: [],
    };
  }
}

export async function deleteApplication(applicationId: string) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    return {
      success: false,
      error: "Unauthorized",
    };
  }

  if (!applicationId) {
    return {
      success: false,
      error: "Application ID is required",
    };
  }

  try {
    const application = await prisma.application.findUnique({
      where: {
        id: applicationId,
      },
      select: {
        id: true,
        userId: true,
      },
    });

    if (!application) {
      return {
        success: false,
        error: "Application not found",
      };
    }

    if (application.userId !== session.user.id) {
      return {
        success: false,
        error: "Forbidden",
      };
    }

    await prisma.application.delete({
      where: {
        id: applicationId,
      },
    });

    revalidatePath("/dashboard/applications");
    revalidatePath("/dashboard");

    return {
      success: true,
    };
  } catch (error) {
    console.error("Delete application error:", error);

    return {
      success: false,
      error: "Failed to delete application",
    };
  }
}

export async function updateApplication(
  applicationId: string,
  input: unknown,
) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    return {
      success: false,
      error: "Unauthorized",
    };
  }

  if (!applicationId) {
    return {
      success: false,
      error: "Application ID is required",
    };
  }

  const result = applicationSchema.safeParse(input);

  if (!result.success) {
    return {
      success: false,
      error: "Invalid application data",
      fields: result.error.flatten().fieldErrors,
    };
  }

  try {
    const application = await prisma.application.findUnique({
      where: {
        id: applicationId,
      },
      select: {
        id: true,
        userId: true,
      },
    });

    if (!application) {
      return {
        success: false,
        error: "Application not found",
      };
    }

    if (application.userId !== session.user.id) {
      return {
        success: false,
        error: "Forbidden",
      };
    }

    const data = result.data;

    const updatedApplication = await prisma.application.update({
      where: {
        id: applicationId,
      },
      data: {
        company: data.company,
        jobTitle: data.jobTitle,
        jobUrl: data.jobUrl || null,
        location: data.location || null,
        salary: data.salary || null,
        jobType: data.jobType ?? null,
        status: data.status ?? "APPLIED",
        appliedDate: data.appliedDate ?? new Date(),
        deadline: data.deadline ?? null,
        notes: data.notes || null,
        resumeUsed: data.resumeUsed || null,
      },
    });

    revalidatePath("/dashboard/applications");
    revalidatePath("/dashboard");

    return {
      success: true,
      application: updatedApplication,
    };
  } catch (error) {
    console.error("Update application error:", error);

    return {
      success: false,
      error: "Failed to update application",
    };
  }
}