import type { ReactNode } from "react";
import { Sidebar } from "@/components/layout/Sidebar";

interface DashboardLayoutProps {
  children: ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <div className="min-h-screen bg-slate-50">
      <Sidebar />
      <div className={`
        transition-all duration-200
        lg:ml-64
      `}>
        <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/80 backdrop-blur-sm">
          <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
            <div className="flex items-center gap-4">
              <h1 className="text-2xl font-bold text-slate-950">Regista</h1>
              <span className="hidden text-sm text-slate-500 sm:inline">Creator workspace</span>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-sm text-slate-500">v0.1.0</span>
            </div>
          </div>
        </header>
        <main className="mx-auto max-w-7xl px-6 py-8">{children}</main>
      </div>
    </div>
  );
}