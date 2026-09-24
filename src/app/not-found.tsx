import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-muted/30 px-6">
      <div className="w-full max-w-md rounded-xl border bg-background p-8 text-center">
        <p className="text-6xl font-bold">404</p>

        <h1 className="mt-4 text-2xl font-semibold">
          Page not found
        </h1>

        <p className="mt-2 text-sm text-muted-foreground">
          The page you are looking for does not exist or may have been moved.
        </p>

        <div className="mt-6 flex justify-center gap-3">
          <Link
            href="/"
            className="rounded-md border px-4 py-2 text-sm font-medium hover:bg-muted"
          >
            Home
          </Link>

          <Link
            href="/dashboard"
            className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:opacity-90"
          >
            Dashboard
          </Link>
        </div>
      </div>
    </main>
  );
}