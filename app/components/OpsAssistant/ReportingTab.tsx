'use client'

import { useState } from 'react'
import { 
  Download, 
  Calendar, 
  TrendingUp, 
  FileText, 
  BarChart3, 
  PieChart, 
  Activity,
  Filter,
  Search
} from 'lucide-react'
import { Card, Button, SearchInput, Modal } from '@spotai/design-system'
import ReportingTabPreview from './ReportingTabPreview'

export default function ReportingTab() {
  const [isManageScheduleModalOpen, setIsManageScheduleModalOpen] = useState(false)
  const [showPreview, setShowPreview] = useState(false)
  
  const reportCards = [
    {
      id: 'compliance',
      title: 'SOP Compliance Report',
      description: 'Detailed analysis of standard operating procedure adherence across all operations',
      icon: FileText,
      lastGenerated: '2 hours ago',
      status: 'Ready'
    },
    {
      id: 'performance',
      title: 'Performance Analytics',
      description: 'Comprehensive performance metrics and KPI tracking for operational efficiency',
      icon: TrendingUp,
      lastGenerated: '1 day ago',
      status: 'Ready'
    },
    {
      id: 'incidents',
      title: 'Incident Summary',
      description: 'Safety incidents, violations, and corrective actions taken during operations',
      icon: Activity,
      lastGenerated: '3 hours ago',
      status: 'Ready'
    },
    {
      id: 'productivity',
      title: 'Productivity Dashboard',
      description: 'Real-time and historical productivity metrics across all stations and shifts',
      icon: BarChart3,
      lastGenerated: '30 minutes ago',
      status: 'Ready'
    },
    {
      id: 'quality',
      title: 'Quality Metrics',
      description: 'Quality control statistics, defect rates, and improvement recommendations',
      icon: PieChart,
      lastGenerated: '1 hour ago',
      status: 'Ready'
    },
    {
      id: 'custom',
      title: 'Custom Reports',
      description: 'Build and schedule custom reports tailored to specific operational needs',
      icon: FileText,
      lastGenerated: 'N/A',
      status: 'Configure'
    }
  ]



  if (showPreview) {
    return <ReportingTabPreview onClose={() => setShowPreview(false)} />
  }

  return (
    <div className="h-full bg-neutral-100">
      <div className="p-6 space-y-6">
        


        {/* Search and Filter */}
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="flex-1">
            <SearchInput 
              placeholder="Search reports..." 
              className="w-full"
            />
          </div>
          <Button variant="outline">
            <Filter className="w-4 h-4" />
            Filter
          </Button>
        </div>

        {/* Report Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {reportCards.map((report) => (
            <Card key={report.id} className="p-6 hover:border-accent hover:border-2 transition-colors cursor-pointer">
              <div className="space-y-4">
                {/* Header */}
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-accent-light rounded-lg">
                      <report.icon className="w-5 h-5 text-accent" />
                    </div>
                                               <div>
                             <h3 className="font-semibold text-primary text-base capitalize">
                               {report.title}
                             </h3>
                           </div>
                  </div>
                </div>

                {/* Description */}
                <p className="text-sm text-gray-600 leading-5">
                  {report.description}
                </p>

                {/* Footer */}
                <div className="flex items-center justify-between pt-2 border-t border-gray-100">
                  <span className="text-xs text-gray-500">
                    Last generated: {report.lastGenerated}
                  </span>
                  <div className="flex gap-2">
                    {report.status === 'Ready' && (
                      <Button variant="outline" size="sm">
                        <Download className="w-3 h-3" />
                        Download
                      </Button>
                    )}
                                               <Button 
                             variant="primary" 
                             size="sm"
                             onClick={() => {
                               if (report.id === 'compliance' && report.status === 'Ready') {
                                 setShowPreview(true)
                               }
                             }}
                           >
                             {report.status === 'Ready' ? 'View' : 'Configure'}
                           </Button>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Scheduled Reports Section */}
        <Card className="p-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-primary text-lg capitalize">
                Scheduled Reports
              </h3>
              <Button variant="outline" onClick={() => setIsManageScheduleModalOpen(true)}>
                <Calendar className="w-4 h-4" />
                Manage Schedule
              </Button>
            </div>
            
            <div className="space-y-3">
              {[
                { name: 'Daily Compliance Summary', frequency: 'Daily at 6:00 AM', nextRun: 'Tomorrow, 6:00 AM' },
                { name: 'Weekly Performance Report', frequency: 'Weekly on Monday', nextRun: 'Monday, 9:00 AM' },
                { name: 'Monthly Analytics Dashboard', frequency: 'Monthly on 1st', nextRun: 'Dec 1, 2024' }
              ].map((schedule, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium text-primary text-sm capitalize">{schedule.name}</p>
                    <p className="text-xs text-gray-600">{schedule.frequency}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-gray-500">Next run:</p>
                    <p className="text-sm font-medium text-primary">{schedule.nextRun}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Card>

        {/* Manage Schedule Modal */}
        <Modal
          isOpen={isManageScheduleModalOpen}
          onClose={() => setIsManageScheduleModalOpen(false)}
          title="Manage Schedule"
          size="md"
        >
          <div className="space-y-6">
            {/* Current Scheduled Reports */}
            <div>
              <h3 className="font-semibold text-primary text-base mb-4">Current Scheduled Reports</h3>
              <div className="space-y-3">
                {[
                  { 
                    id: 1,
                    name: 'Daily Compliance Summary', 
                    frequency: 'Daily at 6:00 AM', 
                    nextRun: 'Tomorrow, 6:00 AM',
                    enabled: true 
                  },
                  { 
                    id: 2,
                    name: 'Weekly Performance Report', 
                    frequency: 'Weekly on Monday', 
                    nextRun: 'Monday, 9:00 AM',
                    enabled: true 
                  },
                  { 
                    id: 3,
                    name: 'Monthly Analytics Dashboard', 
                    frequency: 'Monthly on 1st', 
                    nextRun: 'Dec 1, 2024',
                    enabled: false 
                  }
                ].map((schedule) => (
                  <div key={schedule.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <input
                        type="checkbox"
                        checked={schedule.enabled}
                        onChange={() => {}}
                        className="w-4 h-4 text-accent border-gray-300 rounded focus:ring-accent"
                      />
                      <div>
                        <p className="font-medium text-primary text-sm">{schedule.name}</p>
                        <p className="text-xs text-gray-600">{schedule.frequency}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="text-right">
                        <p className="text-xs text-gray-500">Next run:</p>
                        <p className="text-sm font-medium text-primary">{schedule.nextRun}</p>
                      </div>
                      <Button variant="ghost" size="sm">
                        <span className="text-xs">Edit</span>
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Add New Schedule */}
            <div className="border-t pt-6">
              <h3 className="font-semibold text-primary text-base mb-4">Add New Schedule</h3>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-primary mb-2">Report Type</label>
                    <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent">
                      <option>Select report type...</option>
                      <option>SOP Compliance Report</option>
                      <option>Performance Analytics</option>
                      <option>Incident Summary</option>
                      <option>Productivity Dashboard</option>
                      <option>Quality Metrics</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-primary mb-2">Frequency</label>
                    <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent">
                      <option>Select frequency...</option>
                      <option>Daily</option>
                      <option>Weekly</option>
                      <option>Monthly</option>
                      <option>Quarterly</option>
                    </select>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-primary mb-2">Time</label>
                    <input
                      type="time"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent"
                      defaultValue="09:00"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-primary mb-2">Recipients</label>
                    <input
                      type="email"
                      placeholder="Enter email addresses..."
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Modal Actions */}
            <div className="flex justify-end gap-3 pt-6 border-t">
              <Button variant="outline" onClick={() => setIsManageScheduleModalOpen(false)}>
                Cancel
              </Button>
              <Button variant="primary">
                Save Schedule
              </Button>
            </div>
          </div>
        </Modal>
      </div>
    </div>
  )
} 