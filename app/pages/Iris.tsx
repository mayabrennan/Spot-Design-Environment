'use client'

import { useState } from 'react'
import { 
  BarChart3, 
  LayoutGrid, 
  TrendingUp,
  ChevronRight,
  Minimize2
} from 'lucide-react'


interface IrisProps {
  onMinimize?: () => void
}

export default function Iris({ onMinimize }: IrisProps) {
  const [searchQuery, setSearchQuery] = useState('')

  const quickActions = [
    {
      icon: BarChart3,
      text: 'Summarize this report'
    },
    {
      icon: LayoutGrid,
      text: 'What Times have the most events?'
    },
    {
      icon: TrendingUp,
      text: 'What are the outliers?'
    }
  ]



  return (
    <div className="flex h-full w-full">
      {/* Main Content */}
      <div className="bg-accent-light bg-opacity-25 flex flex-col items-center justify-between flex-1 relative transition-all duration-700 ease-in-out">
        {/* Minimize Button */}
              <button
          onClick={onMinimize}
          className="absolute top-6 right-6 opacity-50 hover:opacity-100 transition-opacity p-2 z-10"
              >
          <Minimize2 className="w-6 h-6 text-accent" />
              </button>

        <div className="flex flex-col items-center justify-center flex-1 w-full max-w-4xl px-6">
          {/* Main Content */}
          <div className="flex flex-col gap-10 items-center justify-start w-full">
            {/* Title */}
            <h1 className="text-3xl font-medium text-accent text-center">
                Hi Rish, how can I help you today?
            </h1>

              {/* Quick Actions */}
            <div className="flex flex-col gap-2 items-start justify-start w-full">
                {quickActions.map((action, index) => (
                  <button
                    key={index}
                  className="bg-accent-light flex flex-row h-10 items-center justify-start px-4 py-2 rounded-lg hover:bg-accent group transition-colors w-full"
                >
                  <div className="flex flex-row gap-2.5 items-center justify-center pl-0 pr-2 py-0">
                    <action.icon className="w-4 h-4 text-accent group-hover:text-white" />
                  </div>
                  <div className="flex flex-row gap-2.5 items-center justify-center">
                    <span className="text-sm font-medium text-accent capitalize group-hover:text-white">
                      {action.text}
                    </span>
                  </div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Chat Input */}
        <div className="bg-accent-light flex flex-row items-start justify-between pb-4 pt-20 px-4 rounded-md w-full max-w-4xl mx-6 mb-6">
              <input
                type="text"
            placeholder="Ask iris about your agents..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="flex-1 bg-transparent text-accent placeholder-accent-hover text-sm focus:outline-none capitalize"
              />
          <button className="bg-accent flex flex-col gap-2.5 items-center justify-center p-1.5 rounded-md hover:bg-accent-hover transition-colors">
            <ChevronRight className="w-4 h-4 text-white" />
              </button>
        </div>
      </div>
    </div>
  )
} 