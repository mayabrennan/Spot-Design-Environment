import React from 'react'
import { cn } from '../utils/classNames'
import { X, AlertCircle, CheckCircle, AlertTriangle, Info } from 'lucide-react'

export interface AlertProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'success' | 'warning' | 'error' | 'info'
  title?: string
  children: React.ReactNode
  onClose?: () => void
  showIcon?: boolean
}

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(
  ({ className, variant = 'default', title, children, onClose, showIcon = true, ...props }, ref) => {
    const variants = {
      default: {
        container: 'bg-gray-50 border-gray-200 text-gray-800',
        icon: 'text-gray-500',
        title: 'text-gray-900'
      },
      success: {
        container: 'bg-success-light border-success text-success',
        icon: 'text-success',
        title: 'text-success'
      },
      warning: {
        container: 'bg-warning-light border-warning text-warning',
        icon: 'text-warning',
        title: 'text-warning'
      },
      error: {
        container: 'bg-red-50 border-red-200 text-red-800',
        icon: 'text-red-500',
        title: 'text-red-900'
      },
      info: {
        container: 'bg-accent-light border-accent text-accent',
        icon: 'text-accent',
        title: 'text-accent'
      }
    }

    const icons = {
      default: AlertCircle,
      success: CheckCircle,
      warning: AlertTriangle,
      error: AlertCircle,
      info: Info
    }

    const currentVariant = variants[variant]
    const IconComponent = icons[variant]

    return (
      <div
        ref={ref}
        className={cn(
          'border rounded-lg p-4',
          currentVariant.container,
          className
        )}
        {...props}
      >
        <div className="flex items-start gap-3">
          {showIcon && (
            <IconComponent className={cn('w-5 h-5 flex-shrink-0 mt-0.5', currentVariant.icon)} />
          )}
          
          <div className="flex-1">
            {title && (
              <h4 className={cn('font-medium mb-1', currentVariant.title)}>
                {title}
              </h4>
            )}
            <div className="text-sm">
              {children}
            </div>
          </div>
          
          {onClose && (
            <button
              onClick={onClose}
              className="p-1 hover:bg-black/5 rounded transition-colors"
              aria-label="Close alert"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    )
  }
)

Alert.displayName = 'Alert'

export default Alert 