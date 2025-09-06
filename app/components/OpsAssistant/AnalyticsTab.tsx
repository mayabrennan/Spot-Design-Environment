'use client'

import { Sparkles } from 'lucide-react'
import { Card } from '@spotai/design-system'
import MetricsCards from '../UI/MetricsCards'
import ChartSection from '../UI/ChartSection'
import DataTable from '../UI/DataTable'
import FilterSearchFrame from '../UI/FilterSearchFrame'

export default function AnalyticsTab() {
  return (
    <div className="p-6">
      {/* Filter Search Frame - At top of analytics tab */}
      <div className="mb-6">
        <FilterSearchFrame />
      </div>

      {/* Metrics Cards */}
      <div className="mb-6">
        <MetricsCards />
      </div>

      {/* Charts and Data - Updated to 50/50 split with proper spacing and no overlap */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Chart Section - Now takes 50% with proper height */}
        <div className="min-h-[500px]">
          <ChartSection />
        </div>

        {/* Recommendations - Now takes 50% with proper spacing */}
        <div className="flex flex-col gap-4">
          <Card variant="default" className="flex-1">
            <h3 className="text-base font-medium text-accent mb-4">AI Recommendations</h3>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-5 h-5 bg-accent-light rounded-sm flex items-center justify-center mt-0.5 flex-shrink-0">
                  <Sparkles className="w-4 h-4 text-accent" />
                </div>
                <div>
                  <p className="text-base text-primary font-medium mb-1">Implement longer breaks between shifts</p>
                  <p className="text-sm text-gray-600 leading-relaxed">Consider extending break times to 15-20 minutes to reduce fatigue and improve overall performance quality. This has shown to increase accuracy by up to 23% in similar operations.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-5 h-5 bg-accent-light rounded-sm flex items-center justify-center mt-0.5 flex-shrink-0">
                  <Sparkles className="w-4 h-4 text-accent" />
                </div>
                <div>
                  <p className="text-base text-primary font-medium mb-1">Rotate team members more frequently</p>
                  <p className="text-sm text-gray-600 leading-relaxed">Implement a rotation schedule that switches team members every 2-3 hours. This prevents monotony and maintains high attention levels throughout the shift.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-5 h-5 bg-accent-light rounded-sm flex items-center justify-center mt-0.5 flex-shrink-0">
                  <Sparkles className="w-4 h-4 text-accent" />
                </div>
                <div>
                  <p className="text-base text-primary font-medium mb-1">Optimize workflow sequence</p>
                  <p className="text-sm text-gray-600 leading-relaxed">Reorganize the task sequence to group similar operations together. This reduces cognitive load and can improve efficiency by 15-20%.</p>
                </div>
              </div>
            </div>
          </Card>

          {/* Timeline Analysis */}
          <Card variant="default" className="flex-1">
            <h3 className="text-base font-medium text-accent mb-4">Timeline Analysis</h3>
            <div className="space-y-3">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-primary">Phase 1</span>
                </div>
                <div className="h-2 bg-gray-200 rounded-full">
                  <div className="h-2 bg-accent rounded-full" style={{ width: '85%' }}></div>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-primary">Phase 2</span>
                </div>
                <div className="h-2 bg-gray-200 rounded-full">
                  <div className="h-2 bg-accent rounded-full" style={{ width: '60%' }}></div>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-primary">Phase 3</span>
                </div>
                <div className="h-2 bg-gray-200 rounded-full">
                  <div className="h-2 bg-accent rounded-full" style={{ width: '92%' }}></div>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>

      {/* Data Table */}
      <div className="mb-6">
        <DataTable />
      </div>
    </div>
  )
} 