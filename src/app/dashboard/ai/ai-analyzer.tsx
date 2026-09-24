"use client";

import { FormEvent, useState } from "react";

import { analyzeJobDescription } from "@/lib/actions/ai-analysis";

type Application = {
  id: string;
  company: string;
  jobTitle: string;
};

type Analysis = {
  matchScore: number | null;
  summary: string | null;
  strengths: string | null;
  missingSkills: string | null;
  recommendations: string | null;
};

export default function AIAnalyzer({
  applications,
}: {
  applications: Application[];
}) {
  const [applicationId, setApplicationId] = useState("");
  const [jobDescription, setJobDescription] = useState("");

  const [analysis, setAnalysis] = useState<Analysis | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setError("");
    setAnalysis(null);
    setLoading(true);

    const result = await analyzeJobDescription(
      applicationId,
      jobDescription,
    );

    setLoading(false);

    if (!result.success) {
      setError(result.error ?? "Failed to analyze job description");
      return;
    }

    setAnalysis(result.analysis);
  }

  return (
    <div className="space-y-8">
      {/* Analyzer Form */}
      <form
        onSubmit={handleSubmit}
        className="rounded-xl border bg-background p-6"
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

        <div className="mt-6">
          <label
            htmlFor="jobDescription"
            className="mb-2 block text-sm font-medium"
          >
            Job Description
          </label>

          <textarea
            id="jobDescription"
            required
            rows={12}
            maxLength={15000}
            value={jobDescription}
            onChange={(event) => setJobDescription(event.target.value)}
            placeholder="Paste the complete job description here..."
            className="w-full resize-y rounded-md border bg-background px-3 py-3 text-sm outline-none focus:ring-2 focus:ring-ring"
          />

          <p className="mt-2 text-xs text-muted-foreground">
            {jobDescription.length}/15000 characters
          </p>
        </div>

        {error && (
          <p className="mt-4 rounded-md border border-destructive/30 bg-destructive/5 px-3 py-2 text-sm text-destructive">
            {error}
          </p>
        )}

        <button
          type="submit"
          disabled={loading || !applicationId || !jobDescription.trim()}
          className="mt-6 rounded-md bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {loading ? "Analyzing..." : "Analyze Job"}
        </button>
      </form>

      {/* Analysis Result */}
      {analysis && <AnalysisResult analysis={analysis} />}
    </div>
  );
}

function AnalysisResult({ analysis }: { analysis: Analysis }) {
  const strengths = parseArray(analysis.strengths);
  const missingSkills = parseArray(analysis.missingSkills);
  const recommendations = parseArray(analysis.recommendations);

  return (
    <section className="space-y-6">
      {/* Match Score */}
      <div className="rounded-xl border bg-background p-6">
        <p className="text-sm text-muted-foreground">Match Score</p>

        <div className="mt-2 flex items-end gap-2">
          <span className="text-5xl font-bold">
            {analysis.matchScore ?? 0}
          </span>

          <span className="mb-2 text-lg text-muted-foreground">
            / 100
          </span>
        </div>
      </div>

      {/* Summary */}
      <div className="rounded-xl border bg-background p-6">
        <h2 className="text-lg font-semibold">Summary</h2>

        <p className="mt-3 text-sm leading-6 text-muted-foreground">
          {analysis.summary || "No summary available."}
        </p>
      </div>

      {/* Strengths / Missing Skills */}
      <div className="grid gap-6 lg:grid-cols-2">
        <AnalysisList
          title="Matching Strengths"
          items={strengths}
          emptyText="No matching strengths identified."
        />

        <AnalysisList
          title="Missing Skills"
          items={missingSkills}
          emptyText="No missing skills identified."
        />
      </div>

      {/* Recommendations */}
      <AnalysisList
        title="Recommendations"
        items={recommendations}
        emptyText="No recommendations available."
      />
    </section>
  );
}

function AnalysisList({
  title,
  items,
  emptyText,
}: {
  title: string;
  items: string[];
  emptyText: string;
}) {
  return (
    <div className="rounded-xl border bg-background p-6">
      <h2 className="text-lg font-semibold">{title}</h2>

      {items.length === 0 ? (
        <p className="mt-3 text-sm text-muted-foreground">
          {emptyText}
        </p>
      ) : (
        <ul className="mt-4 space-y-3">
          {items.map((item, index) => (
            <li
              key={`${item}-${index}`}
              className="rounded-md border p-3 text-sm"
            >
              {item}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function parseArray(value: string | null): string[] {
  if (!value) {
    return [];
  }

  try {
    const parsed = JSON.parse(value);

    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}