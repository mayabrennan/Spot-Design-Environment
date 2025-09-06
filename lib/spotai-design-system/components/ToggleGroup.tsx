import React from 'react'
import { cn } from '../utils/classNames'

export interface ToggleGroupItem {
  value: string
  label: string
  icon?: React.ComponentType<{ className?: string }>
  disabled?: boolean
}

export interface ToggleGroupProps {
  items: ToggleGroupItem[]
  value?: string
  onValueChange?: (value: string) => void
  className?: string
  size?: 'sm' | 'md' | 'lg'
}

/**
 * ToggleGroup Component
 * 
 * Usage example:
 * ```tsx
 * import { Video, LayoutGrid, ClipboardList, User } from 'lucide-react'
 * 
 * const items = [
 *   { value: 'video', label: 'video', icon: <Video className="w-4 h-4" /> },
 *   { value: 'analytics', label: 'analytics', icon: <LayoutGrid className="w-4 h-4" /> },
 *   { value: 'output', label: 'Output', icon: <ClipboardList className="w-4 h-4" /> },
 *   { value: 'profile', label: 'profile', icon: <User className="w-4 h-4" /> }
 * ]
 * 
 * <ToggleGroup 
 *   items={items} 
 *   value={activeTab} 
 *   onValueChange={setActiveTab} 
 * />
 * ```
 */
const ToggleGroup = React.forwardRef<HTMLDivElement, ToggleGroupProps>(
  ({ items, value, onValueChange, className, size = 'md' }, ref) => {
    return (
      <div 
        ref={ref}
        className={cn(
          'bg-white rounded-lg p-1 flex items-center gap-1 border border-zinc-200',
          className
        )}
      >
        {items.map((item) => (
            <button
            key={item.value}
              type="button"
              disabled={item.disabled}
              onClick={() => onValueChange?.(item.value)}
              className={cn(
              'px-3 py-2 rounded-md text-sm font-medium transition-colors',
              'capitalize',
                value === item.value
                ? 'bg-accent text-white' 
                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100',
              item.disabled ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'
            )}
          >
            {item.label}
            </button>
        ))}
      </div>
    )
  }
)

ToggleGroup.displayName = 'ToggleGroup'

export default ToggleGroup 