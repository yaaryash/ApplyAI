export default function DashboardPage() {
  return (
    <div className="mx-auto max-w-7xl space-y-8">
      {/* Stats */}
      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard title="Applications" value="0" />
        <StatCard title="Interviews" value="0" />
        <StatCard title="Offers" value="0" />
        <StatCard title="Response Rate" value="0%" />
      </section>

      {/* Overview */}
      <section className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-xl border bg-background p-6">
          <h2 className="text-lg font-semibold">Application Overview</h2>

          <p className="mt-2 text-sm text-muted-foreground">
            Your application activity will appear here once you start adding
            applications.
          </p>

          <div className="mt-6 space-y-4">
            <StatusRow label="Applied" value="0" />
            <StatusRow label="Interview" value="0" />
            <StatusRow label="Offer" value="0" />
            <StatusRow label="Rejected" value="0" />
          </div>
        </div>

        <div className="rounded-xl border bg-background p-6">
          <h2 className="text-lg font-semibold">Upcoming Interviews</h2>

          <div className="mt-6 rounded-lg border border-dashed p-8 text-center">
            <p className="text-sm text-muted-foreground">
              No upcoming interviews.
            </p>
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

        <div className="mt-6 rounded-lg border border-dashed p-10 text-center">
          <p className="text-sm text-muted-foreground">
            No applications yet.
          </p>

          <p className="mt-1 text-xs text-muted-foreground">
            Add your first application to get started.
          </p>
        </div>
      </section>
    </div>
  );
}

function StatCard({
  title,
  value,
}: {
  title: string;
  value: string;
}) {
  return (
    <div className="rounded-xl border bg-background p-6">
      <p className="text-sm text-muted-foreground">{title}</p>

      <p className="mt-2 text-3xl font-bold">{value}</p>
    </div>
  );
}

function StatusRow({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center justify-between border-b pb-3 last:border-0 last:pb-0">
      <span className="text-sm">{label}</span>

      <span className="text-sm font-semibold">{value}</span>
    </div>
  );
}