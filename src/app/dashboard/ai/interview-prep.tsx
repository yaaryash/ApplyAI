"use client";

import { useState } from "react";
import { generateInterviewPreparation } from "@/lib/actions/ai-interview";

type Application = {
  id: string;
  company: string;
  jobTitle: string;
};

type Preparation = {
  overview: string;
  technicalQuestions: {
    question: string;
    answerPoints: string[];
  }[];
  behavioralQuestions: {
    question: string;
    answerPoints: string[];
  }[];
  topicsToRevise: string[];
  preparationTips: string[];
};

export default function InterviewPrep({
  applications,
}: {
  applications: Application[];
}) {
  const [applicationId, setApplicationId] = useState("");
  const [interviewRound, setInterviewRound] = useState("Technical Interview");
  const [preparation, setPreparation] = useState<Preparation | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleGenerate() {
    setError("");
    setPreparation(null);

    if (!applicationId) {
      setError("Please select an application.");
      return;
    }

    setLoading(true);

    const result = await generateInterviewPreparation(
      applicationId,
      interviewRound,
    );

    setLoading(false);

    if (!result.success) {
      setError(result.error);
      return;
    }

    setPreparation(result.preparation);
  }

  return (
    <div className="space-y-6">
      <div className="rounded-xl border bg-background p-6">
        <h2 className="text-lg font-semibold">
          AI Interview Preparation
        </h2>

        <p className="mt-1 text-sm text-muted-foreground">
          Generate interview questions and preparation guidance for a job.
        </p>

        <div className="mt-6 grid gap-4">
          <div>
            <label className="text-sm font-medium">
              Application
            </label>

            <select
              value={applicationId}
              onChange={(e) => setApplicationId(e.target.value)}
              className="mt-2 w-full rounded-md border bg-background px-3 py-2 text-sm"
            >
              <option value="">Select an application</option>

              {applications.map((application) => (
                <option key={application.id} value={application.id}>
                  {application.jobTitle} · {application.company}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="text-sm font-medium">
              Interview Round
            </label>

            <select
              value={interviewRound}
              onChange={(e) => setInterviewRound(e.target.value)}
              className="mt-2 w-full rounded-md border bg-background px-3 py-2 text-sm"
            >
              <option>Technical Interview</option>
              <option>HR Interview</option>
              <option>Behavioral Interview</option>
              <option>System Design</option>
              <option>Managerial Interview</option>
              <option>Final Interview</option>
            </select>
          </div>

          <button
            type="button"
            onClick={handleGenerate}
            disabled={loading}
            className="w-fit rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading ? "Generating..." : "Generate Preparation"}
          </button>

          {error && (
            <p className="text-sm text-destructive">
              {error}
            </p>
          )}
        </div>
      </div>

      {preparation && (
        <div className="space-y-6">
          <section className="rounded-xl border bg-background p-6">
            <h2 className="text-lg font-semibold">
              Preparation Overview
            </h2>

            <p className="mt-3 text-sm leading-6 text-muted-foreground">
              {preparation.overview}
            </p>
          </section>

          <QuestionSection
            title="Technical Questions"
            questions={preparation.technicalQuestions}
          />

          <QuestionSection
            title="Behavioral Questions"
            questions={preparation.behavioralQuestions}
          />

          <section className="rounded-xl border bg-background p-6">
            <h2 className="text-lg font-semibold">
              Topics to Revise
            </h2>

            <ul className="mt-4 space-y-2">
              {preparation.topicsToRevise.map((topic) => (
                <li
                  key={topic}
                  className="rounded-md border px-3 py-2 text-sm"
                >
                  {topic}
                </li>
              ))}
            </ul>
          </section>

          <section className="rounded-xl border bg-background p-6">
            <h2 className="text-lg font-semibold">
              Preparation Tips
            </h2>

            <ul className="mt-4 space-y-2">
              {preparation.preparationTips.map((tip) => (
                <li
                  key={tip}
                  className="rounded-md border px-3 py-2 text-sm"
                >
                  {tip}
                </li>
              ))}
            </ul>
          </section>
        </div>
      )}
    </div>
  );
}

function QuestionSection({
  title,
  questions,
}: {
  title: string;
  questions: {
    question: string;
    answerPoints: string[];
  }[];
}) {
  return (
    <section className="rounded-xl border bg-background p-6">
      <h2 className="text-lg font-semibold">{title}</h2>

      <div className="mt-4 space-y-4">
        {questions.map((item, index) => (
          <div
            key={`${item.question}-${index}`}
            className="rounded-lg border p-4"
          >
            <p className="font-medium">
              {index + 1}. {item.question}
            </p>

            <ul className="mt-3 space-y-1 pl-5 text-sm text-muted-foreground">
              {item.answerPoints.map((point) => (
                <li key={point} className="list-disc">
                  {point}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}