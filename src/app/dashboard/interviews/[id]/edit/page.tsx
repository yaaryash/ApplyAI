import Link from "next/link";
import { notFound } from "next/navigation";

import { getApplications } from "@/lib/actions/application";
import { getInterviewById } from "@/lib/actions/interview";
import EditInterviewForm from "../../edit-interview-form";

export default async function EditInterviewPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const [interviewResult, applicationsResult] = await Promise.all([
    getInterviewById(id),
    getApplications(),
  ]);

  if (!interviewResult.success) {
    notFound();
  }
  const interview = interviewResult.interview;

  const applications = applicationsResult.success
    ? applicationsResult.applications
    : [];

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <div>
        <Link
          href="/dashboard/interviews"
          className="text-sm text-muted-foreground hover:text-foreground"
        >
          ← Back to interviews
        </Link>

        <h1 className="mt-4 text-2xl font-bold">Edit Interview</h1>

        <p className="mt-1 text-sm text-muted-foreground">
          Update your interview details.
        </p>
      </div>

      <EditInterviewForm interview={interview} applications={applications} />
    </div>
  );
}
