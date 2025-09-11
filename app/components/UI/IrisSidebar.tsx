'use client'

import { useState } from 'react'
import { 
  BarChart3, 
  LayoutGrid, 
  TrendingUp,
  ChevronRight,
  X,
  ArrowRightFromLine,
  ArrowLeftFromLine,
  PanelRightClose,
  ArrowUp
} from 'lucide-react'

interface IrisSidebarProps {
  onClose?: () => void
  onExpand?: () => void
}

export default function IrisSidebar({ onClose, onExpand }: IrisSidebarProps) {
  const [searchQuery, setSearchQuery] = useState('')
  const [isCollapsed, setIsCollapsed] = useState(false)
  const [showMessage, setShowMessage] = useState(false)

  const quickActions = [
    {
      icon: BarChart3,
      text: 'Summarize this report',
      color: 'text-orange-500'
    },
    {
      icon: LayoutGrid,
      text: 'What Times have the most events?',
      color: 'text-green-500'
    },
    {
      icon: TrendingUp,
      text: 'What are the outliers?',
      color: 'text-blue-500'
    }
  ]

  const handleExpand = () => {
    if (onExpand) {
      onExpand()
    }
  }

  const handleCollapse = () => {
    setIsCollapsed(!isCollapsed)
  }

  const handleButtonClick = () => {
    setShowMessage(true)
  }

  return (
    <div className={`bg-white border-l border-zinc-200 flex flex-col transition-all duration-300 ease-in-out flex-shrink-0 overflow-hidden ${
      isCollapsed ? 'w-16 h-[calc(100vh-80px)]' : 'w-[400px] h-[calc(100vh-80px)]'
    }`}>
      <div className="flex flex-col h-full pt-10 pb-6 px-6">
        {!isCollapsed && (
          <>
            <div className="flex flex-col gap-4 items-start justify-start w-full flex-1">
              {/* Header with Close Button */}
              <div className="w-full mb-8">
                <div className="flex justify-end w-full mb-2">
                  <button
                    onClick={onClose}
                    className="opacity-50 hover:opacity-100 transition-opacity p-1"
                  >
                    <PanelRightClose className="w-6 h-6 text-accent" />
                  </button>
                </div>
                <h1 className="text-lg font-medium text-accent text-left leading-normal mt-2">
                  Hi Rish,<br />
                  how can I help you today?
                </h1>
              </div>
              
              {/* Quick Actions */}
              <div className="flex flex-col gap-2 items-start justify-start w-full">
                {showMessage ? (
                  <div className="bg-accent-light flex flex-col items-center justify-center px-6 py-8 rounded-lg w-full text-center">
                    <div className="text-accent text-sm font-medium leading-relaxed">
                      Iris functionality hasn&apos;t been added to the design demo yet, but we&apos;re working on it!
                    </div>
                    <button
                      onClick={() => setShowMessage(false)}
                      className="mt-4 text-accent text-xs underline hover:no-underline transition-all duration-200"
                    >
                      Go back
                    </button>
                  </div>
                ) : (
                  quickActions.map((action, index) => (
                    <button
                      key={index}
                      onClick={handleButtonClick}
                      className="bg-accent-light hover:bg-accent flex flex-row h-10 items-center justify-start px-4 py-2 rounded-lg group transition-all duration-200 w-full"
                    >
                      <div className="flex flex-row gap-2.5 items-center justify-center pl-0 pr-2 py-0">
                        <action.icon className={`w-4 h-4 ${action.color} group-hover:text-white transition-colors`} />
                      </div>
                      <div className="flex flex-row gap-2.5 items-center justify-center">
                        <span className="text-sm font-medium text-accent group-hover:text-white transition-colors">
                          {action.text}
                        </span>
                      </div>
                    </button>
                  ))
                )}
              </div>
            </div>

            {/* Chat Input */}
            <div className="bg-accent-light flex flex-row items-center justify-between pt-20 px-4 pb-4 rounded-md w-full mt-auto">
              <div className="flex flex-row items-center justify-start flex-1">
                <input
                  type="text"
                  placeholder="Ask iris about your agents..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      handleButtonClick()
                    }
                  }}
                  className="bg-transparent flex-1 text-sm text-accent-hover placeholder-accent-hover outline-none font-normal"
                />
              </div>
              <button 
                onClick={handleButtonClick}
                className="bg-accent flex items-center justify-center p-1.5 rounded-md transition-all duration-200"
              >
                <ArrowUp className="w-4 h-4 text-white" />
              </button>
            </div>
          </>
        )}
        {isCollapsed && (
          <div className="flex items-center justify-center h-full">
            <button
              onClick={() => setIsCollapsed(false)}
              className="opacity-50 hover:opacity-100 transition-opacity p-1"
            >
              <ArrowLeftFromLine className="w-6 h-6 text-accent" />
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

