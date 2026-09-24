"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

import { createApplication } from "@/lib/actions/application";

export default function ApplicationForm() {
  const router = useRouter();

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setError("");
    setLoading(true);

    const formData = new FormData(event.currentTarget);

    const result = await createApplication({
      company: formData.get("company"),
      jobTitle: formData.get("jobTitle"),
      jobUrl: formData.get("jobUrl"),
      location: formData.get("location"),
      salary: formData.get("salary"),
      jobType: formData.get("jobType") || undefined,
      status: formData.get("status") || undefined,
      appliedDate: formData.get("appliedDate") || undefined,
      deadline: formData.get("deadline") || undefined,
      notes: formData.get("notes"),
      resumeUsed: formData.get("resumeUsed"),
    });

    setLoading(false);

    if (!result.success) {
      setError(result.error ?? "Failed to create application");
      return;
    }

    router.push("/dashboard/applications");
    router.refresh();
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid gap-5 md:grid-cols-2">
        <div>
          <label htmlFor="company" className="mb-2 block text-sm font-medium">
            Company *
          </label>

          <input
            id="company"
            name="company"
            required
            placeholder="e.g. Google"
            className="w-full rounded-md border bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring"
          />
        </div>

        <div>
          <label htmlFor="jobTitle" className="mb-2 block text-sm font-medium">
            Job Title *
          </label>

          <input
            id="jobTitle"
            name="jobTitle"
            required
            placeholder="e.g. Frontend Developer"
            className="w-full rounded-md border bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring"
          />
        </div>

        <div>
          <label htmlFor="jobUrl" className="mb-2 block text-sm font-medium">
            Job URL
          </label>

          <input
            id="jobUrl"
            name="jobUrl"
            type="url"
            placeholder="https://..."
            className="w-full rounded-md border bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring"
          />
        </div>

        <div>
          <label htmlFor="location" className="mb-2 block text-sm font-medium">
            Location
          </label>

          <input
            id="location"
            name="location"
            placeholder="e.g. Pune / Remote"
            className="w-full rounded-md border bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring"
          />
        </div>

        <div>
          <label htmlFor="salary" className="mb-2 block text-sm font-medium">
            Salary
          </label>

          <input
            id="salary"
            name="salary"
            placeholder="e.g. ₹8-12 LPA"
            className="w-full rounded-md border bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring"
          />
        </div>

        <div>
          <label htmlFor="jobType" className="mb-2 block text-sm font-medium">
            Job Type
          </label>

          <select
            id="jobType"
            name="jobType"
            defaultValue=""
            className="w-full rounded-md border bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring"
          >
            <option value="">Select job type</option>
            <option value="FULL_TIME">Full Time</option>
            <option value="PART_TIME">Part Time</option>
            <option value="CONTRACT">Contract</option>
            <option value="INTERNSHIP">Internship</option>
          </select>
        </div>

        <div>
          <label htmlFor="status" className="mb-2 block text-sm font-medium">
            Status
          </label>

          <select
            id="status"
            name="status"
            defaultValue="APPLIED"
            className="w-full rounded-md border bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring"
          >
            <option value="APPLIED">Applied</option>
            <option value="SCREENING">Screening</option>
            <option value="INTERVIEW">Interview</option>
            <option value="OFFER">Offer</option>
            <option value="REJECTED">Rejected</option>
            <option value="WITHDRAWN">Withdrawn</option>
          </select>
        </div>

        <div>
          <label
            htmlFor="appliedDate"
            className="mb-2 block text-sm font-medium"
          >
            Applied Date
          </label>

          <input
            id="appliedDate"
            name="appliedDate"
            type="date"
            className="w-full rounded-md border bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring"
          />
        </div>

        <div>
          <label htmlFor="deadline" className="mb-2 block text-sm font-medium">
            Application Deadline
          </label>

          <input
            id="deadline"
            name="deadline"
            type="date"
            className="w-full rounded-md border bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring"
          />
        </div>

        <div>
          <label
            htmlFor="resumeUsed"
            className="mb-2 block text-sm font-medium"
          >
            Resume Used
          </label>

          <input
            id="resumeUsed"
            name="resumeUsed"
            placeholder="e.g. Frontend Resume v2"
            className="w-full rounded-md border bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring"
          />
        </div>
      </div>

      <div>
        <label htmlFor="notes" className="mb-2 block text-sm font-medium">
          Notes
        </label>

        <textarea
          id="notes"
          name="notes"
          rows={4}
          placeholder="Add notes about this application..."
          className="w-full rounded-md border bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring"
        />
      </div>

      {error && (
        <p className="rounded-md border border-destructive/30 bg-destructive/5 px-3 py-2 text-sm text-destructive">
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={loading}
        className="rounded-md bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {loading ? "Saving..." : "Save Application"}
      </button>
    </form>
  );
}
