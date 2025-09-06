import React, { useState, useRef, useEffect } from 'react'
import { cn } from '../utils/classNames'
import { ChevronDown } from 'lucide-react'

export interface DropdownItem {
  label: string
  value: string
  icon?: React.ReactNode
  disabled?: boolean
}

export interface DropdownProps {
  trigger: React.ReactNode
  items: DropdownItem[]
  onSelect: (item: DropdownItem) => void
  placeholder?: string
  disabled?: boolean
  size?: 'sm' | 'md' | 'lg'
}

const Dropdown: React.FC<DropdownProps> = ({
  trigger,
  items,
  onSelect,
  placeholder = 'Select option',
  disabled = false,
  size = 'md'
}) => {
  const [isOpen, setIsOpen] = useState(false)
  const [selectedItem, setSelectedItem] = useState<DropdownItem | null>(null)
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleSelect = (item: DropdownItem) => {
    if (item.disabled) return
    
    setSelectedItem(item)
    onSelect(item)
    setIsOpen(false)
  }

  const sizes = {
    sm: 'text-sm',
    md: 'text-sm',
    lg: 'text-base'
  }

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Trigger */}
      <button
        onClick={() => !disabled && setIsOpen(!isOpen)}
        disabled={disabled}
        className={cn(
          'flex items-center w-full px-3 py-2 border border-gray-200 rounded-lg bg-white text-left hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed transition-colors',
          sizes[size]
        )}
      >
        <div className="flex-1">
          {trigger}
        </div>
        <ChevronDown className={cn('w-4 h-4 text-gray-400 transition-transform ml-2', isOpen && 'rotate-180')} />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-50 max-h-60 overflow-auto">
          {items.map((item, index) => (
            <button
              key={item.value}
              onClick={() => handleSelect(item)}
              disabled={item.disabled}
              className={cn(
                'flex items-center gap-2 w-full px-3 py-2 text-left hover:bg-gray-50 focus:outline-none focus:bg-gray-50 transition-colors',
                item.disabled && 'opacity-50 cursor-not-allowed',
                selectedItem?.value === item.value && 'bg-accent-light text-accent',
                sizes[size]
              )}
            >
              {item.icon && <span className="flex-shrink-0">{item.icon}</span>}
              <span className="flex-1">{item.label}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

export default Dropdown 