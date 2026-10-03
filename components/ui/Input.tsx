import type { InputHTMLAttributes, ForwardRefExoticComponent, RefAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
}

export const Input = Object.assign(
  function Input({
    label,
    error,
    helperText,
    className = "",
    id,
    ...props
  }: InputProps) {
    const inputId = id || label?.toLowerCase().replace(/\s+/g, "-");

    return (
      <div className="w-full">
        {label && (
          <label htmlFor={inputId} className="block text-sm font-medium text-slate-700 mb-1.5">
            {label}
          </label>
        )}
        <input
          id={inputId}
          className={`
            w-full rounded-lg border bg-white px-3 py-2 text-sm text-slate-950
            placeholder:text-slate-400
            focus:outline-none focus:ring-2 focus:ring-pitch-500 focus:border-transparent
            disabled:bg-slate-50 disabled:text-slate-500 disabled:cursor-not-allowed
            transition-colors
            ${error ? "border-red-300 focus:ring-red-500" : "border-slate-300 hover:border-slate-400"}
            ${className}
          `}
          aria-invalid={error ? "true" : "false"}
          aria-describedby={error ? `${inputId}-error` : helperText ? `${inputId}-helper` : undefined}
          {...props}
        />
        {error && (
          <p id={`${inputId}-error`} className="mt-1.5 text-sm text-red-600" role="alert">
            {error}
          </p>
        )}
        {helperText && !error && (
          <p id={`${inputId}-helper`} className="mt-1.5 text-sm text-slate-500">
            {helperText}
          </p>
        )}
      </div>
    );
  },
  { displayName: "Input" }
) as ForwardRefExoticComponent<InputProps & RefAttributes<HTMLInputElement>>;

interface TextareaProps extends Omit<InputHTMLAttributes<HTMLTextAreaElement>, "type"> {
  label?: string;
  error?: string;
  helperText?: string;
}

export const Textarea = Object.assign(
  function Textarea({
    label,
    error,
    helperText,
    className = "",
    id,
    rows = 3,
    ...props
  }: TextareaProps) {
    const inputId = id || label?.toLowerCase().replace(/\s+/g, "-");

    return (
      <div className="w-full">
        {label && (
          <label htmlFor={inputId} className="block text-sm font-medium text-slate-700 mb-1.5">
            {label}
          </label>
        )}
        <textarea
          id={inputId}
          rows={rows}
          className={`
            w-full rounded-lg border bg-white px-3 py-2 text-sm text-slate-950
            placeholder:text-slate-400 resize-y min-h-[80px]
            focus:outline-none focus:ring-2 focus:ring-pitch-500 focus:border-transparent
            disabled:bg-slate-50 disabled:text-slate-500 disabled:cursor-not-allowed
            transition-colors
            ${error ? "border-red-300 focus:ring-red-500" : "border-slate-300 hover:border-slate-400"}
            ${className}
          `}
          aria-invalid={error ? "true" : "false"}
          aria-describedby={error ? `${inputId}-error` : helperText ? `${inputId}-helper` : undefined}
          {...props}
        />
        {error && (
          <p id={`${inputId}-error`} className="mt-1.5 text-sm text-red-600" role="alert">
            {error}
          </p>
        )}
        {helperText && !error && (
          <p id={`${inputId}-helper`} className="mt-1.5 text-sm text-slate-500">
            {helperText}
          </p>
        )}
      </div>
    );
  },
  { displayName: "Textarea" }
) as ForwardRefExoticComponent<TextareaProps & RefAttributes<HTMLTextAreaElement>>;