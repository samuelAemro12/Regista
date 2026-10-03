import type { HTMLAttributes, ForwardRefExoticComponent, RefAttributes } from "react";

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: "default" | "success" | "warning" | "danger" | "info" | "outline";
  size?: "sm" | "md";
  dot?: boolean;
}

export const Badge = Object.assign(
  function Badge({
    variant = "default",
    size = "md",
    dot = false,
    className = "",
    children,
    ...props
  }: BadgeProps) {
    const variants = {
      default: "bg-slate-100 text-slate-700",
      success: "bg-green-100 text-green-700",
      warning: "bg-amber-100 text-amber-700",
      danger: "bg-red-100 text-red-700",
      info: "bg-blue-100 text-blue-700",
      outline: "border border-slate-300 bg-transparent text-slate-700",
    };

    const sizes = {
      sm: "px-2 py-0.5 text-xs",
      md: "px-2.5 py-1 text-sm",
    };

    const dotColors = {
      default: "bg-slate-400",
      success: "bg-green-500",
      warning: "bg-amber-500",
      danger: "bg-red-500",
      info: "bg-blue-500",
      outline: "bg-slate-400",
    };

    return (
      <span className={`inline-flex items-center gap-1.5 rounded-full font-medium ${variants[variant]} ${sizes[size]} ${className}`} {...props}>
        {dot && <span className={`w-1.5 h-1.5 rounded-full ${dotColors[variant]}`} />}
        {children}
      </span>
    );
  },
  { displayName: "Badge" }
) as ForwardRefExoticComponent<BadgeProps & RefAttributes<HTMLSpanElement>>;