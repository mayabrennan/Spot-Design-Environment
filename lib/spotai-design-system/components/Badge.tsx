import React from 'react'
import { cn } from '../utils/classNames'

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'success' | 'warning' | 'info' | 'reviewed'
  size?: 'sm' | 'md' | 'lg'
  children: React.ReactNode
}

const Badge = React.forwardRef<HTMLDivElement, BadgeProps>(
  ({ className, variant = 'default', size = 'md', children, ...props }, ref) => {
    
    const variants = {
      default: 'bg-primary text-white',
      destructive: 'bg-red-100 text-red-600',
      outline: 'border border-gray-200 bg-white text-primary',
      secondary: 'bg-gray-100 text-primary',
      success: 'bg-success-light text-success',
      warning: 'bg-warning-light text-warning',
      info: 'bg-accent-light text-accent',
      reviewed: 'bg-accent-light text-accent'
    }
    
    // Custom padding for reviewed variant
    const getPadding = () => {
      if (variant === 'reviewed') {
        return 'px-2 py-0.5' // 8px left/right, 2px top/bottom
      }
      return 'px-2.5 py-0.5' // Default padding
    }
    
    return (
      <div
        ref={ref}
        className={cn(
          'inline-flex items-center justify-center rounded',
          variants[variant],
          className
        )}
        {...props}
      >
        <div className={cn('flex items-center gap-1', getPadding())}>
          <p className="text-[11px] leading-[100%] font-medium capitalize whitespace-pre">{children}</p>
        </div>
      </div>
    )
  }
)

Badge.displayName = 'Badge'

export default Badge
