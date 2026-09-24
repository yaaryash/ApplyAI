import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export default async function SettingsPage() {
  const session = await getServerSession(authOptions);

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Settings</h1>

        <p className="mt-1 text-sm text-muted-foreground">
          Manage your ApplyAI account.
        </p>
      </div>

      <section className="rounded-xl border bg-background p-6">
        <h2 className="text-lg font-semibold">
          Account Information
        </h2>

        <div className="mt-5 space-y-4">
          <div>
            <p className="text-sm text-muted-foreground">Name</p>
            <p className="mt-1 font-medium">
              {session?.user?.name || "Not provided"}
            </p>
          </div>

          <div>
            <p className="text-sm text-muted-foreground">Email</p>
            <p className="mt-1 font-medium">
              {session?.user?.email || "Not available"}
            </p>
          </div>
        </div>
      </section>

      <section className="rounded-xl border bg-background p-6">
        <h2 className="text-lg font-semibold">
          Security
        </h2>

        <p className="mt-2 text-sm text-muted-foreground">
          Your account is protected using authenticated sessions and
          password hashing.
        </p>
      </section>
    </div>
  );
}