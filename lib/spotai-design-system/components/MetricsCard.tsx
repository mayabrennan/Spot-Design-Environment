import React from 'react'
import { cn } from '../utils/classNames'
import ActionMenu from './ActionMenu'

export interface MetricsCardProps {
  title: string
  value: string | number
  subtitle?: string
  trend?: {
    value: number
    isPositive: boolean
  }
  icon?: React.ReactNode
  variant?: 'default' | 'success' | 'warning' | 'error'
  size?: 'sm' | 'md' | 'lg'
  className?: string
  onActionSelect?: (action: string) => void
}

const MetricsCard: React.FC<MetricsCardProps> = ({
  title,
  value,
  subtitle,
  trend,
  icon,
  variant = 'default',
  size = 'md',
  className,
  onActionSelect
}) => {
  const getBadgeText = () => {
    switch (variant) {
      case 'success':
        return 'excellent'
      case 'warning':
        return 'needs work'
      case 'error':
        return 'critical'
      default:
        return 'great'
    }
  }

  const getBadgeColor = () => {
    switch (variant) {
      case 'success':
        return 'bg-success-light text-success'
      case 'warning':
        return 'bg-warning-light text-warning'
      case 'error':
        return 'bg-red-600 text-white'
      default:
        return 'bg-accent text-white'
    }
  }

  return (
    <div className={cn("bg-white border border-zinc-200 rounded-lg p-4", className)}>
      {/* Header with Title/Subtitle and Ellipses */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <h3 className="text-sm font-medium text-primary capitalize">
            {title}
          </h3>
          {subtitle && (
            <p className="text-sm text-gray-600 mt-1.5">
              {subtitle}
            </p>
          )}
        </div>
        <ActionMenu 
          onSelect={(action) => onActionSelect?.(action)}
        />
      </div>
      
      {/* Value and Badge */}
      <div className="flex justify-between items-center">
        <div className="text-base font-medium text-primary">
          {value}
        </div>
        <div className={cn("px-2 py-1 rounded text-xs font-medium capitalize", getBadgeColor())}>
          {getBadgeText()}
        </div>
      </div>
    </div>
  )
}

export default MetricsCard 