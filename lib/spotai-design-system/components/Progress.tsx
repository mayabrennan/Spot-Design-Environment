import React from 'react'
import { cn } from '../utils/classNames'

export interface ProgressProps extends React.HTMLAttributes<HTMLDivElement> {
  value: number
  max?: number
  size?: 'sm' | 'md' | 'lg'
  variant?: 'default' | 'success' | 'warning' | 'error'
  showLabel?: boolean
  label?: string
}

const Progress = React.forwardRef<HTMLDivElement, ProgressProps>(
  ({ className, value, max = 100, size = 'md', variant = 'default', showLabel = false, label, ...props }, ref) => {
    const percentage = Math.min(Math.max((value / max) * 100, 0), 100)
    
    const sizes = {
      sm: 'h-1',
      md: 'h-2',
      lg: 'h-3'
    }
    
    const variants = {
      default: 'bg-accent',
      success: 'bg-success',
      warning: 'bg-warning',
      error: 'bg-red-500'
    }
    
    return (
      <div ref={ref} className={cn('w-full', className)} {...props}>
        {showLabel && (
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-primary">
              {label || `${value}/${max}`}
            </span>
            <span className="text-sm text-gray-600">
              {Math.round(percentage)}%
            </span>
          </div>
        )}
        
        <div className={cn('w-full bg-gray-200 rounded-full overflow-hidden', sizes[size])}>
          <div
            className={cn(
              'h-full rounded-full transition-all duration-300 ease-in-out',
              variants[variant]
            )}
            style={{ width: `${percentage}%` }}
          />
        </div>
      </div>
    )
  }
)

Progress.displayName = 'Progress'

export default Progress 