import React from 'react'
import { cn } from '../utils/classNames'

export interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  variant?: 'default' | 'search' | 'error'
  size?: 'sm' | 'md' | 'lg'
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, variant = 'default', size = 'md', ...props }, ref) => {
    const baseClasses = 'block w-full border rounded-lg bg-gray-50/50 text-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-colors'
    
    const variants = {
      default: 'border-gray-200',
      search: 'border-gray-200 pl-10',
      error: 'border-red-300 focus:ring-red-500'
    }
    
    const sizes = {
      sm: 'px-3 py-1.5 text-sm',
      md: 'px-3 py-2 text-sm',
      lg: 'px-4 py-3 text-base'
    }
    
    return (
      <input
        className={cn(
          baseClasses,
          variants[variant],
          sizes[size],
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)

Input.displayName = 'Input'

export default Input 