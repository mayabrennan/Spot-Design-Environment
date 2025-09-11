import React, { useState } from 'react'
import { cn } from '../utils/classNames'
import { LucideIcon } from 'lucide-react'

export interface TabItem {
  id: string
  label: string
  icon?: LucideIcon
  disabled?: boolean
}

export interface TabsProps {
  items: TabItem[]
  activeTab?: string
  onTabChange?: (tabId: string) => void
  variant?: 'default' | 'pills' | 'underline'
  size?: 'sm' | 'md' | 'lg'
  children?: React.ReactNode
}

const Tabs: React.FC<TabsProps> = ({
  items,
  activeTab,
  onTabChange,
  variant = 'default',
  size = 'md',
  children
}) => {
  const [internalActiveTab, setInternalActiveTab] = useState(activeTab || items[0]?.id)

  const handleTabChange = (tabId: string) => {
    setInternalActiveTab(tabId)
    onTabChange?.(tabId)
  }

  const currentActiveTab = activeTab !== undefined ? activeTab : internalActiveTab

  const defaultVariant = {
    container: 'bg-white w-full border-b border-zinc-200',
    tab: 'flex flex-row items-end justify-start',
    tabItem: 'flex flex-col gap-2 h-full items-center justify-center px-6 py-4 relative shrink-0',
    tabWrapper: 'flex flex-col gap-2.5 h-full items-start justify-center pl-1 pr-0 py-0 relative shrink-0',
    tabButton: 'flex gap-2.5 items-center justify-center relative shrink-0',
    inactive: 'opacity-50'
  }

  const otherVariants = {
    pills: {
      container: 'flex space-x-1',
      tab: 'px-4 py-2 text-sm font-medium rounded-lg transition-colors',
      active: 'bg-accent text-white',
      inactive: 'text-gray-600 hover:text-primary hover:bg-gray-100'
    },
    underline: {
      container: 'border-b border-gray-200',
      tab: 'px-6 py-4 text-sm font-medium border-b-2 transition-colors',
      active: 'border-primary text-primary',
      inactive: 'border-transparent text-gray-600 hover:text-primary'
    }
  }

  const sizes = {
    sm: 'text-xs',
    md: 'text-sm',
    lg: 'text-base'
  }

  // Use custom structure for default variant to match Figma design exactly
  if (variant === 'default') {
    return (
      <div>
        {/* Tab Navigation */}
        <div className={defaultVariant.container}>
          <div className={defaultVariant.tab}>
            {items.map((item, index) => (
              <div key={item.id} className="flex flex-row items-end self-stretch">
                {index > 0 && index < items.length - 1 ? (
                  <div className={defaultVariant.tabWrapper}>
                    <div 
                      className={defaultVariant.tabItem}
                    >
                      {currentActiveTab === item.id && (
                        <div className="absolute border-[#5857e8] border-[0px_0px_2px] border-solid inset-0 pointer-events-none" />
                      )}
                      <button
                        onClick={() => !item.disabled && handleTabChange(item.id)}
                        disabled={item.disabled}
                        className={cn(
                          defaultVariant.tabButton,
                          currentActiveTab === item.id ? 'opacity-100' : defaultVariant.inactive,
                          item.disabled ? 'cursor-not-allowed' : 'cursor-pointer'
                        )}
                      >
                        <div className="overflow-clip relative shrink-0 size-4">
                          {item.icon && (
                            <item.icon 
                              className={cn(
                                'w-4 h-4',
                                currentActiveTab === item.id ? 'text-accent' : 'text-primary'
                              )} 
                            />
                          )}
                        </div>
                        <div className={cn(
                          'capitalize font-medium leading-[0] not-italic relative shrink-0 text-xs text-nowrap',
                          currentActiveTab === item.id ? 'text-accent' : 'text-primary'
                        )}>
                          <p className="leading-[16px] whitespace-pre">{item.label}</p>
                        </div>
                      </button>
                    </div>
                  </div>
                ) : (
                  <div 
                    className={defaultVariant.tabItem}
                  >
                     {currentActiveTab === item.id && (
                       <div className="absolute border-[#5857e8] border-[0px_0px_2px] border-solid inset-0 pointer-events-none" />
                     )}
                    <button
                      onClick={() => !item.disabled && handleTabChange(item.id)}
                      disabled={item.disabled}
                      className={cn(
                        defaultVariant.tabButton,
                        currentActiveTab === item.id ? 'opacity-100' : defaultVariant.inactive,
                        item.disabled ? 'cursor-not-allowed' : 'cursor-pointer'
                      )}
                    >
                      <div className="overflow-clip relative shrink-0 size-4">
                        {item.icon && (
                          <item.icon 
                            className={cn(
                              'w-4 h-4',
                              currentActiveTab === item.id ? 'text-accent' : 'text-primary'
                            )} 
                          />
                        )}
                      </div>
                      <div className={cn(
                        'capitalize font-medium leading-[0] not-italic relative shrink-0 text-xs text-nowrap',
                        currentActiveTab === item.id ? 'text-accent' : 'text-primary'
                      )}>
                        <p className="leading-[16px] whitespace-pre">{item.label}</p>
                      </div>
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Tab Content */}
        {children && (
          <div className="mt-4">
            {children}
          </div>
        )}
      </div>
    )
  }

  // Fallback to original implementation for other variants
  const currentVariant = otherVariants[variant as keyof typeof otherVariants]

  return (
    <div>
      {/* Tab Navigation */}
      <div className={currentVariant.container}>
        <div className="flex">
          {items.map((item) => (
            <button
              key={item.id}
              onClick={() => !item.disabled && handleTabChange(item.id)}
              disabled={item.disabled}
              className={cn(
                currentVariant.tab,
                sizes[size],
                currentActiveTab === item.id ? currentVariant.active : currentVariant.inactive,
                item.disabled && 'opacity-50 cursor-not-allowed'
              )}
            >
              <div className="flex items-center gap-2">
                {item.icon && <span className="flex-shrink-0"><item.icon className="w-4 h-4" /></span>}
                <span>{item.label}</span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Tab Content */}
      {children && (
        <div className="mt-4">
          {children}
        </div>
      )}
    </div>
  )
}

export default Tabs 