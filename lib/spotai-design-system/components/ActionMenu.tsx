import React, { useState, useRef, useEffect } from 'react'
import { cn } from '../utils/classNames'
import { MoreHorizontal, Sparkles, Edit, Copy, Trash2 } from 'lucide-react'

export interface ActionMenuItem {
  label: string
  value: string
  icon: React.ReactNode
  color?: 'default' | 'accent' | 'destructive'
}

export interface ActionMenuProps {
  onSelect: (value: string) => void
  className?: string
}

const ActionMenu: React.FC<ActionMenuProps> = ({
  onSelect,
  className
}) => {
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  const defaultItems: ActionMenuItem[] = [
    {
      label: 'ask iris',
      value: 'ask-iris',
      icon: <Sparkles className="w-4 h-4 text-accent" />,
      color: 'accent'
    },
    {
      label: 'edit',
      value: 'edit',
      icon: <Edit className="w-4 h-4" />,
      color: 'default'
    },
    {
      label: 'duplicate',
      value: 'duplicate',
      icon: <Copy className="w-4 h-4" />,
      color: 'default'
    },
    {
      label: 'delete',
      value: 'delete',
      icon: <Trash2 className="w-4 h-4 text-red-600" />,
      color: 'destructive'
    }
  ]

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleSelect = (value: string) => {
    onSelect(value)
    setIsOpen(false)
  }

  const getTextColor = (color?: string) => {
    switch (color) {
      case 'accent':
        return 'text-accent'
      case 'destructive':
        return 'text-red-600'
      default:
        return 'text-primary'
    }
  }

  return (
    <div className={cn("relative", className)} ref={dropdownRef}>
      {/* Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-2.5 hover:bg-gray-100 rounded-lg transition-colors"
      >
        <MoreHorizontal className="w-4 h-4 text-gray-400" />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute top-full right-0 mt-1 bg-white border border-zinc-200 rounded-lg shadow-lg z-50 min-w-[160px]">
          {/* Header */}
          <div className="flex items-center px-3 py-1.5 border-b border-zinc-200">
            <span className="text-sm font-semibold text-primary capitalize">actions</span>
          </div>
          
          {/* Menu Items */}
          <div className="p-1">
            {defaultItems.map((item, index) => (
              <button
                key={item.value}
                onClick={() => handleSelect(item.value)}
                className="flex items-center gap-2 w-full px-3 py-2 text-left hover:bg-gray-50 focus:outline-none focus:bg-gray-50 transition-colors rounded h-9"
              >
                <span className="flex-shrink-0">{item.icon}</span>
                <span className={cn("flex-1 text-sm font-medium capitalize leading-5", getTextColor(item.color))}>
                  {item.label}
                </span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default ActionMenu 
 
 
 
 
 
 