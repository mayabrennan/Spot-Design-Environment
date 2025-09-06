'use client'

import { useState } from 'react'
import { 
  Calendar,
  Clock,
  Play,
  Pause,
  Plus,
  CheckCircle,
  XCircle,
  FileText,
  TrendingUp,
  Activity,
  BarChart3,
  PieChart,
  Eye
} from 'lucide-react'
import { ActionMenu, Card } from '@spotai/design-system'

interface ScheduledTabProps {
  dateRange: string
}

interface ScheduledItem {
  id: string
  name: string
  type: 'report' | 'insight' | 'automation'
  frequency: 'daily' | 'weekly' | 'monthly' | 'custom'
  nextRun: string
  status: 'active' | 'paused' | 'error'
  lastRun?: string
  description: string
}

export default function ScheduledTab({ dateRange }: ScheduledTabProps) {
  const [scheduledItems, setScheduledItems] = useState<ScheduledItem[]>([
    {
      id: '1',
      name: 'Daily Operations Summary',
      type: 'report',
      frequency: 'daily',
      nextRun: 'Tomorrow at 9:00 AM',
      status: 'active',
      lastRun: 'Today at 9:00 AM',
      description: 'Automated daily summary of all operations metrics and KPIs'
    },
    {
      id: '2',
      name: 'Weekly Performance Review',
      type: 'insight',
      frequency: 'weekly',
      nextRun: 'Monday at 8:00 AM',
      status: 'active',
      lastRun: 'Last Monday at 8:00 AM',
      description: 'Weekly analysis of team performance and efficiency trends'
    },
    {
      id: '3',
      name: 'Monthly Compliance Check',
      type: 'automation',
      frequency: 'monthly',
      nextRun: 'March 1st at 10:00 AM',
      status: 'paused',
      lastRun: 'February 1st at 10:00 AM',
      description: 'Monthly automated compliance verification and reporting'
    },
    {
      id: '4',
      name: 'Anomaly Detection Alert',
      type: 'automation',
      frequency: 'custom',
      nextRun: 'Continuous monitoring',
      status: 'active',
      description: 'Real-time monitoring for operational anomalies and alerts'
    },
    {
      id: '5',
      name: 'Quarterly Business Review',
      type: 'report',
      frequency: 'monthly',
      nextRun: 'March 31st at 2:00 PM',
      status: 'error',
      lastRun: 'February 28th at 2:00 PM',
      description: 'Quarterly comprehensive business performance analysis'
    }
  ])

  const handleActionSelect = (action: string, itemId: string) => {
    console.log(`Action "${action}" selected for item ${itemId}`)
    
    switch (action) {
      case 'ask-iris':
        // Open Iris sidebar or navigate to Iris
        break
      case 'edit':
        // Open edit modal
        break
      case 'duplicate':
        // Duplicate the scheduled item
        const itemToDuplicate = scheduledItems.find(item => item.id === itemId)
        if (itemToDuplicate) {
          const newItem = {
            ...itemToDuplicate,
            id: Date.now().toString(),
            name: `${itemToDuplicate.name} (Copy)`,
            status: 'paused' as const
          }
          setScheduledItems(prev => [...prev, newItem])
        }
        break
      case 'delete':
        setScheduledItems(prev => prev.filter(item => item.id !== itemId))
        break
      default:
        break
    }
  }

  const handlePreview = (itemId: string) => {
    console.log(`Preview requested for item ${itemId}`)
    // Handle preview functionality here
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'report':
        return FileText
      case 'insight':
        return TrendingUp
      case 'automation':
        return Activity
      default:
        return FileText
    }
  }

  const getFrequencyLabel = (frequency: string) => {
    switch (frequency) {
      case 'daily':
        return 'Daily'
      case 'weekly':
        return 'Weekly'
      case 'monthly':
        return 'Monthly'
      case 'custom':
        return 'Custom'
      default:
        return frequency
    }
  }

  return (
    <>
      {/* Main Content with Grey Background */}
      <div className="bg-neutral-100 -mx-6 px-6 py-6">
        {/* Scheduled Items List - Full Width */}
        <div className="space-y-4">
          {scheduledItems.map((item) => {
            const IconComponent = getTypeIcon(item.type)
            return (
              <Card key={item.id} className="p-6 hover:border-accent hover:border-2 transition-colors cursor-pointer">
                <div className="space-y-4">
                  {/* Header */}
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-accent-light rounded-lg">
                        <IconComponent className="w-5 h-5 text-accent" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-primary text-base capitalize">
                          {item.name}
                        </h3>
                      </div>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-sm text-gray-600 leading-5">
                    {item.description}
                  </p>

                  {/* Footer */}
                  <div className="flex items-center justify-between pt-2 border-t border-gray-100">
                    <div className="flex items-center gap-6 text-sm">
                      <div className="flex items-center gap-2">
                        <span className="text-gray-500">Frequency:</span>
                        <span className="font-medium text-primary">{getFrequencyLabel(item.frequency)}</span>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <span className="text-gray-500">Next Run:</span>
                        <span className="font-medium text-primary">{item.nextRun}</span>
                      </div>
                      
                      {item.lastRun && (
                        <div className="flex items-center gap-2">
                          <span className="text-gray-500">Last Run:</span>
                          <span className="font-medium text-primary">{item.lastRun}</span>
                        </div>
                      )}
                    </div>
                    
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => handlePreview(item.id)}
                        className="bg-accent hover:bg-accent-hover text-white px-3 py-1.5 rounded-lg text-sm font-medium flex items-center gap-2 transition-colors"
                      >
                        <Eye className="w-4 h-4" />
                        Preview
                      </button>
                      
                      <ActionMenu 
                        onSelect={(action) => handleActionSelect(action, item.id)}
                      />
                    </div>
                  </div>
                </div>
              </Card>
            )
          })}
        </div>

        {/* Empty State (when no items) */}
        {scheduledItems.length === 0 && (
          <div className="bg-white rounded-lg border border-zinc-200 p-12 text-center">
            <div className="flex flex-col items-center gap-4">
              <div className="p-3 bg-gray-100 rounded-full">
                <Clock className="w-8 h-8 text-gray-400" />
              </div>
              <div>
                <h3 className="text-lg font-medium text-primary mb-2">No Scheduled Items</h3>
                <p className="text-sm text-gray-600 mb-4">
                  Get started by creating your first scheduled report or automation workflow
                </p>
                <button className="bg-accent hover:bg-accent-hover text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 mx-auto">
                  <Plus className="w-4 h-4" />
                  Create First Schedule
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  )
} 