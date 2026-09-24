export default function DashboardLoading() {
  return (
    <div className="mx-auto max-w-7xl space-y-6">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[1, 2, 3, 4].map((item) => (
          <div
            key={item}
            className="h-28 animate-pulse rounded-xl border bg-muted"
          />
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="h-80 animate-pulse rounded-xl border bg-muted" />
        <div className="h-80 animate-pulse rounded-xl border bg-muted" />
      </div>

      <div className="h-72 animate-pulse rounded-xl border bg-muted" />
    </div>
  );
}