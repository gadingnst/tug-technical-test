import { cn } from "@/libs/Common/helpers/cn"
import { ButtonHTMLAttributes, forwardRef } from "react"

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'default' | 'outline' | 'ghost' | 'destructive'
  size?: 'default' | 'sm' | 'lg' | 'icon'
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'default', size = 'default', ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500/50 disabled:pointer-events-none disabled:opacity-50 active:scale-[0.98]",
          {
            'bg-indigo-500 text-white hover:bg-indigo-600 shadow-md shadow-indigo-500/20 hover:shadow-indigo-500/30': variant === 'default',
            'border border-slate-700 bg-slate-900/50 text-slate-300 hover:bg-slate-800 hover:text-white': variant === 'outline',
            'text-slate-400 hover:bg-slate-800/50 hover:text-white': variant === 'ghost',
            'bg-red-500/10 text-red-500 hover:bg-red-500/20 hover:text-red-400': variant === 'destructive',
            'h-10 px-4 py-2': size === 'default',
            'h-8 rounded-md px-3 text-xs': size === 'sm',
            'h-12 rounded-xl px-8 text-base': size === 'lg',
            'h-10 w-10': size === 'icon',
          },
          className
        )}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"