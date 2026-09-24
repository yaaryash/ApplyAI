import Link from "next/link";

import { getApplications } from "@/lib/actions/application";
import InterviewForm from "../interview-form";

export default async function NewInterviewPage() {
  const result = await getApplications();

  const applications = result.success ? result.applications : [];

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <div>
        <Link
          href="/dashboard/interviews"
          className="text-sm text-muted-foreground hover:text-foreground"
        >
          ← Back to interviews
        </Link>

        <h1 className="mt-4 text-2xl font-bold">Add Interview</h1>

        <p className="mt-1 text-sm text-muted-foreground">
          Add an interview for one of your job applications.
        </p>
      </div>

      {applications.length === 0 ? (
        <div className="rounded-xl border border-dashed bg-background p-8 text-center">
          <h2 className="font-semibold">No applications found</h2>

          <p className="mt-2 text-sm text-muted-foreground">
            Create a job application before adding an interview.
          </p>

          <Link
            href="/dashboard/applications/new"
            className="mt-5 inline-block rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:opacity-90"
          >
            Add Application
          </Link>
        </div>
      ) : (
        <InterviewForm applications={applications} />
      )}
    </div>
  );
}