"use client";

import type { HTMLAttributes, ForwardRefExoticComponent, RefAttributes, ReactNode } from "react";
import { useState, useRef, useEffect } from "react";

interface DropdownProps {
  trigger: ReactNode;
  content: ReactNode;
  align?: "left" | "right";
}

export function Dropdown({ trigger, content, align = "right" }: DropdownProps) {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative inline-block" ref={dropdownRef}>
      <div onClick={() => setOpen(!open)}>{trigger}</div>
      {open && (
        <div
          className={`
            fixed z-50 mt-2 min-w-[180px] rounded-lg bg-white border border-slate-200 shadow-lg
            ${align === "right" ? "right-0" : "left-0"}
          `}
          role="menu"
        >
          <div className="py-1">{content}</div>
        </div>
      )}
    </div>
  );
}

interface DropdownItemProps extends HTMLAttributes<HTMLButtonElement> {
  icon?: ReactNode;
  destructive?: boolean;
}

export const DropdownItem = Object.assign(
  function DropdownItem({
    icon,
    destructive = false,
    className = "",
    onClick,
    children,
    ...props
  }: DropdownItemProps) {
    return (
      <button
        className={`
          w-full flex items-center gap-3 px-4 py-2 text-sm text-left
          ${destructive ? "text-red-600 hover:bg-red-50" : "text-slate-700 hover:bg-slate-50"}
          ${className}
        `}
        onClick={(e) => {
          onClick?.(e);
        }}
        role="menuitem"
        {...props}
      >
        {icon && <span className="flex-shrink-0 w-4 h-4">{icon}</span>}
        {children}
      </button>
    );
  },
  { displayName: "DropdownItem" }
);

export const DropdownDivider = Object.assign(
  function DropdownDivider({ className = "" }: HTMLAttributes<HTMLDivElement>) {
    return <div className={`h-px bg-slate-100 my-1 ${className}`} role="separator" />;
  },
  { displayName: "DropdownDivider" }
);

export const DropdownLabel = Object.assign(
  function DropdownLabel({ className = "", children, ...props }: HTMLAttributes<HTMLDivElement>) {
    return (
      <div className={`px-4 py-2 text-xs font-semibold text-slate-500 uppercase tracking-wider ${className}`} {...props}>
        {children}
      </div>
    );
  },
  { displayName: "DropdownLabel" }
);