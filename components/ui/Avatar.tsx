"use client";

import type { HTMLAttributes, ForwardRefExoticComponent, RefAttributes } from "react";

interface AvatarProps extends HTMLAttributes<HTMLDivElement> {
  src?: string;
  alt?: string;
  fallback?: string;
  size?: "xs" | "sm" | "md" | "lg" | "xl" | "2xl";
  shape?: "circle" | "square";
}

export const Avatar = Object.assign(
  function Avatar({
    src,
    alt,
    fallback,
    size = "md",
    shape = "circle",
    className = "",
    ...props
  }: AvatarProps) {
    const sizes = {
      xs: "w-6 h-6 text-xs",
      sm: "w-8 h-8 text-sm",
      md: "w-10 h-10 text-base",
      lg: "w-12 h-12 text-lg",
      xl: "w-16 h-16 text-xl",
      "2xl": "w-24 h-24 text-2xl",
    };

    const shapes = {
      circle: "rounded-full",
      square: "rounded-lg",
    };

    const getInitials = (name: string) => {
      return name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2);
    };

    const handleError = (e: React.SyntheticEvent<HTMLImageElement>) => {
      e.currentTarget.style.display = "none";
      e.currentTarget.nextElementSibling?.classList.remove("hidden");
    };

    return (
      <div className={`relative inline-flex shrink-0 overflow-hidden ${shapes[shape]} ${sizes[size]} ${className}`} {...props}>
        {src ? (
          <>
            <img
              src={src}
              alt={alt || fallback || "Avatar"}
              className="w-full h-full object-cover"
              onError={handleError}
            />
            <span
              className={`absolute inset-0 flex items-center justify-center bg-slate-100 text-slate-600 font-medium hidden ${shapes[shape]}`}
              aria-hidden="true"
            >
              {fallback || (alt ? getInitials(alt) : "?")}
            </span>
          </>
        ) : (
          <span className={`flex items-center justify-center w-full h-full bg-slate-100 text-slate-600 font-medium ${shapes[shape]}`} aria-hidden="true">
            {fallback || (alt ? getInitials(alt) : "?")}
          </span>
        )}
      </div>
    );
  },
  { displayName: "Avatar" }
) as ForwardRefExoticComponent<AvatarProps & RefAttributes<HTMLDivElement>>;