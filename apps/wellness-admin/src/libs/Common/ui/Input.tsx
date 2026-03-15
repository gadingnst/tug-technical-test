import * as React from "react"
import { cn } from "@/libs/Common/helpers/cn"

export type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  error?: boolean;
  label?: React.ReactNode;
  errorMessage?: string;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type = "text", error, label, errorMessage, id, ...props }, ref) => {
    return (
      <div className="space-y-2 w-full">
        {label && (
          <label className="text-sm font-medium text-slate-300" htmlFor={id}>
            {label}
          </label>
        )}
        <input
          id={id}
          type={type}
          className={cn(
            "w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-3 text-white placeholder:text-slate-600 focus:outline-none focus:ring-1 focus:border-indigo-500 focus:ring-indigo-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed",
            error && "border-red-500 focus:border-red-500 focus:ring-red-500",
            className
          )}
          ref={ref}
          {...props}
        />
        {errorMessage && (
          <p className="text-sm text-red-500 font-medium">{errorMessage}</p>
        )}
      </div>
    )
  }
)
Input.displayName = "Input"
