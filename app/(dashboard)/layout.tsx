import Link from "next/link";
import type { ReactNode } from "react";

const navigation = [
  { href: "/dashboard", label: "Dashboard" },
  { href: "/tactics-board", label: "Tactics board" },
  { href: "/content-pipeline", label: "Content pipeline" },
];

type DashboardLayoutProps = Readonly<{
  children: ReactNode;
}>;

export default function DashboardLayout({
  children,
}: DashboardLayoutProps) {
  return (
    <div className="min-h-screen bg-slate-50">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex w-full max-w-7xl flex-wrap items-center gap-6 px-6 py-4">
          <Link className="text-xl font-bold text-pitch-950" href="/">
            Regista
          </Link>
          <span className="hidden text-sm text-slate-500 sm:inline">
            Creator workspace
          </span>
          <nav aria-label="Workspace" className="ml-auto">
            <ul className="flex flex-wrap gap-2">
              {navigation.map((item) => (
                <li key={item.href}>
                  <Link
                    className="block rounded-md px-3 py-2 text-sm font-medium text-slate-600 transition-colors hover:bg-slate-100 hover:text-slate-950"
                    href={item.href}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </header>
      <main className="mx-auto w-full max-w-7xl px-6 py-10">{children}</main>
    </div>
  );
}
