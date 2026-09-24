import { getApplications } from "@/lib/actions/application";
import InterviewPrep from "./interview-prep";
import AIAnalyzer from "./ai-analyzer";

export default async function AIPage() {
  const result = await getApplications();

  const applications = result.success ? result.applications : [];

  return (
    <div className="mx-auto max-w-5xl space-y-6">
      <div>
        <h1 className="text-2xl font-bold">AI Tools</h1>

        <p className="mt-1 text-sm text-muted-foreground">
          Analyze job descriptions and prepare for interviews with AI.
        </p>
      </div>

      {applications.length === 0 ? (
        <div className="rounded-xl border border-dashed bg-background p-12 text-center">
          <h2 className="font-semibold">No applications found</h2>

          <p className="mt-2 text-sm text-muted-foreground">
            Create an application before using the AI tools.
          </p>
        </div>
      ) : (
        <div className="space-y-8">
          <AIAnalyzer applications={applications} />

          <InterviewPrep applications={applications} />
        </div>
      )}
    </div>
  );
}