"use client";

import { useState } from "react";

type ApplicationStatus =
  | "Applied"
  | "Interview"
  | "Offer"
  | "Rejected";

type Application = {
  id: number;
  company: string;
  role: string;
  location: string;
  status: ApplicationStatus;
  appliedDate: string;
};

const initialApplications: Application[] = [
  {
    id: 1,
    company: "Example Technologies",
    role: "Frontend Developer",
    location: "Remote",
    status: "Applied",
    appliedDate: "Sep 22, 2026",
  },
  {
    id: 2,
    company: "Tech Solutions",
    role: "React Developer",
    location: "Pune",
    status: "Interview",
    appliedDate: "Sep 20, 2026",
  },
];

export default function ApplicationsPage() {
  const [applications, setApplications] =
    useState<Application[]>(initialApplications);

  const [search, setSearch] = useState("");

  const filteredApplications = applications.filter((application) => {
    const query = search.toLowerCase();

    return (
      application.company.toLowerCase().includes(query) ||
      application.role.toLowerCase().includes(query)
    );
  });

  function handleDelete(id: number) {
    setApplications((current) =>
      current.filter((application) => application.id !== id),
    );
  }

  return (
    <div className="mx-auto max-w-7xl space-y-6">
      {/* Page Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold">Applications</h1>

          <p className="mt-1 text-sm text-muted-foreground">
            Manage and track your job applications.
          </p>
        </div>

        <button
          type="button"
          className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:opacity-90"
        >
          + Add Application
        </button>
      </div>

      {/* Search */}
      <div className="rounded-xl border bg-background p-4">
        <input
          type="search"
          placeholder="Search company or role..."
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          className="w-full rounded-md border bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring"
        />
      </div>

      {/* Applications */}
      <div className="rounded-xl border bg-background">
        <div className="border-b p-6">
          <h2 className="font-semibold">Your Applications</h2>

          <p className="mt-1 text-sm text-muted-foreground">
            {filteredApplications.length} application
            {filteredApplications.length !== 1 ? "s" : ""}
          </p>
        </div>

        {filteredApplications.length === 0 ? (
          <div className="p-10 text-center">
            <p className="font-medium">No applications found</p>

            <p className="mt-1 text-sm text-muted-foreground">
              Try a different search or add a new application.
            </p>
          </div>
        ) : (
          <div className="divide-y">
            {filteredApplications.map((application) => (
              <ApplicationRow
                key={application.id}
                application={application}
                onDelete={handleDelete}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function ApplicationRow({
  application,
  onDelete,
}: {
  application: Application;
  onDelete: (id: number) => void;
}) {
  return (
    <div className="flex flex-col gap-4 p-6 md:flex-row md:items-center md:justify-between">
      <div>
        <h3 className="font-semibold">{application.role}</h3>

        <p className="mt-1 text-sm text-muted-foreground">
          {application.company} · {application.location}
        </p>

        <p className="mt-2 text-xs text-muted-foreground">
          Applied {application.appliedDate}
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

        <button
          type="button"
          onClick={() => onDelete(application.id)}
          className="rounded-md border px-3 py-2 text-sm text-destructive hover:bg-muted"
        >
          Delete
        </button>
      </div>
    </div>
  );
}

function StatusBadge({ status }: { status: ApplicationStatus }) {
  return (
    <span className="rounded-full border px-3 py-1 text-xs font-medium">
      {status}
    </span>
  );
}