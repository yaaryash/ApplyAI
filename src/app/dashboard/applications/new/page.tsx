import Link from "next/link";

import ApplicationForm from "../application-form";

export default function NewApplicationPage() {
  return (
    <div className="mx-auto max-w-4xl space-y-6">
      <div>
        <Link
          href="/dashboard/applications"
          className="text-sm text-muted-foreground hover:text-foreground"
        >
          ← Back to applications
        </Link>

        <h1 className="mt-4 text-2xl font-bold">
          Add Application
        </h1>

        <p className="mt-1 text-sm text-muted-foreground">
          Add a job application to your ApplyAI workspace.
        </p>
      </div>

      <div className="rounded-xl border bg-background p-6">
        <ApplicationForm />
      </div>
    </div>
  );
}