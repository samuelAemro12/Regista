"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import type { ReactNode } from "react";
import { creator } from "@/lib/mock";
import { Avatar } from "@/components/ui";
import { Dropdown, DropdownItem, DropdownDivider, DropdownLabel } from "@/components/ui/Dropdown";

interface SidebarProps {
  children?: ReactNode;
}

const navigation = [
  { href: "/dashboard", label: "Dashboard", icon: DashboardIcon },
  { href: "/tactics-board", label: "Tactics", icon: TacticsIcon },
  { href: "/content-pipeline", label: "Content", icon: ContentIcon },
  { href: "/calendar", label: "Calendar", icon: CalendarIcon },
  { href: "/matches", label: "Matches", icon: MatchesIcon },
  { href: "/analytics", label: "Analytics", icon: AnalyticsIcon },
  { href: "/stream", label: "Stream", icon: StreamIcon },
];

function DashboardIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="3" y="3" width="7" height="7" rx="1" />
      <rect x="14" y="3" width="7" height="7" rx="1" />
      <rect x="3" y="14" width="7" height="7" rx="1" />
      <rect x="14" y="14" width="7" height="7" rx="1" />
    </svg>
  );
}

function TacticsIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="2" y="2" width="20" height="20" rx="2" />
      <circle cx="12" cy="12" r="3" />
      <path d="M12 2v4M12 18v4M2 12h4M18 12h4" />
      <circle cx="7" cy="7" r="1.5" fill="currentColor" strokeWidth="0" />
      <circle cx="17" cy="7" r="1.5" fill="currentColor" strokeWidth="0" />
      <circle cx="7" cy="17" r="1.5" fill="currentColor" strokeWidth="0" />
      <circle cx="17" cy="17" r="1.5" fill="currentColor" strokeWidth="0" />
    </svg>
  );
}

function ContentIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <polyline points="14 2 14 8 20 8" />
      <line x1="16" y1="13" x2="8" y2="13" />
      <line x1="16" y1="17" x2="8" y2="17" />
      <polyline points="10 9 9 9 8 9" />
    </svg>
  );
}

function CalendarIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
      <line x1="16" y1="2" x2="16" y2="6" />
      <line x1="8" y1="2" x2="8" y2="6" />
      <line x1="3" y1="10" x2="21" y2="10" />
    </svg>
  );
}

function MatchesIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="12" r="10" />
      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
    </svg>
  );
}

function AnalyticsIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <line x1="18" y1="20" x2="18" y2="10" />
      <line x1="12" y1="20" x2="12" y2="4" />
      <line x1="6" y1="20" x2="6" y2="14" />
    </svg>
  );
}

function StreamIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    </svg>
  );
}

function SettingsIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="12" r="3" />
      <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
    </svg>
  );
}

function LogoutIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
      <polyline points="16 17 21 12 16 7" />
      <line x1="21" y1="12" x2="9" y2="12" />
    </svg>
  );
}

function ChevronLeftIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <polyline points="15 18 9 12 15 6" />
    </svg>
  );
}

function ChevronRightIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <polyline points="9 18 15 12 9 6" />
    </svg>
  );
}

