import Link from "next/link";

import { getApplications } from "@/lib/actions/application";
import DeleteButton from "./delete-button";

export default async function ApplicationsPage() {
  const result = await getApplications();

  if (!result.success) {
    return (
      <div className="mx-auto max-w-7xl">
        <div className="rounded-xl border border-destructive/30 bg-destructive/5 p-6">
          <h1 className="font-semibold text-destructive">
            Failed to load applications
          </h1>

          <p className="mt-2 text-sm text-muted-foreground">{result.error}</p>
        </div>
      </div>
    );
  }

  const applications = result.applications;

  return (
    <div className="mx-auto max-w-7xl space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold">Applications</h1>

          <p className="mt-1 text-sm text-muted-foreground">
            Manage and track your job applications.
          </p>
        </div>

        <Link
          href="/dashboard/applications/new"
          className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:opacity-90"
        >
          + Add Application
        </Link>
      </div>

      <div className="rounded-xl border bg-background">
        <div className="border-b p-6">
          <h2 className="font-semibold">Your Applications</h2>

          <p className="mt-1 text-sm text-muted-foreground">
            {applications.length} application
            {applications.length !== 1 ? "s" : ""}
          </p>
        </div>

        {applications.length === 0 ? (
          <div className="p-10 text-center">
            <p className="font-medium">No applications yet</p>

            <p className="mt-1 text-sm text-muted-foreground">
              Add your first application to get started.
            </p>
          </div>
        ) : (
          <div className="divide-y">
            {applications.map((application) => (
              <ApplicationRow key={application.id} application={application} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function ApplicationRow({
  application,
}: {
  application: {
    id: string;
    company: string;
    jobTitle: string;
    location: string | null;
    status: string;
    appliedDate: Date;
  };
}) {
  return (
    <div className="flex flex-col gap-4 p-6 md:flex-row md:items-center md:justify-between">
      <div>
        <h3 className="font-semibold">{application.jobTitle}</h3>

        <p className="mt-1 text-sm text-muted-foreground">
          {application.company}
          {application.location ? ` · ${application.location}` : ""}
        </p>

        <p className="mt-2 text-xs text-muted-foreground">
          Applied {formatDate(application.appliedDate)}
        </p>
      </div>

      <div className="flex items-center gap-3">
        <StatusBadge status={application.status} />

        <button
          type="button"
          className="rounded-md border px-3 py-2 text-sm hover:bg-muted"
        >
          Edit
        </button>

        <DeleteButton applicationId={application.id} />
      </div>
    </div>
  );
}

function StatusBadge({ status }: { status: string }) {
  const label = status
    .toLowerCase()
    .replace("_", " ")
    .replace(/\b\w/g, (letter) => letter.toUpperCase());

  return (
    <span className="rounded-full border px-3 py-1 text-xs font-medium">
      {label}
    </span>
  );
}

function formatDate(date: Date) {
  return new Intl.DateTimeFormat("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(date);
}
