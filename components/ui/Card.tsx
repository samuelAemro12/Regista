import type { HTMLAttributes, ForwardRefExoticComponent, RefAttributes } from "react";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "elevated" | "outlined";
  padding?: "none" | "sm" | "md" | "lg";
}

export const Card = Object.assign(
  function Card({
    variant = "default",
    padding = "md",
    className = "",
    children,
    ...props
  }: CardProps) {
    const variants = {
      default: "bg-white shadow-sm",
      elevated: "bg-white shadow-lg",
      outlined: "bg-white border border-slate-200",
    };

    const paddings = {
      none: "",
      sm: "p-4",
      md: "p-6",
      lg: "p-8",
    };

    return (
      <div className={`rounded-xl ${variants[variant]} ${paddings[padding]} ${className}`} {...props}>
        {children}
      </div>
    );
  },
  { displayName: "Card" }
) as ForwardRefExoticComponent<CardProps & RefAttributes<HTMLDivElement>>;

export const CardHeader = Object.assign(
  function CardHeader({ className = "", children, ...props }: HTMLAttributes<HTMLDivElement>) {
    return (
      <div className={`mb-4 ${className}`} {...props}>
        {children}
      </div>
    );
  },
  { displayName: "CardHeader" }
);

export const CardTitle = Object.assign(
  function CardTitle({ className = "", children, ...props }: HTMLAttributes<HTMLHeadingElement>) {
    return <h3 className={`text-lg font-semibold text-slate-950 ${className}`} {...props}>{children}</h3>;
  },
  { displayName: "CardTitle" }
);

export const CardDescription = Object.assign(
  function CardDescription({ className = "", children, ...props }: HTMLAttributes<HTMLParagraphElement>) {
    return <p className={`text-sm text-slate-500 mt-1 ${className}`} {...props}>{children}</p>;
  },
  { displayName: "CardDescription" }
);

export const CardContent = Object.assign(
  function CardContent({ className = "", children, ...props }: HTMLAttributes<HTMLDivElement>) {
    return <div className={className} {...props}>{children}</div>;
  },
  { displayName: "CardContent" }
);

export const CardFooter = Object.assign(
  function CardFooter({ className = "", children, ...props }: HTMLAttributes<HTMLDivElement>) {
    return (
      <div className={`mt-4 pt-4 border-t border-slate-100 flex items-center gap-3 ${className}`} {...props}>
        {children}
      </div>
    );
  },
  { displayName: "CardFooter" }
);