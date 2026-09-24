"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { deleteApplication } from "@/lib/actions/application";

export default function DeleteButton({
  applicationId,
}: {
  applicationId: string;
}) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function handleDelete() {
    const confirmed = window.confirm(
      "Are you sure you want to delete this application?",
    );

    if (!confirmed) {
      return;
    }

    setLoading(true);

    const result = await deleteApplication(applicationId);

    setLoading(false);

    if (!result.success) {
      window.alert(result.error);
      return;
    }

    router.refresh();
  }

  return (
    <button
      type="button"
      onClick={handleDelete}
      disabled={loading}
      className="rounded-md border px-3 py-2 text-sm text-destructive hover:bg-muted disabled:cursor-not-allowed disabled:opacity-50"
    >
      {loading ? "Deleting..." : "Delete"}
    </button>
  );
}