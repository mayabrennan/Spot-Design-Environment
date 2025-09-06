'use client'

import { useState } from 'react'
import { 
  ChevronRight,
  Calendar,
  LayoutDashboard,
  Clock
} from 'lucide-react'
import { Tabs } from '@spotai/design-system'
import DashboardTab from '../components/Insights/DashboardTab'
import ScheduledTab from '../components/Insights/ScheduledTab'

export default function Reports() {
  const [dateRange, setDateRange] = useState('Jan 20, 2024 - Feb 09, 2024')
  const [activeTab, setActiveTab] = useState('dashboard')
  
  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId)
  }

  const renderTabContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <DashboardTab dateRange={dateRange} />
      case 'scheduled':
        return <ScheduledTab dateRange={dateRange} />
      default:
        return <DashboardTab dateRange={dateRange} />
    }
  }

  return (
    <div className="w-full h-full min-w-0 overflow-y-auto">
      {/* Page Header - Full width, no top gap */}
      <div className="bg-white border-b border-zinc-200">
        <div className="px-6 py-6">
          {/* Breadcrumbs */}
          <div className="flex items-center gap-2 mb-4">
            <span className="text-sm font-medium text-gray-600 capitalize">AI Ops Assistant</span>
            <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
            <span className="text-sm font-medium text-primary capitalize">insights</span>
          </div>
          
          {/* Page Title and Date Range */}
          <div className="flex items-end justify-between">
            <div>
              <h1 className="text-xl font-semibold text-primary capitalize pb-4">insights</h1>
            </div>
            <div className="flex items-center gap-2 pb-4">
              <div className="bg-white border border-zinc-200 rounded-lg px-4 py-2 flex items-center gap-2">
                <Calendar className="w-4 h-4 text-gray-400" />
                <span className="text-sm font-medium text-primary capitalize">{dateRange}</span>
              </div>
            </div>
          </div>
            </div>
          </div>

      {/* Tabs - Full width */}
      <div className="bg-white border-b border-zinc-200">
        <div className="px-6">
          <Tabs
            items={[
              {
                id: 'dashboard',
                label: 'Dashboard',
                icon: LayoutDashboard
              },
              {
                id: 'scheduled',
                label: 'Scheduled',
                icon: Clock
              }
            ]}
            activeTab={activeTab}
            onTabChange={handleTabChange}
              variant="default"
            />
                      </div>
                    </div>
                    
      {/* Main Content Area */}
      <div className="w-full p-6 min-w-0">
        {/* Tab Content */}
        {renderTabContent()}
      </div>
    </div>
  )
} 