'use client'

import { useState } from 'react'
import { Search, FileBarChart2, MoreHorizontal, Download, Eye } from 'lucide-react'
import { Card, Badge } from '@spotai/design-system'
import ReportExpandedPanel from './ReportExpandedPanel'

interface ReportsPanelProps {
  onTaskClick?: () => void
}

export default function ReportsPanel({ onTaskClick }: ReportsPanelProps) {
  const [selectedReport, setSelectedReport] = useState<number | null>(null)

  const reports = [
    {
      id: 1,
      title: 'Report #1',
      description: 'Market trend analysis and competitive landscape overview for the APAC region',
      date: '04/01/2025'
    },
    {
      id: 5,
      title: 'Report #5',
      description: 'Annual customer satisfaction survey results and sentiment analysis',
      date: '03/20/2025'
    },
    {
      id: 6,
      title: 'Report #6',
      description: 'Supply chain logistics and efficiency audit for H2 2024',
      date: '02/28/2025'
    }
  ]

  const handleViewReport = (reportId: number) => {
    setSelectedReport(reportId)
  }

  const handleBackToReports = () => {
    setSelectedReport(null)
  }

  // Show expanded panel if a report is selected
  if (selectedReport) {
    return <ReportExpandedPanel onBack={handleBackToReports} onTaskClick={onTaskClick} />
  }

  return (
    <div className="w-[400px] bg-accent-light bg-opacity-25 border border-zinc-200 flex flex-col h-full p-4">
      {/* Header with Toggle Group and Create Report Button */}
      <div className="flex items-center justify-between mb-4">
        <div className="bg-white rounded-md p-1 flex border border-zinc-200">
          <button className="px-3 py-1.5 text-sm font-medium text-accent capitalize rounded-sm bg-accent-light">
            reports
          </button>
          <button className="px-3 py-1.5 text-sm font-medium text-primary-hover capitalize rounded-sm">
            feed
          </button>
        </div>
        <button className="bg-accent text-white flex items-center gap-2 px-5 py-3 rounded-lg">
          <FileBarChart2 className="w-4 h-4" />
          <span className="text-sm font-medium capitalize">create report</span>
        </button>
      </div>

      {/* Reports List */}
      <div className="flex flex-col gap-4 h-full overflow-y-auto">
        {reports.map((report) => (
          <Card key={report.id} variant="default">
            <div className="flex flex-col gap-4">
              <h3 className="text-base font-medium text-primary capitalize">
                {report.title}
              </h3>
              <p className="text-sm text-primary">
                {report.description}
              </p>
              <div className="flex items-center justify-between">
                <span className="text-sm text-primary-hover">
                  {report.date}
                </span>
                <div className="flex items-center gap-2">
                  <button className="bg-white border border-zinc-200 p-2.5 rounded-lg">
                    <MoreHorizontal className="w-4 h-4 text-primary" />
                  </button>
                  <button className="bg-accent text-white p-2.5 rounded-lg">
                    <Download className="w-4 h-4" />
                  </button>
                  <button 
                    className="bg-primary text-white flex items-center gap-2 px-4 py-2 rounded-lg"
                    onClick={() => handleViewReport(report.id)}
                  >
                    <Eye className="w-4 h-4" />
                    <span className="text-sm font-medium capitalize">view</span>
                  </button>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
} 
 


