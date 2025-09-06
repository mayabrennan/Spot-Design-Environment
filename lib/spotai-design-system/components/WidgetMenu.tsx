import React, { useState, useRef, useEffect } from 'react'
import { cn } from '../utils/classNames'
import { BarChart3, Type, Hash, Sparkles, Settings, Plus } from 'lucide-react'
import Card from './Card'

export interface WidgetOption {
  id: string
  title: string
  description: string
  icon: React.ReactNode
}

export interface WidgetMenuProps {
  onSelect: (widgetId: string) => void
  className?: string
}

const WidgetMenu: React.FC<WidgetMenuProps> = ({
  onSelect,
  className
}) => {
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  const widgetOptions: WidgetOption[] = [
    {
      id: 'chart',
      title: 'chart widget',
      description: 'A widget for chart analytics.',
      icon: <BarChart3 className="w-4 h-4 text-white" />
    },
    {
      id: 'text',
      title: 'text widget',
      description: 'A widget for chart analytics.',
      icon: <Type className="w-4 h-4 text-white" />
    },
    {
      id: 'metrics',
      title: 'key metrics widget',
      description: 'A widget for chart analytics.',
      icon: <Hash className="w-4 h-4 text-white" />
    },
    {
      id: 'ai-recommendations',
      title: 'AI Recommendation widget',
      description: 'A widget for chart analytics.',
      icon: <Sparkles className="w-4 h-4 text-white" />
    },
    {
      id: 'custom',
      title: 'custom widget',
      description: 'A widget for chart analytics.',
      icon: <Settings className="w-4 h-4 text-white" />
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

  const handleSelect = (widgetId: string) => {
    onSelect(widgetId)
    setIsOpen(false)
  }

  return (
    <div className={cn("relative", className)} ref={dropdownRef}>
      {/* Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-accent text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-accent-hover transition-colors"
      >
        <Plus className="w-4 h-4" />
        <span className="text-sm font-medium capitalize">add widget</span>
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute top-full left-0 mt-2 bg-white border border-zinc-200 rounded-lg shadow-lg z-50 w-[400px] p-4">
          {/* Widget Options */}
          <div className="space-y-4">
            {widgetOptions.map((widget) => (
              <Card
                key={widget.id}
                className="p-4 hover:bg-gray-50 transition-colors cursor-pointer"
                onClick={() => handleSelect(widget.id)}
              >
                <div className="flex items-start gap-2">
                  {/* Widget Info */}
                  <div className="flex-1">
                    <h3 className="text-base font-medium text-accent capitalize leading-normal">
                      {widget.title}
                    </h3>
                    <p className="text-sm text-gray-600 mt-1.5 leading-5">
                      {widget.description}
                    </p>
                  </div>
                  
                  {/* Widget Icon */}
                  <div className="bg-accent p-2.5 rounded-lg flex-shrink-0">
                    {widget.icon}
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default WidgetMenu 
 
 
 
 
 
 