export default function DashboardPage() {
  return (
    <main className="min-h-screen p-6">
      <div className="mx-auto max-w-7xl">
        <h1 className="text-3xl font-bold">Dashboard</h1>

        <p className="mt-2 text-muted-foreground">
          Track your job search from one place.
        </p>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <Stat title="Applications" value="0" />
          <Stat title="Interviews" value="0" />
          <Stat title="Offers" value="0" />
          <Stat title="Response Rate" value="0%" />
        </div>
      </div>
    </main>
  );
}

function Stat({
  title,
  value,
}: {
  title: string;
  value: string;
}) {
  return (
    <div className="rounded-xl border p-6">
      <p className="text-sm text-muted-foreground">{title}</p>
      <p className="mt-2 text-3xl font-bold">{value}</p>
    </div>
  );
}