'use client'

import { useState } from 'react'
import { 
  Search, 
  Filter,
  Sparkles
} from 'lucide-react'
import { Card, MetricsCard, SearchInput, ActionMenu, WidgetMenu, ChartWidgetDialog } from '@spotai/design-system'

interface DashboardTabProps {
  dateRange: string
}

export default function DashboardTab({ dateRange }: DashboardTabProps) {
  const [showChartDialog, setShowChartDialog] = useState(false)
  
  const handleActionSelect = (action: string, cardType: string) => {
    console.log(`Action "${action}" selected for ${cardType}`)
    // Handle different actions here
    switch (action) {
      case 'ask-iris':
        // Open Iris sidebar or navigate to Iris
        break
      case 'edit':
        // Open edit modal or navigate to edit page
        break
      case 'duplicate':
        // Duplicate the card/data
        break
      case 'delete':
        // Show delete confirmation
        break
      default:
        break
    }
  }

  const handleWidgetSelect = (widgetId: string) => {
    console.log(`Widget "${widgetId}" selected`)
    // Handle different widget selections here
    switch (widgetId) {
      case 'chart':
        setShowChartDialog(true)
        break
      case 'text':
        // Add text widget
        break
      case 'metrics':
        // Add metrics widget
        break
      case 'ai-recommendations':
        // Add AI recommendations widget
        break
      case 'custom':
        // Add custom widget
        break
      default:
        break
    }
  }

  return (
    <>
      {/* Main Content with Grey Background */}
      <div className="bg-neutral-100 -mx-6 px-6 py-6">
        {/* Search and Filter Bar */}
        <div className="flex items-center gap-4 mb-6">
          <div className="flex items-center gap-2">
            <WidgetMenu onSelect={handleWidgetSelect} />
          </div>
          <div className="flex-1 flex items-center gap-4">
            <div className="flex-1">
              <SearchInput placeholder="Search" />
            </div>
            <button className="bg-white border border-zinc-200 rounded-lg px-4 py-2 flex items-center gap-2 hover:bg-gray-50 transition-colors">
              <Filter className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-primary capitalize">filter</span>
            </button>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 w-full mb-6">
          {/* Key Metrics Cards */}
          <MetricsCard
            title="key metrics"
            value="3.2/4"
            subtitle="Events compared."
            variant="success"
            onActionSelect={(action) => handleActionSelect(action, 'metrics-1')}
          />
          
          <MetricsCard
            title="key metrics"
            value="3.8/4"
            subtitle="Events compared."
            variant="default"
            onActionSelect={(action) => handleActionSelect(action, 'metrics-2')}
          />
          
          <MetricsCard
            title="key metrics"
            value="3.8/4"
            subtitle="Events compared."
            variant="warning"
            onActionSelect={(action) => handleActionSelect(action, 'metrics-3')}
          />
        </div>

        {/* Charts and Recommendations Row */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 w-full mb-6">
          {/* Bar Chart */}
          <Card className="p-4 lg:col-span-1">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-base font-medium text-primary capitalize">bar chart</h3>
                <p className="text-sm text-gray-600 mt-1.5">Events compared.</p>
              </div>
              <ActionMenu 
                onSelect={(action) => handleActionSelect(action, 'bar-chart')}
              />
            </div>
            <div className="space-y-4">
              {/* Custom Bar Chart */}
              <div className="h-64 flex">
                {/* Y-axis labels */}
                <div className="w-16 flex flex-col justify-between pb-4">
                  <div className="text-xs text-gray-600">3h</div>
                  <div className="text-xs text-gray-600">2h30</div>
                  <div className="text-xs text-gray-600">2h</div>
                  <div className="text-xs text-gray-600">1h30</div>
                  <div className="text-xs text-gray-600">1h</div>
                  <div className="text-xs text-gray-600">30m</div>
                </div>
                
                {/* Chart area */}
                <div className="flex-1 flex flex-col">
                  {/* Chart bars */}
                  <div className="flex-1 flex items-end justify-between gap-4 px-4">
                    <div className="flex-1 flex flex-col items-center">
                      <div className="w-full bg-accent rounded-t" style={{ height: '85%', minHeight: '60px' }}></div>
                    </div>
                    <div className="flex-1 flex flex-col items-center">
                      <div className="w-full bg-accent rounded-t" style={{ height: '95%', minHeight: '60px' }}></div>
                    </div>
                    <div className="flex-1 flex flex-col items-center">
                      <div className="w-full bg-accent rounded-t" style={{ height: '70%', minHeight: '60px' }}></div>
                    </div>
                  </div>
                  
                  {/* X-axis labels */}
                  <div className="flex justify-between px-4 pt-2">
                    <div className="text-xs text-gray-600">2h</div>
                    <div className="text-xs text-gray-600">3h</div>
                    <div className="text-xs text-gray-600">Phase 3</div>
                  </div>
                </div>
              </div>
            </div>
          </Card>

          {/* AI Recommendations */}
          <Card className="p-4 lg:col-span-2">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-base font-medium text-primary capitalize">AI Recommendations</h3>
                <p className="text-sm text-gray-600 mt-1.5">Events compared.</p>
              </div>
              <ActionMenu 
                onSelect={(action) => handleActionSelect(action, 'ai-recommendations')}
              />
            </div>
            <div className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-start gap-2">
                  <div className="bg-accent-light p-2 rounded-sm mt-1">
                    <Sparkles className="w-4 h-4 text-accent" />
                  </div>
                  <div className="flex-1">
                    <span className="text-sm font-medium text-primary capitalize block mb-2">
                      Try implementing longer breaks between shifts.
                    </span>
                    <p className="text-sm text-gray-600 leading-relaxed">
                      Analysis shows that operators experience decreased efficiency after 2+ hours of continuous work. 
                      Implementing 15-minute breaks every 2 hours could improve overall productivity by 12-18%.
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-start gap-2">
                  <div className="bg-accent-light p-2 rounded-sm mt-1">
                    <Sparkles className="w-4 h-4 text-accent" />
                  </div>
                  <div className="flex-1">
                    <span className="text-sm font-medium text-primary capitalize block mb-2">
                      Introduce a standardized checklist for equipment setup
                    </span>
                    <p className="text-sm text-gray-600 leading-relaxed">
                      Current setup procedures vary between operators, leading to inconsistent quality and longer setup times. 
                      A standardized checklist could reduce setup time by 25% and improve first-pass yield by 8%.
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-start gap-2">
                  <div className="bg-accent-light p-2 rounded-sm mt-1">
                    <Sparkles className="w-4 h-4 text-accent" />
                  </div>
                  <div className="flex-1">
                    <span className="text-sm font-medium text-primary capitalize block mb-2">
                      Switch order of manual labelling and material inspection tasks
                    </span>
                    <p className="text-sm text-gray-600 leading-relaxed">
                      Current workflow has operators performing inspection after labelling, which can cause delays. 
                      Reversing this order could reduce cycle time by 15% and improve material flow efficiency.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Timelines */}
        <Card className="p-4 w-full">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h3 className="text-base font-medium text-primary capitalize">timelines</h3>
              <p className="text-sm text-gray-600 mt-1.5">Events compared.</p>
            </div>
            <ActionMenu 
              onSelect={(action) => handleActionSelect(action, 'timelines')}
            />
          </div>
          <div className="space-y-4">
            {/* Phase 1 */}
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <div className="px-2 py-1 bg-gray-100 rounded-md">
                  <span className="text-sm font-medium text-primary capitalize">phase 1</span>
                </div>
              </div>
              <div className="px-2">
                <div className="h-0.5 bg-zinc-200 w-full"></div>
                <div className="h-0.5 bg-accent w-3/4 mt-[-2px]"></div>
              </div>
            </div>

            {/* Phase 2 */}
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <div className="px-2 py-1 bg-gray-100 rounded-md">
                  <span className="text-sm font-medium text-primary capitalize">phase 2</span>
                </div>
              </div>
              <div className="px-2">
                <div className="h-0.5 bg-zinc-200 w-full"></div>
                <div className="h-0.5 bg-accent w-2/3 mt-[-2px]"></div>
              </div>
            </div>

            {/* Phase 3 */}
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <div className="px-2 py-1 bg-gray-100 rounded-md">
                  <span className="text-sm font-medium text-primary capitalize">phase 3</span>
                </div>
              </div>
              <div className="px-2">
                <div className="h-0.5 bg-zinc-200 w-full"></div>
                <div className="h-0.5 bg-accent w-1/4 mt-[-2px]"></div>
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* Chart Widget Dialog */}
      <ChartWidgetDialog
        isOpen={showChartDialog}
        onClose={() => setShowChartDialog(false)}
        onSave={(config) => {
          console.log('Chart widget config saved:', config)
          setShowChartDialog(false)
        }}
        onDelete={() => {
          console.log('Chart widget deleted')
          setShowChartDialog(false)
        }}
      />
    </>
  )
} 