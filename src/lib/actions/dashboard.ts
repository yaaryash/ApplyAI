"use server";

import { getServerSession } from "next-auth";

import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

type DashboardStats = {
  totalApplications: number;
  interviews: number;
  offers: number;
  responseRate: number;
};

type DashboardStatusCounts = {
  applied: number;
  screening: number;
  interview: number;
  offer: number;
  rejected: number;
  withdrawn: number;
};

type DashboardResult =
  | {
      success: true;
      stats: DashboardStats;
      statusCounts: DashboardStatusCounts;
    }
  | {
      success: false;
      error: string;
      stats: null;
      statusCounts: null;
    };

export async function getDashboardStats(): Promise<DashboardResult> {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    return {
      success: false,
      error: "Unauthorized",
      stats: null,
      statusCounts: null,
    };
  }

  const userId = session.user.id;

  try {
    const [
      totalApplications,
      interviews,
      offers,
      applied,
      screening,
      interviewStatus,
      rejected,
      withdrawn,
    ] = await Promise.all([
      prisma.application.count({
        where: { userId },
      }),

      prisma.interview.count({
        where: {
          application: {
            userId,
          },
        },
      }),

      prisma.application.count({
        where: {
          userId,
          status: "OFFER",
        },
      }),

      prisma.application.count({
        where: {
          userId,
          status: "APPLIED",
        },
      }),

      prisma.application.count({
        where: {
          userId,
          status: "SCREENING",
        },
      }),

      prisma.application.count({
        where: {
          userId,
          status: "INTERVIEW",
        },
      }),

      prisma.application.count({
        where: {
          userId,
          status: "REJECTED",
        },
      }),

      prisma.application.count({
        where: {
          userId,
          status: "WITHDRAWN",
        },
      }),
    ]);

    const respondedApplications =
      screening + interviewStatus + offers + rejected;

    const responseRate =
      totalApplications === 0
        ? 0
        : Math.round(
            (respondedApplications / totalApplications) * 100,
          );

    return {
      success: true,
      stats: {
        totalApplications,
        interviews,
        offers,
        responseRate,
      },
      statusCounts: {
        applied,
        screening,
        interview: interviewStatus,
        offer: offers,
        rejected,
        withdrawn,
      },
    };
  } catch (error) {
    console.error("Dashboard stats error:", error);

    return {
      success: false,
      error: "Failed to fetch dashboard statistics",
      stats: null,
      statusCounts: null,
    };
  }
}