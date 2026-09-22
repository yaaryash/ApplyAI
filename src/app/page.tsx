import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <section className="mx-auto flex min-h-screen max-w-6xl flex-col items-center justify-center px-6 text-center">
        <div className="mb-6 rounded-full border px-4 py-2 text-sm text-muted-foreground">
          AI-powered job search workspace
        </div>

        <h1 className="max-w-4xl text-5xl font-bold tracking-tight sm:text-6xl">
          Manage your job search.
          <span className="block text-muted-foreground">
            Prepare smarter with AI.
          </span>
        </h1>

        <p className="mt-6 max-w-2xl text-lg text-muted-foreground">
          ApplyAI helps you track applications, manage interviews, analyze job
          descriptions, and prepare for interviews in one place.
        </p>

        <div className="mt-8 flex gap-4">
          <Link
            href="/dashboard"
            className="rounded-md bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition hover:opacity-90"
          >
            Get Started
          </Link>

          <a
            href="#features"
            className="rounded-md border px-6 py-3 text-sm font-medium transition hover:bg-muted"
          >
            Explore Features
          </a>
        </div>
      </section>

      <section
        id="features"
        className="border-t px-6 py-20"
      >
        <div className="mx-auto max-w-6xl">
          <h2 className="text-3xl font-bold">Everything for your job search</h2>

          <div className="mt-10 grid gap-6 md:grid-cols-3">
            <Feature
              title="Application Tracking"
              description="Keep all your job applications organized and track their progress."
            />

            <Feature
              title="Interview Management"
              description="Track interview rounds, schedules, notes, and outcomes."
            />

            <Feature
              title="AI Assistance"
              description="Analyze job descriptions and prepare for interviews with AI."
            />
          </div>
        </div>
      </section>
    </main>
  );
}

function Feature({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="rounded-xl border p-6">
      <h3 className="text-xl font-semibold">{title}</h3>
      <p className="mt-3 text-sm leading-6 text-muted-foreground">
        {description}
      </p>
    </div>
  );
}