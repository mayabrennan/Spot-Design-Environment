import React from 'react'
import { cn } from '../utils/classNames'

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
  variant?: 'default' | 'elevated' | 'outlined'
}

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant = 'default', children, ...props }, ref) => {
    const variants = {
      default: 'bg-white border border-gray-200',
      elevated: 'bg-white shadow-lg border border-gray-200',
      outlined: 'bg-white border-2 border-gray-200'
    }
    
    return (
      <div
        ref={ref}
        className={cn(
          'rounded-lg p-4',
          variants[variant],
          className
        )}
        {...props}
      >
        {children}
      </div>
    )
  }
)

Card.displayName = 'Card'

export default Card 