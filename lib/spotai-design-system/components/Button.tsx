import React from 'react'
import { cn } from '../utils/classNames'

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'destructive'
  size?: 'sm' | 'md' | 'lg'
  children: React.ReactNode
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', children, ...props }, ref) => {
    const baseClasses = 'flex items-center justify-center rounded-lg cursor-pointer transition-colors focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none'
    
    const variants = {
      primary: 'bg-primary text-white hover:bg-primary-hover',
      secondary: 'bg-accent-light text-accent hover:bg-accent hover:text-white',
      outline: 'bg-white text-primary border border-zinc-200 hover:bg-gray-50',
      ghost: 'text-primary hover:bg-gray-100',
      destructive: 'bg-red-600 text-white hover:bg-red-700'
    }
    
    const sizes = {
      sm: 'px-3 py-1.5 text-xs gap-1.5',
      md: 'px-4 py-2 text-sm gap-2',
      lg: 'px-6 py-3 text-base gap-2'
    }
    
    return (
      <button
        className={cn(
          baseClasses,
          variants[variant],
          sizes[size],
          className
        )}
        ref={ref}
        {...props}
      >
        {children}
      </button>
    )
  }
)

Button.displayName = 'Button'

export default Button 