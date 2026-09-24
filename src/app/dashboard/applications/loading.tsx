export default function ApplicationsLoading() {
  return (
    <div className="mx-auto max-w-7xl space-y-6">
      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <div className="h-7 w-48 animate-pulse rounded-md bg-muted" />
          <div className="h-4 w-72 animate-pulse rounded-md bg-muted" />
        </div>

        <div className="h-10 w-36 animate-pulse rounded-md bg-muted" />
      </div>

      <div className="space-y-4">
        {[1, 2, 3, 4, 5].map((item) => (
          <div
            key={item}
            className="h-28 animate-pulse rounded-xl border bg-muted"
          />
        ))}
      </div>
    </div>
  );
}