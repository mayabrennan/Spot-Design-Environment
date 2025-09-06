import React from 'react'
import { cn } from '../utils/classNames'

export interface AvatarProps extends React.HTMLAttributes<HTMLDivElement> {
  src?: string
  alt?: string
  fallback?: string
  size?: 'sm' | 'md' | 'lg' | 'xl'
  variant?: 'default' | 'rounded' | 'square'
}

const Avatar = React.forwardRef<HTMLDivElement, AvatarProps>(
  ({ className, src, alt, fallback, size = 'md', variant = 'default', ...props }, ref) => {
    const sizes = {
      sm: 'w-6 h-6 text-xs',
      md: 'w-8 h-8 text-xs',
      lg: 'w-10 h-10 text-sm',
      xl: 'w-12 h-12 text-base'
    }
    
    const variants = {
      default: 'rounded-md',
      rounded: 'rounded-full',
      square: 'rounded-none'
    }
    
    return (
      <div
        ref={ref}
        className={cn(
          'flex items-center justify-center bg-gray-300 border border-primary font-medium text-primary',
          sizes[size],
          variants[variant],
          className
        )}
        {...props}
      >
        {src ? (
          <img
            src={src}
            alt={alt || 'Avatar'}
            className={cn('w-full h-full object-cover', variants[variant])}
          />
        ) : (
          <span>{fallback || 'U'}</span>
        )}
      </div>
    )
  }
)

Avatar.displayName = 'Avatar'

export default Avatar 