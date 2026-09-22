import Link from "next/link";
import { ReactNode } from "react";

export default function DashboardLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className="min-h-screen bg-muted/30">
      <div className="flex min-h-screen">
        {/* Sidebar */}
        <aside className="hidden w-64 border-r bg-background md:flex md:flex-col">
          <div className="border-b px-6 py-5">
            <Link href="/" className="text-xl font-bold">
              ApplyAI
            </Link>

            <p className="mt-1 text-xs text-muted-foreground">
              Job search workspace
            </p>
          </div>

          <nav className="flex-1 space-y-1 p-4">
            <NavItem href="/dashboard" label="Overview" />
            <NavItem href="/dashboard/applications" label="Applications" />
            <NavItem href="/dashboard/interviews" label="Interviews" />
            <NavItem href="/dashboard/ai" label="AI Tools" />
          </nav>

          <div className="border-t p-4">
            <NavItem href="/dashboard/settings" label="Settings" />
          </div>
        </aside>

        {/* Main content */}
        <div className="flex min-w-0 flex-1 flex-col">
          <header className="border-b bg-background px-6 py-4">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-lg font-semibold">Dashboard</h1>
                <p className="text-sm text-muted-foreground">
                  Track your job search from one place.
                </p>
              </div>

              <Link
                href="/dashboard/applications"
                className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:opacity-90"
              >
                Add Application
              </Link>
            </div>
          </header>

          <main className="flex-1 p-6">{children}</main>
        </div>
      </div>
    </div>
  );
}

function NavItem({
  href,
  label,
}: {
  href: string;
  label: string;
}) {
  return (
    <Link
      href={href}
      className="block rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition hover:bg-muted hover:text-foreground"
    >
      {label}
    </Link>
  );
}