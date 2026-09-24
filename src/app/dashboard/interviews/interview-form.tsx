"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

import { createInterview } from "@/lib/actions/interview";

type Application = {
  id: string;
  company: string;
  jobTitle: string;
};

export default function InterviewForm({
  applications,
}: {
  applications: Application[];
}) {
  const router = useRouter();

  const [applicationId, setApplicationId] = useState("");
  const [round, setRound] = useState("");
  const [scheduledAt, setScheduledAt] = useState("");
  const [interviewer, setInterviewer] = useState("");
  const [meetingUrl, setMeetingUrl] = useState("");
  const [result, setResult] = useState("PENDING");
  const [notes, setNotes] = useState("");

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setError("");
    setLoading(true);

    const response = await createInterview({
      applicationId,
      round,
      scheduledAt,
      interviewer,
      meetingUrl,
      result,
      notes,
    });

    setLoading(false);

    if (!response.success) {
      setError(response.error ?? "Failed to create interview");
      return;
    }

    router.push("/dashboard/interviews");
    router.refresh();
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 rounded-xl border bg-background p-6"
    >
      <div>
        <label
          htmlFor="application"
          className="mb-2 block text-sm font-medium"
        >
          Application
        </label>

        <select
          id="application"
          required
          value={applicationId}
          onChange={(event) => setApplicationId(event.target.value)}
          className="w-full rounded-md border bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring"
        >
          <option value="">Select application</option>

          {applications.map((application) => (
            <option key={application.id} value={application.id}>
              {application.jobTitle} — {application.company}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="round" className="mb-2 block text-sm font-medium">
          Interview Round
        </label>

        <input
          id="round"
          required
          value={round}
          onChange={(event) => setRound(event.target.value)}
          placeholder="Technical Interview"
          className="w-full rounded-md border bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring"
        />
      </div>

      <div>
        <label
          htmlFor="scheduledAt"
          className="mb-2 block text-sm font-medium"
        >
          Date & Time
        </label>

        <input
          id="scheduledAt"
          type="datetime-local"
          required
          value={scheduledAt}
          onChange={(event) => setScheduledAt(event.target.value)}
          className="w-full rounded-md border bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring"
        />
      </div>

      <div>
        <label
          htmlFor="interviewer"
          className="mb-2 block text-sm font-medium"
        >
          Interviewer
        </label>

        <input
          id="interviewer"
          value={interviewer}
          onChange={(event) => setInterviewer(event.target.value)}
          placeholder="John Doe"
          className="w-full rounded-md border bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring"
        />
      </div>

      <div>
        <label
          htmlFor="meetingUrl"
          className="mb-2 block text-sm font-medium"
        >
          Meeting URL
        </label>

        <input
          id="meetingUrl"
          type="url"
          value={meetingUrl}
          onChange={(event) => setMeetingUrl(event.target.value)}
          placeholder="https://meet.google.com/..."
          className="w-full rounded-md border bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring"
        />
      </div>

      <div>
        <label htmlFor="result" className="mb-2 block text-sm font-medium">
          Result
        </label>

        <select
          id="result"
          value={result}
          onChange={(event) => setResult(event.target.value)}
          className="w-full rounded-md border bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring"
        >
          <option value="PENDING">Pending</option>
          <option value="PASSED">Passed</option>
          <option value="FAILED">Failed</option>
        </select>
      </div>

      <div>
        <label htmlFor="notes" className="mb-2 block text-sm font-medium">
          Notes
        </label>

        <textarea
          id="notes"
          value={notes}
          onChange={(event) => setNotes(event.target.value)}
          rows={5}
          placeholder="Interview preparation notes..."
          className="w-full resize-none rounded-md border bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring"
        />
      </div>

      {error && (
        <p className="rounded-md border border-destructive/30 bg-destructive/5 px-3 py-2 text-sm text-destructive">
          {error}
        </p>
      )}

      <div className="flex gap-3">
        <button
          type="submit"
          disabled={loading}
          className="rounded-md bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {loading ? "Creating..." : "Create Interview"}
        </button>

        <button
          type="button"
          onClick={() => router.back()}
          className="rounded-md border px-5 py-2.5 text-sm font-medium hover:bg-muted"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}