import Link from "next/link";

import { getInterviews } from "@/lib/actions/interview";
import DeleteInterviewButton from "./delete-interview-button";

export default async function InterviewsPage() {
  const result = await getInterviews();

  if (!result.success) {
    return (
      <div className="rounded-xl border bg-background p-6">
        <p className="text-sm text-destructive">Failed to load interviews.</p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold">Interviews</h1>

          <p className="mt-1 text-sm text-muted-foreground">
            Track your upcoming and completed interviews.
          </p>
        </div>

        <Link
          href="/dashboard/interviews/new"
          className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:opacity-90"
        >
          Add Interview
        </Link>
      </div>

      {/* Empty State / Interview List */}
      {result.interviews.length === 0 ? (
        <div className="rounded-xl border border-dashed bg-background p-12 text-center">
          <h2 className="font-semibold">No interviews yet</h2>

          <p className="mt-2 text-sm text-muted-foreground">
            Add an interview to start tracking your interview process.
          </p>

          <Link
            href="/dashboard/interviews/new"
            className="mt-6 inline-block rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:opacity-90"
          >
            Add Interview
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {result.interviews.map((interview) => (
            <InterviewCard
              key={interview.id}
              id={interview.id}
              round={interview.round}
              scheduledAt={interview.scheduledAt}
              interviewer={interview.interviewer}
              meetingUrl={interview.meetingUrl}
              result={interview.result}
              company={interview.application.company}
              jobTitle={interview.application.jobTitle}
            />
          ))}
        </div>
      )}
    </div>
  );
}

function InterviewCard({
  id,
  round,
  scheduledAt,
  interviewer,
  meetingUrl,
  result,
  company,
  jobTitle,
}: {
  id: string;
  round: string;
  scheduledAt: Date;
  interviewer: string | null;
  meetingUrl: string | null;
  result: string;
  company: string;
  jobTitle: string;
}) {
  return (
    <div className="rounded-xl border bg-background p-6">
      {/* Interview Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h2 className="font-semibold">{round}</h2>

          <p className="mt-1 text-sm text-muted-foreground">
            {jobTitle} · {company}
          </p>
        </div>

        <div className="flex items-center gap-3">
          <ResultBadge result={result} />

          <Link
            href={`/dashboard/interviews/${id}/edit`}
            className="rounded-md border px-3 py-1.5 text-xs font-medium hover:bg-muted"
          >
            Edit
          </Link>

          <DeleteInterviewButton interviewId={id} />
        </div>
      </div>

      {/* Interview Details */}
      <div className="mt-5 grid gap-4 text-sm sm:grid-cols-3">
        <div>
          <p className="text-muted-foreground">Scheduled</p>

          <p className="mt-1 font-medium">{formatDate(scheduledAt)}</p>
        </div>

        <div>
          <p className="text-muted-foreground">Interviewer</p>

          <p className="mt-1 font-medium">{interviewer || "Not specified"}</p>
        </div>

        <div>
          <p className="text-muted-foreground">Meeting</p>

          {meetingUrl ? (
            <a
              href={meetingUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-1 inline-block font-medium underline underline-offset-4"
            >
              Join meeting
            </a>
          ) : (
            <p className="mt-1 font-medium">Not specified</p>
          )}
        </div>
      </div>
    </div>
  );
}

function ResultBadge({ result }: { result: string }) {
  return (
    <span className="rounded-full border px-3 py-1 text-xs font-medium">
      {result}
    </span>
  );
}

function formatDate(date: Date) {
  return new Intl.DateTimeFormat("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  }).format(new Date(date));
}
