import { getDashboardStats } from "@/lib/actions/dashboard";
import { getApplications } from "@/lib/actions/application";
import { getUpcomingInterviews } from "@/lib/actions/interview";

export default async function DashboardPage() {
  const result = await getDashboardStats();
  const applicationsResult = await getApplications();
  const upcomingInterviewsResult = await getUpcomingInterviews();

  if (!result.success) {
    return (
      <div className="rounded-xl border bg-background p-6">
        <p className="text-sm text-destructive">
          Failed to load dashboard statistics.
        </p>
      </div>
    );
  }
  const stats = result.stats;
  const statusCounts = result.statusCounts;

  return (
    <div className="mx-auto max-w-7xl space-y-8">
      {/* Stats */}
      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Applications"
          value={stats.totalApplications.toString()}
        />

        <StatCard title="Interviews" value={stats.interviews.toString()} />

        <StatCard title="Offers" value={stats.offers.toString()} />

        <StatCard title="Response Rate" value={`${stats.responseRate}%`} />
      </section>

      {/* Application Overview */}
      <section className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-xl border bg-background p-6">
          <h2 className="text-lg font-semibold">Application Overview</h2>

          <p className="mt-2 text-sm text-muted-foreground">
            Track your applications by their current status.
          </p>

          <div className="mt-6 space-y-4">
            <StatusRow label="Applied" value={statusCounts.applied} />
            <StatusRow label="Screening" value={statusCounts.screening} />
            <StatusRow label="Interview" value={statusCounts.interview} />
            <StatusRow label="Offer" value={statusCounts.offer} />
            <StatusRow label="Rejected" value={statusCounts.rejected} />
            <StatusRow label="Withdrawn" value={statusCounts.withdrawn} />
          </div>
        </div>

        {/* Upcoming Interviews */}
        <div className="rounded-xl border bg-background p-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold">Upcoming Interviews</h2>

              <p className="mt-1 text-sm text-muted-foreground">
                Your next scheduled interviews.
              </p>
            </div>

            <a
              href="/dashboard/interviews"
              className="text-sm font-medium underline underline-offset-4"
            >
              View all
            </a>
          </div>

          <div className="mt-6 space-y-4">
            {!upcomingInterviewsResult.success ||
            upcomingInterviewsResult.interviews.length === 0 ? (
              <div className="rounded-lg border border-dashed p-8 text-center">
                <p className="text-sm text-muted-foreground">
                  No upcoming interviews.
                </p>
              </div>
            ) : (
              upcomingInterviewsResult.interviews.map((interview) => (
                <div key={interview.id} className="rounded-lg border p-4">
                  <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <p className="font-medium">{interview.round}</p>

                      <p className="text-sm text-muted-foreground">
                        {interview.application.jobTitle} ·{" "}
                        {interview.application.company}
                      </p>
                    </div>

                    <div className="text-sm font-medium">
                      {formatInterviewDate(interview.scheduledAt)}
                    </div>
                  </div>

                  {interview.interviewer && (
                    <p className="mt-2 text-xs text-muted-foreground">
                      Interviewer: {interview.interviewer}
                    </p>
                  )}
                </div>
              ))
            )}
          </div>
        </div>
      </section>

      {/* Recent Applications */}
      <section className="rounded-xl border bg-background p-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold">Recent Applications</h2>

            <p className="mt-1 text-sm text-muted-foreground">
              Your latest job applications.
            </p>
          </div>
        </div>

        <div className="mt-6 space-y-4">
          {!applicationsResult.success ||
          applicationsResult.applications.length === 0 ? (
            <div className="rounded-lg border border-dashed p-10 text-center">
              <p className="text-sm text-muted-foreground">
                No applications yet.
              </p>

              <p className="mt-1 text-xs text-muted-foreground">
                Add your first application to get started.
              </p>
            </div>
          ) : (
            applicationsResult.applications.slice(0, 5).map((application) => (
              <div
                key={application.id}
                className="flex flex-col gap-3 rounded-lg border p-4 sm:flex-row sm:items-center sm:justify-between"
              >
                <div>
                  <p className="font-medium">{application.jobTitle}</p>

                  <p className="text-sm text-muted-foreground">
                    {application.company}
                  </p>
                </div>

                <div className="flex items-center gap-4">
                  <StatusBadge status={application.status} />

                  <span className="text-xs text-muted-foreground">
                    {formatDate(application.appliedDate)}
                  </span>
                </div>
              </div>
            ))
          )}
        </div>
      </section>
    </div>
  );
}

function StatCard({ title, value }: { title: string; value: string }) {
  return (
    <div className="rounded-xl border bg-background p-6">
      <p className="text-sm text-muted-foreground">{title}</p>

      <p className="mt-2 text-3xl font-bold">{value}</p>
    </div>
  );
}

function StatusRow({ label, value }: { label: string; value: number }) {
  return (
    <div className="flex items-center justify-between border-b pb-3 last:border-0 last:pb-0">
      <span className="text-sm">{label}</span>

      <span className="text-sm font-semibold">{value}</span>
    </div>
  );
}

function StatusBadge({ status }: { status: string }) {
  return (
    <span className="rounded-full border px-2.5 py-1 text-xs font-medium">
      {status.replace("_", " ")}
    </span>
  );
}

function formatDate(date: Date) {
  return new Intl.DateTimeFormat("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(new Date(date));
}

function formatInterviewDate(date: Date) {
  return new Intl.DateTimeFormat("en-IN", {
    day: "numeric",
    month: "short",
    hour: "numeric",
    minute: "2-digit",
  }).format(new Date(date));
}