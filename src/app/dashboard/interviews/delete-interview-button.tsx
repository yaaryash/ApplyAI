"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { deleteInterview } from "@/lib/actions/interview";

export default function DeleteInterviewButton({
  interviewId,
}: {
  interviewId: string;
}) {
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  async function handleDelete() {
    const confirmed = window.confirm(
      "Are you sure you want to delete this interview?",
    );

    if (!confirmed) {
      return;
    }

    setLoading(true);

    const result = await deleteInterview(interviewId);

    setLoading(false);

    if (!result.success) {
      window.alert(result.error ?? "Failed to delete interview");
      return;
    }

    router.refresh();
  }

  return (
    <button
      type="button"
      onClick={handleDelete}
      disabled={loading}
      className="rounded-md border border-destructive/30 px-3 py-1.5 text-xs font-medium text-destructive hover:bg-destructive/5 disabled:cursor-not-allowed disabled:opacity-50"
    >
      {loading ? "Deleting..." : "Delete"}
    </button>
  );
}