export function Sidebar({ children }: SidebarProps) {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);

  return (
    <aside
      className={`
        fixed left-0 top-0 z-40 h-screen bg-slate-950 border-r border-slate-800 transition-all duration-200
        ${collapsed ? "w-16" : "w-64"}
      `}
      aria-label="Main navigation"
    >
      <div className="flex h-full flex-col">
        {/* Brand */}
        <div className="flex h-16 items-center justify-between px-4 border-b border-slate-800">
          <Link href="/dashboard" className="flex items-center gap-3" aria-label="Regista Home">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-pitch-600">
              <svg className="h-5 w-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <circle cx="12" cy="12" r="10" />
                <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
              </svg>
            </div>
            {!collapsed && (
              <span className="text-xl font-bold text-white tracking-tight">Regista</span>
            )}
          </Link>
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="flex h-9 w-9 items-center justify-center rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
            aria-expanded={!collapsed}
          >
            {collapsed ? <ChevronRightIcon className="h-5 w-5" /> : <ChevronLeftIcon className="h-5 w-5" />}
          </button>
        </div>

        {/* Workspace */}
        {!collapsed && (
          <div className="px-4 py-3 border-b border-slate-800">
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-2">Workspace</p>
            <Link
              href="/dashboard"
              className="flex items-center gap-3 px-3 py-2 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800 transition-colors"
            >
              <Avatar src={creator.primaryTeam.crest} alt={creator.primaryTeam.name} size="sm" />
              <div className="flex-1 min-w-0">
                <p className="font-medium text-white truncate">{creator.primaryTeam.name}</p>
                <p className="text-xs text-slate-500 truncate">{creator.name}</p>
              </div>
            </Link>
          </div>
        )}

        {/* Navigation */}
        <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto" aria-label="Workspace navigation">
          {navigation.map((item) => {
            const isActive = pathname === item.href || (item.href !== "/dashboard" && pathname.startsWith(item.href));
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`
                  flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors
                  ${isActive
                    ? "bg-pitch-900/50 text-white"
                    : "text-slate-400 hover:text-white hover:bg-slate-800"}
                  ${collapsed ? "justify-center" : ""}
                `}
                aria-current={isActive ? "page" : undefined}
                title={collapsed ? item.label : undefined}
              >
                <item.icon className="h-5 w-5 flex-shrink-0" />
                {!collapsed && <span>{item.label}</span>}
              </Link>
            );
          })}
        </nav>

        {/* Bottom section */}
        <div className="p-3 border-t border-slate-800">
          {!collapsed ? (
            <>
              <Link
                href="/settings"
                className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
              >
                <SettingsIcon className="h-5 w-5 flex-shrink-0" />
                <span>Settings</span>
              </Link>
              <div className="mt-3 pt-3 border-t border-slate-800">
                <Dropdown
                  trigger={
                    <button className="flex w-full items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-slate-400 hover:text-white hover:bg-slate-800 transition-colors">
                      <Avatar src={creator.avatar} alt={creator.name} size="sm" fallback={creator.name.slice(0, 2)} />
                      <span className="truncate">{creator.name}</span>
                    </button>
                  }
                  content={
                    <>
                      <DropdownLabel>Account</DropdownLabel>
                      <DropdownItem>
                        <span className="font-medium text-slate-950">{creator.name}</span>
                      </DropdownItem>
                      <DropdownItem>
                        <span className="text-slate-500">{creator.handle}</span>
                      </DropdownItem>
                      <DropdownDivider />
                      <DropdownItem icon={<SettingsIcon className="h-4 w-4" />}>Settings</DropdownItem>
                      <DropdownItem icon={<LogoutIcon className="h-4 w-4" />} destructive>
                        Sign out
                      </DropdownItem>
                    </>
                  }
                />
              </div>
            </>
          ) : (
            <Dropdown
              align="left"
              trigger={
                <button className="flex w-full items-center justify-center px-2 py-2.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors">
                  <Avatar src={creator.avatar} alt={creator.name} size="sm" fallback={creator.name.slice(0, 2)} />
                </button>
              }
              content={
                <>
                  <DropdownLabel>Account</DropdownLabel>
                  <DropdownItem>
                    <span className="font-medium text-slate-950">{creator.name}</span>
                  </DropdownItem>
                  <DropdownItem>
                    <span className="text-slate-500">{creator.handle}</span>
                  </DropdownItem>
                  <DropdownDivider />
                  <DropdownItem icon={<SettingsIcon className="h-4 w-4" />}>Settings</DropdownItem>
                  <DropdownItem icon={<LogoutIcon className="h-4 w-4" />} destructive>
                    Sign out
                  </DropdownItem>
                </>
              }
            />
          )}
        </div>
      </div>

      {children && !collapsed && (
        <div className="absolute right-0 top-0 h-full w-1 bg-gradient-to-l from-slate-950 to-transparent pointer-events-none" />
      )}
    </aside>
  );
}