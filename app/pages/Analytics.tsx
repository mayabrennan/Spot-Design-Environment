'use client'

import { useState } from 'react'
import { ArrowUpDown, Filter, MoreHorizontal, ChevronRight, ChevronLeft, ChevronDown, Calendar } from 'lucide-react'
import { SearchInput, Badge, Button, ActionMenu, Card, MetricsCard, Dropdown } from '@spotai/design-system'

export default function Analytics() {
  const [searchTerm, setSearchTerm] = useState('')
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const [selectedPlant, setSelectedPlant] = useState('all plants')
  const [selectedLine, setSelectedLine] = useState('all lines')
  const [selectedTeammate, setSelectedTeammate] = useState('all teammates')
  const [selectedMoreFilters, setSelectedMoreFilters] = useState('more filters')
  const [selectedCompareTo, setSelectedCompareTo] = useState('No Comparison')
  const [hoveredRun, setHoveredRun] = useState<number | null>(null)
  const [hoverPosition, setHoverPosition] = useState({ x: 0, y: 0 })

  // Run data for hover cards
  const runData = [
    { id: 1, duration: '30:00:00', leads: 'John Doe, Sarah Wilson' },
    { id: 2, duration: '27:15:30', leads: 'Mike Johnson, Lisa Chen' },
    { id: 3, duration: '28:45:12', leads: 'Alex Brown, Emma Davis' },
    { id: 4, duration: '28:30:45', leads: 'Chris Lee, Maria Garcia' },
    { id: 5, duration: '26:20:18', leads: 'David Kim, Anna Taylor' },
    { id: 6, duration: '22:15:33', leads: 'Tom Wilson, Kate Smith' },
    { id: 7, duration: '17:45:22', leads: 'Sam Brown, Lisa Johnson' },
    { id: 8, duration: '11:30:15', leads: 'Alex Davis, Mike Chen' },
    { id: 9, duration: '12:20:40', leads: 'Emma Wilson, John Lee' },
    { id: 10, duration: '19:35:12', leads: 'Ryan Miller, Jessica White' },
    { id: 11, duration: '24:50:28', leads: 'Kevin Park, Rachel Green' },
    { id: 12, duration: '16:22:45', leads: 'Mark Taylor, Sarah Johnson' },
    { id: 13, duration: '21:18:33', leads: 'Daniel Lee, Amy Chen' },
    { id: 14, duration: '14:45:17', leads: 'Brian Wilson, Lisa Martinez' }
  ]

  // Comparison data for overlay bars
  const comparisonData = {
    'Previous Week': [
      { id: 1, duration: '32:15:00', height: '214px' },
      { id: 2, duration: '29:30:15', height: '196px' },
      { id: 3, duration: '31:20:45', height: '208px' },
      { id: 4, duration: '30:45:30', height: '205px' },
      { id: 5, duration: '28:10:22', height: '187px' },
      { id: 6, duration: '24:25:18', height: '162px' },
      { id: 7, duration: '19:15:35', height: '128px' },
      { id: 8, duration: '13:40:20', height: '91px' },
      { id: 9, duration: '14:30:15', height: '97px' },
      { id: 10, duration: '21:45:30', height: '145px' },
      { id: 11, duration: '26:20:45', height: '175px' },
      { id: 12, duration: '18:15:20', height: '121px' },
      { id: 13, duration: '23:30:15', height: '157px' },
      { id: 14, duration: '16:20:30', height: '108px' }
    ],
    'Previous Month': [
      { id: 1, duration: '28:45:00', height: '192px' },
      { id: 2, duration: '25:20:30', height: '169px' },
      { id: 3, duration: '26:15:45', height: '175px' },
      { id: 4, duration: '26:00:15', height: '173px' },
      { id: 5, duration: '24:30:22', height: '163px' },
      { id: 6, duration: '20:45:18', height: '138px' },
      { id: 7, duration: '16:20:35', height: '109px' },
      { id: 8, duration: '10:15:20', height: '68px' },
      { id: 9, duration: '11:30:15', height: '77px' },
      { id: 10, duration: '17:45:30', height: '119px' },
      { id: 11, duration: '22:20:45', height: '148px' },
      { id: 12, duration: '14:15:20', height: '95px' },
      { id: 13, duration: '19:30:15', height: '130px' },
      { id: 14, duration: '12:20:30', height: '82px' }
    ],
    'Previous Year': [
      { id: 1, duration: '35:30:00', height: '237px' },
      { id: 2, duration: '32:45:30', height: '218px' },
      { id: 3, duration: '34:20:15', height: '229px' },
      { id: 4, duration: '33:15:45', height: '221px' },
      { id: 5, duration: '31:00:22', height: '207px' },
      { id: 6, duration: '27:30:18', height: '183px' },
      { id: 7, duration: '22:45:35', height: '152px' },
      { id: 8, duration: '16:20:20', height: '109px' },
      { id: 9, duration: '17:15:15', height: '115px' },
      { id: 10, duration: '24:30:30', height: '163px' },
      { id: 11, duration: '29:45:45', height: '198px' },
      { id: 12, duration: '21:15:20', height: '142px' },
      { id: 13, duration: '26:30:15', height: '177px' },
      { id: 14, duration: '19:20:30', height: '129px' }
    ]
  }

  const handleBarHover = (runId: number, event: React.MouseEvent) => {
    setHoveredRun(runId)
    
    // Check if hover card would be cut off by IrisSidebar (assuming sidebar is ~300px from right edge)
    const cardWidth = 200 // Approximate hover card width
    const sidebarWidth = 300 // Approximate IrisSidebar width
    const viewportWidth = window.innerWidth
    const rightEdge = viewportWidth - sidebarWidth
    
    let x = event.clientX + 16
    let y = event.clientY - 16
    
    // If card would be cut off by sidebar, position it to the left of mouse
    if (x + cardWidth > rightEdge) {
      x = event.clientX - cardWidth - 16
    }
    
    setHoverPosition({ x, y })
  }

  const handleBarLeave = () => {
    setHoveredRun(null)
  }

  // Filter options
  const plantOptions = [
    { label: 'All Plants', value: 'all plants' },
    { label: 'Plant A', value: 'plant-a', disabled: true },
    { label: 'Plant B', value: 'plant-b', disabled: true },
    { label: 'Plant C', value: 'plant-c', disabled: true }
  ]

  const lineOptions = [
    { label: 'All Lines', value: 'all lines' },
    { label: 'Line 1', value: 'line-1', disabled: true },
    { label: 'Line 2', value: 'line-2', disabled: true },
    { label: 'Line 3', value: 'line-3', disabled: true }
  ]

  const teammateOptions = [
    { label: 'All Teammates', value: 'all teammates' },
    { label: 'Michael Johnson', value: 'michael-johnson', disabled: true },
    { label: 'David Brown', value: 'david-brown', disabled: true },
    { label: 'James Wilson', value: 'james-wilson', disabled: true }
  ]

  const moreFilterOptions = [
    { label: 'More Filters', value: 'more filters' },
    { label: 'Date Range', value: 'date-range', disabled: true },
    { label: 'Score Range', value: 'score-range', disabled: true },
    { label: 'Status', value: 'status', disabled: true }
  ]

  // Sample data matching Figma exactly
  const runs = [
    { id: '1', name: 'Run 1', avgScore: '5/5', duration: '02:03:01', footage: '08/09/24, 6:30 PM PST', leads: 'Michael Johnson', review: 'reviewed' },
    { id: '2', name: 'Run 2', avgScore: '3/5', duration: '02:03:01', footage: '08/08/24, 12:00 PM PST', leads: 'David Brown, James Wilson', review: 'review' },
    { id: '3', name: 'Run 4', avgScore: '5/5', duration: '02:03:01', footage: '08/07/24, 5:45 PM PST', leads: 'Robert Davis', review: 'reviewed' },
    { id: '4', name: 'Run 5', avgScore: '4/5', duration: '02:03:01', footage: '08/06/24, 2:00 PM PST', leads: 'William Garcia', review: 'review' },
    { id: '5', name: 'Run 7', avgScore: '4/5', duration: '02:03:01', footage: '08/05/24, 4:15 PM PST', leads: 'Daniel Martinez, Christopher Rodriguez', review: 'review' },
    { id: '6', name: 'Run 6', avgScore: '5/5', duration: '02:03:01', footage: '08/04/24, 1:30 PM PST', leads: 'Joseph Hernandez', review: 'reviewed' },
    { id: '7', name: 'Run 3', avgScore: '5/5', duration: '02:03:01', footage: '08/03/24, 3:00 PM PST', leads: 'Thomas Gonzalez', review: 'reviewed' }
  ]

  const getScoreBadgeVariant = (score: string) => {
    if (score === '5/5') return 'success'
    if (score === '4/5') return 'info'
    if (score === '3/5') return 'warning'
    return 'default'
  }

  const renderScoreBadge = (score: string) => {
    return (
      <Badge variant={getScoreBadgeVariant(score)}>
        {score}
      </Badge>
    )
  }

  const renderReviewBadge = (review: string) => {
    if (review === 'reviewed') {
      return (
        <Badge variant="reviewed">
          Reviewed
        </Badge>
      )
    }
    return (
      <Button variant="outline" size="sm" className="px-3 py-1 text-sm font-medium">
        Review
      </Button>
    )
  }

  const handleRowClick = (run: any) => {
    console.log('Clicked run:', run.name)
  }

  return (
    <div className="flex h-full bg-neutral-50">
      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Page Header */}
        <div className="bg-white border-b border-zinc-200 px-6 py-6">
          <div className="flex items-center justify-between">
            {/* Breadcrumbs */}
            <div className="flex items-center gap-1.5">
              <span className="capitalize font-medium text-primary-hover text-sm">AI Ops Assistant</span>
              <ChevronRight className="w-3.5 h-3.5 text-primary-hover" />
              <span className="capitalize font-medium text-primary text-sm">Analytics</span>
            </div>
          </div>
          
          {/* Title and Actions */}
          <div className="flex items-end justify-between mt-6">
            <div className="flex flex-col gap-1">
              <h1 className="capitalize font-semibold text-primary text-xl">
                Analytics
              </h1>
            </div>
            
            {/* Filter Controls */}
            <div className="flex items-center gap-2">
              {/* Date Range Picker */}
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" className="p-2.5">
                  <ChevronLeft className="w-4 h-4 text-primary" />
                </Button>
                <Button variant="outline" size="sm" className="px-4 py-2 flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-primary" />
                  <span className="capitalize font-medium text-primary text-sm">Jan 20, 2024 - Feb 09,2024</span>
                </Button>
                <Button variant="outline" size="sm" className="p-2.5">
                  <ChevronRight className="w-4 h-4 text-primary" />
                </Button>
              </div>
              
              {/* Filter Dropdowns */}
              <div className="flex items-center gap-2 pl-2">
                <div className="w-36">
                  <Dropdown
                    trigger={
                      <div className="flex items-center">
                        <span className="capitalize font-medium text-primary text-sm">{selectedPlant}</span>
                      </div>
                    }
                    items={plantOptions}
                    onSelect={(item) => setSelectedPlant(item.label)}
                    size="sm"
                  />
                </div>
                
                <div className="w-36">
                  <Dropdown
                    trigger={
                      <div className="flex items-center">
                        <span className="capitalize font-medium text-primary text-sm">{selectedLine}</span>
                      </div>
                    }
                    items={lineOptions}
                    onSelect={(item) => setSelectedLine(item.label)}
                    size="sm"
                  />
                </div>
                
                <div className="w-36">
                  <Dropdown
                    trigger={
                      <div className="flex items-center">
                        <span className="capitalize font-medium text-primary text-sm">{selectedTeammate}</span>
                      </div>
                    }
                    items={teammateOptions}
                    onSelect={(item) => setSelectedTeammate(item.label)}
                    size="sm"
                  />
                </div>
                
                <div className="w-36">
                  <Dropdown
                    trigger={
                      <div className="flex items-center">
                        <span className="capitalize font-medium text-accent text-sm">{selectedMoreFilters}</span>
                      </div>
                    }
                    items={moreFilterOptions}
                    onSelect={(item) => setSelectedMoreFilters(item.label)}
                    size="sm"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Analytics Dashboard */}
        <div className="px-6 py-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
            {/* Key Metric Card */}
            <div className="bg-white border border-zinc-200 rounded-lg">
              <div className="flex items-center justify-between p-4 border-b border-zinc-200">
                <h3 className="text-xl font-semibold text-primary capitalize">Key Metric</h3>
                <div className="w-36">
                  <Dropdown
                    trigger={
                      <div className="flex items-center">
                        <span className="capitalize font-medium text-primary text-sm">run duration</span>
                      </div>
                    }
                    items={[
                      { label: 'Run Duration', value: 'run-duration' },
                      { label: 'Efficiency', value: 'efficiency', disabled: true },
                      { label: 'Quality Score', value: 'quality-score', disabled: true }
                    ]}
                    onSelect={() => {}}
                    size="sm"
                  />
                </div>
              </div>
              <div className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-2xl font-medium text-primary">24 minutes</div>
                    <div className="text-sm text-gray-500 mt-1">Average duration across all runs</div>
                  </div>
                  <div className="bg-success-light text-success px-2 py-1 rounded text-xs font-medium flex items-center gap-1">
                    <span>+2 minutes</span>
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M3.293 9.707a1 1 0 010-1.414l6-6a1 1 0 011.414 0l6 6a1 1 0 01-1.414 1.414L11 5.414V17a1 1 0 11-2 0V5.414L4.707 9.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>

            {/* Leaderboard Card */}
            <div className="bg-white border border-zinc-200 rounded-lg">
              <div className="flex items-center justify-between p-4 border-b border-zinc-200">
                <h3 className="text-xl font-semibold text-primary capitalize">Leaderboard</h3>
                <div className="w-36">
                  <Dropdown
                    trigger={
                      <div className="flex items-center">
                        <span className="capitalize font-medium text-primary text-sm">run duration</span>
                      </div>
                    }
                    items={[
                      { label: 'Run Duration', value: 'run-duration' },
                      { label: 'Efficiency', value: 'efficiency', disabled: true },
                      { label: 'Quality Score', value: 'quality-score', disabled: true }
                    ]}
                    onSelect={() => {}}
                    size="sm"
                  />
                </div>
              </div>
              <div className="p-4 space-y-4">
                <div className="flex items-center justify-between py-2 border-b border-zinc-200">
                  <div className="flex items-center gap-4">
                    <div className="bg-accent text-white px-2 py-1 rounded text-xs font-medium">#1</div>
                    <span className="font-medium text-primary">Plant 4</span>
                  </div>
                  <span className="text-sm text-primary">29min31s</span>
                </div>
                <div className="flex items-center justify-between py-2 border-b border-zinc-200">
                  <div className="flex items-center gap-4">
                    <div className="bg-accent text-white px-2 py-1 rounded text-xs font-medium">#2</div>
                    <span className="font-medium text-primary">Plant 5</span>
                  </div>
                  <span className="text-sm text-primary">24min02s</span>
                </div>
                <div className="flex items-center justify-between py-2">
                  <div className="flex items-center gap-4">
                    <div className="bg-accent text-white px-2 py-1 rounded text-xs font-medium">#3</div>
                    <span className="font-medium text-primary">Plant 9</span>
                  </div>
                  <span className="text-sm text-primary">22min30s</span>
                </div>
              </div>
            </div>

            {/* AI Recommendations Card */}
            <div className="bg-white border border-zinc-200 rounded-lg">
              <div className="flex items-center justify-between p-4 border-b border-zinc-200">
                <h3 className="text-xl font-semibold text-primary capitalize">AI Recommendations</h3>
                <div className="w-36">
                  <Dropdown
                    trigger={
                      <div className="flex items-center">
                        <span className="capitalize font-medium text-primary text-sm">run duration</span>
                      </div>
                    }
                    items={[
                      { label: 'Run Duration', value: 'run-duration' },
                      { label: 'Efficiency', value: 'efficiency', disabled: true },
                      { label: 'Quality Score', value: 'quality-score', disabled: true }
                    ]}
                    onSelect={() => {}}
                    size="sm"
                  />
                </div>
              </div>
              <div className="p-4 space-y-2">
                <div className="flex items-start gap-2">
                  <div className="bg-accent-light p-2 rounded">
                    <svg className="w-4 h-4 text-accent" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <p className="text-sm font-medium text-primary">Try implementing longer breaks between shifts.</p>
                </div>
                <div className="flex items-start gap-2">
                  <div className="bg-accent-light p-2 rounded">
                    <svg className="w-4 h-4 text-accent" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <p className="text-sm font-medium text-primary">Introduce a standardized checklist for equipment setup</p>
                </div>
                <div className="flex items-start gap-2">
                  <div className="bg-accent-light p-2 rounded">
                    <svg className="w-4 h-4 text-accent" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <p className="text-sm font-medium text-primary">Switch order of manual labelling and material inspection tasks</p>
                </div>
              </div>
            </div>
          </div>

          {/* Run Trends Chart */}
          <div className="bg-white border border-zinc-200 rounded-xl">
            <div className="flex items-center justify-between p-4 border-b border-zinc-200">
              <h3 className="text-xl font-semibold text-primary capitalize">Run Trends</h3>
              <div className="flex items-center gap-2">
                <div className="w-36">
                  <Dropdown
                    trigger={
                      <div className="flex items-center">
                        <span className="capitalize font-medium text-primary text-sm">run duration</span>
                      </div>
                    }
                    items={[
                      { label: 'Run Duration', value: 'run-duration' },
                      { label: 'Efficiency', value: 'efficiency', disabled: true },
                      { label: 'Quality Score', value: 'quality-score', disabled: true }
                    ]}
                    onSelect={() => {}}
                    size="sm"
                  />
                </div>
                <div className="w-44">
                  <Dropdown
                    trigger={
                      <div className="flex items-center">
                        <span className="capitalize font-medium text-primary-hover text-sm">{selectedCompareTo}</span>
                      </div>
                    }
                    items={[
                      { label: 'No Comparison', value: 'no-comparison' },
                      { label: 'Previous Week', value: 'previous-week' },
                      { label: 'Previous Month', value: 'previous-month' },
                      { label: 'Previous Year', value: 'previous-year' }
                    ]}
                    onSelect={(item) => setSelectedCompareTo(item.label)}
                    size="sm"
                  />
                </div>
              </div>
            </div>
            <div className="p-4">
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="flex flex-col gap-4">
                  {/* Chart area with Y-axis and bars */}
                  <div className="h-64 relative flex">
                    {/* Y-axis labels */}
                    <div className="flex flex-col justify-between text-xs text-zinc-950 font-normal pl-2 h-full">
                      <div>30 min</div>
                      <div>25 min</div>
                      <div>20 min</div>
                      <div>15 min</div>
                      <div>10 min</div>
                      <div>5 min</div>
                    </div>
                    
                    {/* Chart bars */}
                    <div className="h-full flex items-end justify-between gap-2 ml-12 flex-1 border-b border-zinc-200 relative">
                      {/* Grid lines behind bars */}
                      <div className="absolute inset-0 flex flex-col justify-between">
                        <div className="border-t border-zinc-200"></div>
                        <div className="border-t border-zinc-200"></div>
                        <div className="border-t border-zinc-200"></div>
                        <div className="border-t border-zinc-200"></div>
                        <div className="border-t border-zinc-200"></div>
                      </div>

                      {/* Comparison bars - side by side with original bars */}
                      {selectedCompareTo !== 'No Comparison' && (
                        <>
                          {/* Run 1 - Current and Comparison bars side by side */}
                          <div 
                            className="flex flex-col items-center relative z-10 cursor-pointer"
                            style={{ marginLeft: '48px' }}
                            onMouseEnter={(e) => handleBarHover(1, e)}
                            onMouseLeave={handleBarLeave}
                          >
                            <div className="flex gap-1 items-end">
                              {/* Current bar - half width */}
                              <div
                                className="w-8 rounded-t transition-all duration-200 hover:opacity-80"
                                style={{ 
                                  height: '200px',
                                  backgroundColor: '#8181ff'
                                }}
                              />
                              {/* Comparison bar - half width */}
                              <div
                                className="w-8 rounded-t transition-all duration-200 hover:opacity-80"
                                style={{ 
                                  height: comparisonData[selectedCompareTo as keyof typeof comparisonData]?.[0]?.height || '200px',
                                  backgroundColor: '#4a5568'
                                }}
                              />
                            </div>
                          </div>
                          
                          {/* Run 2 - Current and Comparison bars side by side */}
                          <div 
                            className="flex flex-col items-center relative z-10 cursor-pointer"
                            onMouseEnter={(e) => handleBarHover(2, e)}
                            onMouseLeave={handleBarLeave}
                          >
                            <div className="flex gap-1 items-end">
                              {/* Current bar - half width */}
                              <div
                                className="w-8 rounded-t transition-all duration-200 hover:opacity-80"
                                style={{ 
                                  height: '180px',
                                  backgroundColor: '#8181ff'
                                }}
                              />
                              {/* Comparison bar - half width */}
                              <div
                                className="w-8 rounded-t transition-all duration-200 hover:opacity-80"
                                style={{ 
                                  height: comparisonData[selectedCompareTo as keyof typeof comparisonData]?.[1]?.height || '180px',
                                  backgroundColor: '#4a5568'
                                }}
                              />
                            </div>
                          </div>
                          
                          {/* Run 3 - Current and Comparison bars side by side */}
                          <div 
                            className="flex flex-col items-center relative z-10 cursor-pointer"
                            onMouseEnter={(e) => handleBarHover(3, e)}
                            onMouseLeave={handleBarLeave}
                          >
                            <div className="flex gap-1 items-end">
                              {/* Current bar - half width */}
                              <div
                                className="w-8 rounded-t transition-all duration-200 hover:opacity-80"
                                style={{ 
                                  height: '190px',
                                  backgroundColor: '#8181ff'
                                }}
                              />
                              {/* Comparison bar - half width */}
                              <div
                                className="w-8 rounded-t transition-all duration-200 hover:opacity-80"
                                style={{ 
                                  height: comparisonData[selectedCompareTo as keyof typeof comparisonData]?.[2]?.height || '190px',
                                  backgroundColor: '#4a5568'
                                }}
                              />
                            </div>
                          </div>
                          
                          {/* Run 4 - Current and Comparison bars side by side */}
                          <div 
                            className="flex flex-col items-center relative z-10 cursor-pointer"
                            onMouseEnter={(e) => handleBarHover(4, e)}
                            onMouseLeave={handleBarLeave}
                          >
                            <div className="flex gap-1 items-end">
                              {/* Current bar - half width */}
                              <div
                                className="w-8 rounded-t transition-all duration-200 hover:opacity-80"
                                style={{ 
                                  height: '185px',
                                  backgroundColor: '#8181ff'
                                }}
                              />
                              {/* Comparison bar - half width */}
                              <div
                                className="w-8 rounded-t transition-all duration-200 hover:opacity-80"
                                style={{ 
                                  height: comparisonData[selectedCompareTo as keyof typeof comparisonData]?.[3]?.height || '185px',
                                  backgroundColor: '#4a5568'
                                }}
                              />
                            </div>
                          </div>
                          
                          {/* Run 5 - Current and Comparison bars side by side */}
                          <div 
                            className="flex flex-col items-center relative z-10 cursor-pointer"
                            onMouseEnter={(e) => handleBarHover(5, e)}
                            onMouseLeave={handleBarLeave}
                          >
                            <div className="flex gap-1 items-end">
                              {/* Current bar - half width */}
                              <div
                                className="w-8 rounded-t transition-all duration-200 hover:opacity-80"
                                style={{ 
                                  height: '175px',
                                  backgroundColor: '#8181ff'
                                }}
                              />
                              {/* Comparison bar - half width */}
                              <div
                                className="w-8 rounded-t transition-all duration-200 hover:opacity-80"
                                style={{ 
                                  height: comparisonData[selectedCompareTo as keyof typeof comparisonData]?.[4]?.height || '175px',
                                  backgroundColor: '#4a5568'
                                }}
                              />
                            </div>
                          </div>
                          
                          {/* Run 6 - Current and Comparison bars side by side */}
                          <div 
                            className="flex flex-col items-center relative z-10 cursor-pointer"
                            onMouseEnter={(e) => handleBarHover(6, e)}
                            onMouseLeave={handleBarLeave}
                          >
                            <div className="flex gap-1 items-end">
                              {/* Current bar - half width */}
                              <div
                                className="w-8 rounded-t transition-all duration-200 hover:opacity-80"
                                style={{ 
                                  height: '148px',
                                  backgroundColor: '#8181ff'
                                }}
                              />
                              {/* Comparison bar - half width */}
                              <div
                                className="w-8 rounded-t transition-all duration-200 hover:opacity-80"
                                style={{ 
                                  height: comparisonData[selectedCompareTo as keyof typeof comparisonData]?.[5]?.height || '148px',
                                  backgroundColor: '#4a5568'
                                }}
                              />
                            </div>
                          </div>
                          
                          {/* Run 7 - Current and Comparison bars side by side */}
                          <div 
                            className="flex flex-col items-center relative z-10 cursor-pointer"
                            onMouseEnter={(e) => handleBarHover(7, e)}
                            onMouseLeave={handleBarLeave}
                          >
                            <div className="flex gap-1 items-end">
                              {/* Current bar - half width */}
                              <div
                                className="w-8 rounded-t transition-all duration-200 hover:opacity-80"
                                style={{ 
                                  height: '118px',
                                  backgroundColor: '#8181ff'
                                }}
                              />
                              {/* Comparison bar - half width */}
                              <div
                                className="w-8 rounded-t transition-all duration-200 hover:opacity-80"
                                style={{ 
                                  height: comparisonData[selectedCompareTo as keyof typeof comparisonData]?.[6]?.height || '118px',
                                  backgroundColor: '#4a5568'
                                }}
                              />
                            </div>
                          </div>
                          
                          {/* Run 8 - Current and Comparison bars side by side */}
                          <div 
                            className="flex flex-col items-center relative z-10 cursor-pointer"
                            onMouseEnter={(e) => handleBarHover(8, e)}
                            onMouseLeave={handleBarLeave}
                          >
                            <div className="flex gap-1 items-end">
                              {/* Current bar - half width */}
                              <div
                                className="w-8 rounded-t transition-all duration-200 hover:opacity-80"
                                style={{ 
                                  height: '75px',
                                  backgroundColor: '#8181ff'
                                }}
                              />
                              {/* Comparison bar - half width */}
                              <div
                                className="w-8 rounded-t transition-all duration-200 hover:opacity-80"
                                style={{ 
                                  height: comparisonData[selectedCompareTo as keyof typeof comparisonData]?.[7]?.height || '75px',
                                  backgroundColor: '#4a5568'
                                }}
                              />
                            </div>
                          </div>
                          
                          {/* Run 9 - Current and Comparison bars side by side */}
                          <div 
                            className="flex flex-col items-center relative z-10 cursor-pointer"
                            onMouseEnter={(e) => handleBarHover(9, e)}
                            onMouseLeave={handleBarLeave}
                          >
                            <div className="flex gap-1 items-end">
                              {/* Current bar - half width */}
                              <div
                                className="w-8 rounded-t transition-all duration-200 hover:opacity-80"
                                style={{ 
                                  height: '82px',
                                  backgroundColor: '#8181ff'
                                }}
                              />
                              {/* Comparison bar - half width */}
                              <div
                                className="w-8 rounded-t transition-all duration-200 hover:opacity-80"
                                style={{ 
                                  height: comparisonData[selectedCompareTo as keyof typeof comparisonData]?.[8]?.height || '82px',
                                  backgroundColor: '#4a5568'
                                }}
                              />
                            </div>
                          </div>
                          
                          {/* Run 10 - Current and Comparison bars side by side */}
                          <div 
                            className="flex flex-col items-center relative z-10 cursor-pointer"
                            onMouseEnter={(e) => handleBarHover(10, e)}
                            onMouseLeave={handleBarLeave}
                          >
                            <div className="flex gap-1 items-end">
                              {/* Current bar - half width */}
                              <div
                                className="w-8 rounded-t transition-all duration-200 hover:opacity-80"
                                style={{ 
                                  height: '130px',
                                  backgroundColor: '#8181ff'
                                }}
                              />
                              {/* Comparison bar - half width */}
                              <div
                                className="w-8 rounded-t transition-all duration-200 hover:opacity-80"
                                style={{ 
                                  height: comparisonData[selectedCompareTo as keyof typeof comparisonData]?.[9]?.height || '130px',
                                  backgroundColor: '#4a5568'
                                }}
                              />
                            </div>
                          </div>
                          
                          {/* Run 11 - Current and Comparison bars side by side */}
                          <div 
                            className="flex flex-col items-center relative z-10 cursor-pointer"
                            onMouseEnter={(e) => handleBarHover(11, e)}
                            onMouseLeave={handleBarLeave}
                          >
                            <div className="flex gap-1 items-end">
                              {/* Current bar - half width */}
                              <div
                                className="w-8 rounded-t transition-all duration-200 hover:opacity-80"
                                style={{ 
                                  height: '165px',
                                  backgroundColor: '#8181ff'
                                }}
                              />
                              {/* Comparison bar - half width */}
                              <div
                                className="w-8 rounded-t transition-all duration-200 hover:opacity-80"
                                style={{ 
                                  height: comparisonData[selectedCompareTo as keyof typeof comparisonData]?.[10]?.height || '165px',
                                  backgroundColor: '#4a5568'
                                }}
                              />
                            </div>
                          </div>
                          
                          {/* Run 12 - Current and Comparison bars side by side */}
                          <div 
                            className="flex flex-col items-center relative z-10 cursor-pointer"
                            onMouseEnter={(e) => handleBarHover(12, e)}
                            onMouseLeave={handleBarLeave}
                          >
                            <div className="flex gap-1 items-end">
                              {/* Current bar - half width */}
                              <div
                                className="w-8 rounded-t transition-all duration-200 hover:opacity-80"
                                style={{ 
                                  height: '108px',
                                  backgroundColor: '#8181ff'
                                }}
                              />
                              {/* Comparison bar - half width */}
                              <div
                                className="w-8 rounded-t transition-all duration-200 hover:opacity-80"
                                style={{ 
                                  height: comparisonData[selectedCompareTo as keyof typeof comparisonData]?.[11]?.height || '108px',
                                  backgroundColor: '#4a5568'
                                }}
                              />
                            </div>
                          </div>
                          
                          {/* Run 13 - Current and Comparison bars side by side */}
                          <div 
                            className="flex flex-col items-center relative z-10 cursor-pointer"
                            onMouseEnter={(e) => handleBarHover(13, e)}
                            onMouseLeave={handleBarLeave}
                          >
                            <div className="flex gap-1 items-end">
                              {/* Current bar - half width */}
                              <div
                                className="w-8 rounded-t transition-all duration-200 hover:opacity-80"
                                style={{ 
                                  height: '142px',
                                  backgroundColor: '#8181ff'
                                }}
                              />
                              {/* Comparison bar - half width */}
                              <div
                                className="w-8 rounded-t transition-all duration-200 hover:opacity-80"
                                style={{ 
                                  height: comparisonData[selectedCompareTo as keyof typeof comparisonData]?.[12]?.height || '142px',
                                  backgroundColor: '#4a5568'
                                }}
                              />
                            </div>
                          </div>
                          
                          {/* Run 14 - Current and Comparison bars side by side */}
                          <div 
                            className="flex flex-col items-center relative z-10 cursor-pointer"
                            onMouseEnter={(e) => handleBarHover(14, e)}
                            onMouseLeave={handleBarLeave}
                          >
                            <div className="flex gap-1 items-end">
                              {/* Current bar - half width */}
                              <div
                                className="w-8 rounded-t transition-all duration-200 hover:opacity-80"
                                style={{ 
                                  height: '98px',
                                  backgroundColor: '#8181ff'
                                }}
                              />
                              {/* Comparison bar - half width */}
                              <div
                                className="w-8 rounded-t transition-all duration-200 hover:opacity-80"
                                style={{ 
                                  height: comparisonData[selectedCompareTo as keyof typeof comparisonData]?.[13]?.height || '98px',
                                  backgroundColor: '#4a5568'
                                }}
                              />
                            </div>
                          </div>
                        </>
                      )}

                      {/* Hover card */}
                      {hoveredRun && (
                        <div 
                          className="fixed bg-white border border-zinc-200 rounded-md shadow-lg px-3 py-2 z-50 transition-all duration-200 ease-in-out"
                          style={{
                            left: `${hoverPosition.x}px`,
                            top: `${hoverPosition.y}px`
                          }}
                        >
                          <div className="flex flex-col gap-2">
                            <div className="flex flex-col gap-1">
                              <div className="text-sm font-normal text-primary capitalize">
                                Run {hoveredRun}
                              </div>
                              <div className="text-sm font-medium text-primary">
                                {runData[hoveredRun - 1]?.duration}
                              </div>
                            </div>
                            <div className="text-xs text-primary">
                              Leads: {runData[hoveredRun - 1]?.leads}
                            </div>
                          </div>
                        </div>
                      )}
                      {/* Original bars - only show when no comparison */}
                      {selectedCompareTo === 'No Comparison' && (
                        <>
                          {/* Run 1 - 30 minutes */}
                          <div 
                            className="flex flex-col items-center relative z-10 cursor-pointer"
                            onMouseEnter={(e) => handleBarHover(1, e)}
                            onMouseLeave={handleBarLeave}
                          >
                            <div
                              className="w-16 rounded-t transition-all duration-200 hover:opacity-80"
                              style={{ 
                                height: '200px',
                                backgroundColor: '#8181ff'
                              }}
                            />
                          </div>
                          
                          {/* Run 2 - 27 minutes */}
                          <div 
                            className="flex flex-col items-center relative z-10 cursor-pointer"
                            onMouseEnter={(e) => handleBarHover(2, e)}
                            onMouseLeave={handleBarLeave}
                          >
                            <div
                              className="w-16 rounded-t transition-all duration-200 hover:opacity-80"
                              style={{ 
                                height: '180px',
                                backgroundColor: '#8181ff'
                              }}
                            />
                          </div>
                      
                          {/* Run 3 - 28 minutes */}
                          <div 
                            className="flex flex-col items-center relative z-10 cursor-pointer"
                            onMouseEnter={(e) => handleBarHover(3, e)}
                            onMouseLeave={handleBarLeave}
                          >
                            <div
                              className="w-16 rounded-t transition-all duration-200 hover:opacity-80"
                              style={{ 
                                height: '186px',
                                backgroundColor: '#8181ff'
                              }}
                            />
                          </div>
                          
                          {/* Run 4 - 28 minutes */}
                          <div 
                            className="flex flex-col items-center relative z-10 cursor-pointer"
                            onMouseEnter={(e) => handleBarHover(4, e)}
                            onMouseLeave={handleBarLeave}
                          >
                            <div
                              className="w-16 rounded-t transition-all duration-200 hover:opacity-80"
                              style={{ 
                                height: '186px',
                                backgroundColor: '#8181ff'
                              }}
                            />
                          </div>
                          
                          {/* Run 5 - 26 minutes */}
                          <div 
                            className="flex flex-col items-center relative z-10 cursor-pointer"
                            onMouseEnter={(e) => handleBarHover(5, e)}
                            onMouseLeave={handleBarLeave}
                          >
                            <div
                              className="w-16 rounded-t transition-all duration-200 hover:opacity-80"
                              style={{ 
                                height: '174px',
                                backgroundColor: '#8181ff'
                              }}
                            />
                          </div>
                          
                          {/* Run 6 - 22 minutes */}
                          <div 
                            className="flex flex-col items-center relative z-10 cursor-pointer"
                            onMouseEnter={(e) => handleBarHover(6, e)}
                            onMouseLeave={handleBarLeave}
                          >
                            <div
                              className="w-16 rounded-t transition-all duration-200 hover:opacity-80"
                              style={{ 
                                height: '146px',
                                backgroundColor: '#8181ff'
                              }}
                            />
                          </div>
                          
                          {/* Run 7 - 17 minutes */}
                          <div 
                            className="flex flex-col items-center relative z-10 cursor-pointer"
                            onMouseEnter={(e) => handleBarHover(7, e)}
                            onMouseLeave={handleBarLeave}
                          >
                            <div
                              className="w-16 rounded-t transition-all duration-200 hover:opacity-80"
                              style={{ 
                                height: '114px',
                                backgroundColor: '#8181ff'
                              }}
                            />
                          </div>
                          
                          {/* Run 8 - 11 minutes */}
                          <div 
                            className="flex flex-col items-center relative z-10 cursor-pointer"
                            onMouseEnter={(e) => handleBarHover(8, e)}
                            onMouseLeave={handleBarLeave}
                          >
                            <div
                              className="w-16 rounded-t transition-all duration-200 hover:opacity-80"
                              style={{ 
                                height: '74px',
                                backgroundColor: '#8181ff'
                              }}
                            />
                          </div>
                          
                          {/* Run 9 - 12 minutes */}
                          <div 
                            className="flex flex-col items-center relative z-10 cursor-pointer"
                            onMouseEnter={(e) => handleBarHover(9, e)}
                            onMouseLeave={handleBarLeave}
                          >
                            <div
                              className="w-16 rounded-t transition-all duration-200 hover:opacity-80"
                              style={{ 
                                height: '80px',
                                backgroundColor: '#8181ff'
                              }}
                            />
                          </div>
                          
                          {/* Run 10 - 19 minutes */}
                          <div 
                            className="flex flex-col items-center relative z-10 cursor-pointer"
                            onMouseEnter={(e) => handleBarHover(10, e)}
                            onMouseLeave={handleBarLeave}
                          >
                            <div
                              className="w-16 rounded-t transition-all duration-200 hover:opacity-80"
                              style={{ 
                                height: '127px',
                                backgroundColor: '#8181ff'
                              }}
                            />
                          </div>
                          
                          {/* Run 11 - 24 minutes */}
                          <div 
                            className="flex flex-col items-center relative z-10 cursor-pointer"
                            onMouseEnter={(e) => handleBarHover(11, e)}
                            onMouseLeave={handleBarLeave}
                          >
                            <div
                              className="w-16 rounded-t transition-all duration-200 hover:opacity-80"
                              style={{ 
                                height: '160px',
                                backgroundColor: '#8181ff'
                              }}
                            />
                          </div>
                          
                          {/* Run 12 - 16 minutes */}
                          <div 
                            className="flex flex-col items-center relative z-10 cursor-pointer"
                            onMouseEnter={(e) => handleBarHover(12, e)}
                            onMouseLeave={handleBarLeave}
                          >
                            <div
                              className="w-16 rounded-t transition-all duration-200 hover:opacity-80"
                              style={{ 
                                height: '107px',
                                backgroundColor: '#8181ff'
                              }}
                            />
                          </div>
                          
                          {/* Run 13 - 21 minutes */}
                          <div 
                            className="flex flex-col items-center relative z-10 cursor-pointer"
                            onMouseEnter={(e) => handleBarHover(13, e)}
                            onMouseLeave={handleBarLeave}
                          >
                            <div
                              className="w-16 rounded-t transition-all duration-200 hover:opacity-80"
                              style={{ 
                                height: '140px',
                                backgroundColor: '#8181ff'
                              }}
                            />
                          </div>
                          
                          {/* Run 14 - 14 minutes */}
                          <div 
                            className="flex flex-col items-center relative z-10 cursor-pointer"
                            onMouseEnter={(e) => handleBarHover(14, e)}
                            onMouseLeave={handleBarLeave}
                          >
                            <div
                              className="w-16 rounded-t transition-all duration-200 hover:opacity-80"
                              style={{ 
                                height: '93px',
                                backgroundColor: '#8181ff'
                              }}
                            />
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                  
                  {/* X-axis labels - separate container below chart */}
                  <div className="flex justify-center pl-28 pr-4">
                    <div className="flex items-center justify-between w-full text-xs text-zinc-950 font-normal">
                      <div className="flex justify-center">Run 1</div>
                      <div className="flex justify-center">Run 2</div>
                      <div className="flex justify-center">Run 3</div>
                      <div className="flex justify-center">Run 4</div>
                      <div className="flex justify-center">Run 5</div>
                      <div className="flex justify-center">Run 6</div>
                      <div className="flex justify-center">Run 7</div>
                      <div className="flex justify-center">Run 8</div>
                      <div className="flex justify-center">Run 9</div>
                      <div className="flex justify-center">Run 10</div>
                      <div className="flex justify-center">Run 11</div>
                      <div className="flex justify-center">Run 12</div>
                      <div className="flex justify-center">Run 13</div>
                      <div className="flex justify-center">Run 14</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Data Table Section */}
        <div className="flex-1 px-6 pb-6">
          <div className="flex flex-col gap-4 w-full">
            {/* Search Bar Section */}
            <div className="flex gap-2 items-center w-full">
              <div className="flex-1">
                <SearchInput placeholder="Search" />
              </div>
              <div className="flex gap-2 items-center">
                {/* Filter Button */}
                <Button variant="outline" size="sm" className="flex items-center gap-2">
                  <Filter className="w-4 h-4 text-primary" />
                  <span className="capitalize font-medium text-primary text-sm">filter</span>
                </Button>
                
                {/* Columns Button */}
                <Button variant="outline" size="sm" className="p-2.5">
                  <MoreHorizontal className="w-4 h-4 text-primary" />
                </Button>
              </div>
            </div>

        {/* Data Table */}
        <Card variant="default" className="p-0">
          <div className="bg-white rounded-lg">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-zinc-200">
                    <th className="text-left p-4 w-16">
                      <div className="w-4 h-4 border border-primary rounded"></div>
                    </th>
                    <th className="text-left p-4 font-medium text-primary text-sm capitalize cursor-pointer hover:bg-neutral-100">
                      <div className="flex items-center gap-2">
                        <span>Runs</span>
                        <ArrowUpDown className="w-3 h-3 text-gray-300" />
                      </div>
                    </th>
                    <th className="text-left p-4 font-medium text-primary text-sm capitalize cursor-pointer hover:bg-neutral-100 w-32">
                      <div className="flex items-center gap-2">
                        <span>avg Score</span>
                        <ArrowUpDown className="w-3 h-3 text-gray-300" />
                      </div>
                    </th>
                    <th className="text-left p-4 font-medium text-primary text-sm capitalize cursor-pointer hover:bg-neutral-100 w-40">
                      <div className="flex items-center gap-2">
                        <span>run Duration</span>
                        <ArrowUpDown className="w-3 h-3 text-gray-300" />
                      </div>
                    </th>
                    <th className="text-left p-4 font-medium text-primary text-sm capitalize cursor-pointer hover:bg-neutral-100">
                      <div className="flex items-center gap-2">
                        <span>Footage</span>
                        <ArrowUpDown className="w-3 h-3 text-gray-300" />
                      </div>
                    </th>
                    <th className="text-left p-4 font-medium text-primary text-sm capitalize cursor-pointer hover:bg-neutral-100">
                      <div className="flex items-center gap-2">
                        <span>Leads</span>
                        <ArrowUpDown className="w-3 h-3 text-gray-300" />
                      </div>
                    </th>
                    <th className="text-left p-4 font-medium text-primary text-sm capitalize cursor-pointer hover:bg-neutral-100 w-32">
                      <div className="flex items-center gap-2">
                        <span>review</span>
                        <ArrowUpDown className="w-3 h-3 text-gray-300" />
                      </div>
                    </th>
                    <th className="text-left p-4 w-16">
                      <div className="flex items-center justify-center">
                        <MoreHorizontal className="w-4 h-4 text-gray-300" />
                      </div>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {runs.map((run, rowIndex) => (
                    <tr
                      key={run.id}
                      className="border-b border-zinc-200 bg-white hover:bg-neutral-100 cursor-pointer"
                      onClick={() => handleRowClick(run)}
                    >
                      <td className="p-4">
                        <div className="w-4 h-4 border border-primary rounded"></div>
                      </td>
                      <td className="p-4">
                        <span className="capitalize font-medium text-primary text-sm hover:text-accent">
                          {run.name}
                        </span>
                      </td>
                      <td className="p-4">
                        {renderScoreBadge(run.avgScore)}
                      </td>
                      <td className="p-4">
                        <span className="capitalize font-medium text-primary text-sm">{run.duration}</span>
                      </td>
                      <td className="p-4">
                        <span className="capitalize font-semibold text-primary text-sm">{run.footage}</span>
                      </td>
                      <td className="p-4">
                        <span className="font-normal text-primary text-xs">{run.leads}</span>
                      </td>
                      <td className="p-4">
                        {renderReviewBadge(run.review)}
                      </td>
                      <td className="p-4">
                        <div className="flex items-center justify-center">
                          <ActionMenu onSelect={(value) => console.log('Selected:', value)} />
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            {/* Pagination */}
            <div className="flex items-center justify-between px-6 py-4 border-t border-zinc-200">
              <div className="flex items-center gap-4">
                <span className="text-sm font-medium text-primary-hover">0 of 5 row(s) selected.</span>
              </div>
              
              <div className="flex items-center gap-6">
                {/* Rows per page */}
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-primary capitalize">Rows per page</span>
                  <div className="bg-white border border-zinc-200 rounded-lg px-3 py-1.5 flex items-center gap-2">
                    <span className="text-sm font-medium text-primary">{rowsPerPage}</span>
                    <ArrowUpDown className="w-4 h-4 text-gray-400" />
                  </div>
                </div>
                
                {/* Page info */}
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-primary capitalize">Page 1 of 10</span>
                </div>
                
                {/* Navigation buttons */}
                <div className="flex items-center gap-1">
                  <Button variant="outline" size="sm" className="p-2 opacity-50" disabled>
                    <ArrowUpDown className="w-4 h-4 text-gray-400" />
                  </Button>
                  <Button variant="outline" size="sm" className="p-2">
                    <ArrowUpDown className="w-4 h-4 text-gray-400" />
                  </Button>
                  <Button variant="outline" size="sm" className="p-2">
                    <ArrowUpDown className="w-4 h-4 text-gray-400" />
                  </Button>
                  <Button variant="outline" size="sm" className="p-2">
                    <ArrowUpDown className="w-4 h-4 text-gray-400" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </Card>
          </div>
        </div>
      </div>
    </div>
  )
}















