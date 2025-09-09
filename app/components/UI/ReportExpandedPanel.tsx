'use client'

import { ChevronRight, MoreHorizontal, Download, Sparkles, ArrowUp, Check, X, ChevronDown, ArrowLeft, ThumbsUp, ThumbsDown } from 'lucide-react'
import { Card, Badge } from '@spotai/design-system'
import { useState } from 'react'

interface ReportExpandedPanelProps {
  onBack: () => void
  onTaskClick?: () => void
  selectedRun?: string
}

export default function ReportExpandedPanel({ onBack, onTaskClick, selectedRun = 'Run 1' }: ReportExpandedPanelProps) {
  const [collapsedPhases, setCollapsedPhases] = useState<Set<number>>(new Set([1, 2, 3]))
  const [activeTab, setActiveTab] = useState('highlights')
  const [showToast, setShowToast] = useState(false)

  const togglePhase = (phaseId: number) => {
    const newCollapsed = new Set(collapsedPhases)
    if (newCollapsed.has(phaseId)) {
      newCollapsed.delete(phaseId)
    } else {
      newCollapsed.add(phaseId)
    }
    setCollapsedPhases(newCollapsed)
  }

  const handleFeedbackClick = () => {
    setShowToast(true)
    // Auto-hide toast after 3 seconds
    setTimeout(() => {
      setShowToast(false)
    }, 3000)
  }

  // Different metrics data for each run
  const runMetrics = {
    'Run 1': {
      runTime: { value: '23 min', change: '+3 min', changeType: 'warning' },
      cleaning: { value: '4/5', status: 'great', statusType: 'info' },
      exchangeOfParts: { value: '4/5', status: 'needs work', statusType: 'warning' },
      adjustments: { value: '3/5', status: 'needs work', statusType: 'warning' }
    },
    'Run 2': {
      runTime: { value: '18 min', change: '-2 min', changeType: 'success' },
      cleaning: { value: '5/5', status: 'excellent', statusType: 'success' },
      exchangeOfParts: { value: '5/5', status: 'excellent', statusType: 'success' },
      adjustments: { value: '4/5', status: 'good', statusType: 'info' }
    }
  }

  const currentMetrics = runMetrics[selectedRun as keyof typeof runMetrics] || runMetrics['Run 1']

  // Different phase data for each run
  const runPhaseData = {
    'Run 1': {
      cleaning: {
        description: 'The cleaning phase focuses on thorough preparation and staging of all necessary tools and materials to ensure optimal working conditions and efficiency.',
        tasks: [
          {
            name: 'cleaning and preparation',
            score: '4/4',
            description: 'Cleaning and preparation was executed excellently, with all surfaces properly sanitized and work areas organized for maximum efficiency.'
          },
          {
            name: 'tools staging',
            score: '4/4',
            description: 'Tools were staged systematically and efficiently, with all required equipment properly positioned and ready for immediate use.'
          },
          {
            name: 'plates staging',
            score: '4/4',
            description: 'Plate staging was completed with precision, ensuring all materials were properly organized and easily accessible throughout the process.'
          }
        ]
      },
      exchangeOfParts: {
        description: 'Overall, this phase was successful. The equipment adjustment and manual labelling were conducted quickly and correctly, but there was room for improvement on the raw material inspection.',
        tasks: [
          {
            name: 'equipment adjustment',
            score: '4/4',
            description: 'The equipment adjustment phase was executed well, with skilled workers ensuring precise assembly of components, contributing to a successful product outcome.'
          },
          {
            name: 'Manual Product Assembly',
            score: '4/4',
            description: 'The equipment adjustment phase was executed well, with skilled workers ensuring precise assembly of components, contributing to a successful product outcome.'
          },
          {
            name: 'raw material inspection',
            score: '4/4',
            description: 'Raw material inspection showed some inconsistencies; improvements are needed to ensure all materials meet quality standards before production.'
          }
        ]
      },
      adjustments: {
        description: 'Overall, this phase was successful. The equipment adjustment and manual labelling were conducted quickly and correctly, but there was room for improvement on the raw material inspection.',
        tasks: [
          {
            name: 'quality inspection',
            score: '2/4',
            description: 'Quality inspection revealed several inconsistencies in the final product. Additional training and stricter protocols are needed to ensure consistent quality standards.'
          },
          {
            name: 'documentation review',
            score: '3/4',
            description: 'Documentation was mostly complete but missing some critical details. The process needs better standardization to capture all required information.'
          },
          {
            name: 'safety compliance',
            score: '1/4',
            description: 'Safety compliance was below standards with several protocol violations observed. Immediate corrective action and retraining are required.'
          },
          {
            name: 'equipment calibration',
            score: '2/4',
            description: 'Equipment calibration was partially completed but not verified properly. Regular calibration checks and verification procedures need to be implemented.'
          }
        ]
      }
    },
    'Run 2': {
      cleaning: {
        description: 'The cleaning phase was executed flawlessly with exceptional attention to detail. All preparation and staging activities were completed with superior efficiency and organization.',
        tasks: [
          {
            name: 'cleaning and preparation',
            score: '5/5',
            description: 'Outstanding cleaning and preparation execution with meticulous attention to every surface and work area, setting the gold standard for efficiency.'
          },
          {
            name: 'tools staging',
            score: '5/5',
            description: 'Perfect tools staging with exceptional organization and systematic placement, ensuring optimal workflow and immediate accessibility.'
          },
          {
            name: 'plates staging',
            score: '5/5',
            description: 'Exemplary plate staging with flawless precision and organization, demonstrating superior material management and process optimization.'
          }
        ]
      },
      exchangeOfParts: {
        description: 'This phase exceeded expectations with outstanding performance across all areas. Equipment adjustments and manual operations were executed with exceptional precision and efficiency.',
        tasks: [
          {
            name: 'equipment adjustment',
            score: '5/5',
            description: 'Exceptional equipment adjustment execution with outstanding precision and expertise, resulting in superior product quality and operational excellence.'
          },
          {
            name: 'Manual Product Assembly',
            score: '5/5',
            description: 'Outstanding manual assembly performance with exceptional skill and attention to detail, contributing to superior product outcomes.'
          },
          {
            name: 'raw material inspection',
            score: '5/5',
            description: 'Excellent raw material inspection with thorough quality checks and consistent standards, ensuring all materials meet the highest quality requirements.'
          }
        ]
      },
      adjustments: {
        description: 'This phase demonstrated significant improvement with excellent performance across all critical areas. All adjustments and quality checks were completed with superior precision.',
        tasks: [
          {
            name: 'quality inspection',
            score: '4/5',
            description: 'Significant improvement in quality inspection with much better consistency and attention to detail, showing clear progress in quality standards.'
          },
          {
            name: 'documentation review',
            score: '4/5',
            description: 'Good documentation review with improved completeness and better standardization, capturing most required information effectively.'
          },
          {
            name: 'safety compliance',
            score: '4/5',
            description: 'Much improved safety compliance with better adherence to protocols and reduced violations, showing clear progress in safety standards.'
          },
          {
            name: 'equipment calibration',
            score: '4/5',
            description: 'Good equipment calibration with proper completion and verification procedures, ensuring consistent performance and reliability.'
          }
        ]
      }
    }
  }

  const currentPhaseData = runPhaseData[selectedRun as keyof typeof runPhaseData] || runPhaseData['Run 1']

  const phases = [
    {
      id: 1,
      name: 'cleaning',
      status: currentMetrics.cleaning.status,
      score: currentMetrics.cleaning.value,
      color: currentMetrics.cleaning.statusType === 'success' ? 'bg-success' : 
             currentMetrics.cleaning.statusType === 'warning' ? 'bg-warning' : 'bg-info',
      borderColor: 'border-l-teal-500',
      description: currentPhaseData.cleaning.description,
      tasks: currentPhaseData.cleaning.tasks
    },
    {
      id: 2,
      name: 'exchange of parts',
      status: currentMetrics.exchangeOfParts.status,
      score: currentMetrics.exchangeOfParts.value,
      color: currentMetrics.exchangeOfParts.statusType === 'success' ? 'bg-success' : 
             currentMetrics.exchangeOfParts.statusType === 'warning' ? 'bg-warning' : 'bg-info',
      borderColor: 'border-l-success',
      description: currentPhaseData.exchangeOfParts.description,
      tasks: currentPhaseData.exchangeOfParts.tasks
    },
    {
      id: 3,
      name: 'adjustments',
      status: currentMetrics.adjustments.status,
      score: currentMetrics.adjustments.value,
      color: currentMetrics.adjustments.statusType === 'success' ? 'bg-success' : 
             currentMetrics.adjustments.statusType === 'warning' ? 'bg-warning' : 'bg-info',
      borderColor: 'border-l-blue-500',
      description: currentPhaseData.adjustments.description,
      tasks: currentPhaseData.adjustments.tasks
    }
  ]

  const toggleItems = [
    { label: 'Highlights', value: 'highlights' },
    { label: 'Scorecard', value: 'scorecard' },
    { label: 'Feed', value: 'feed' }
  ]

  return (
    <div className="w-[400px] bg-white border-l border-zinc-200 border-r border-zinc-200 flex flex-col h-full">
      {/* Content */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {/* Toggle Group */}
        <div className="bg-white border border-zinc-200 rounded-md p-1.5 w-fit">
          <div className="flex gap-1">
            {toggleItems.map((item) => (
              <button
                key={item.value}
                onClick={() => setActiveTab(item.value)}
                className={`px-3 py-1.5 rounded text-sm font-medium transition-colors ${
                  activeTab === item.value
                    ? 'bg-accent-light text-accent'
                    : 'text-primary-hover hover:bg-gray-50'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content */}
        {activeTab === 'scorecard' ? (
          phases.map((phase) => (
            <div key={phase.id} className={`relative ${phase.borderColor} border-l-4 rounded-lg`}>
              <Card className="p-4 rounded-lg">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <h3 className="text-base font-medium text-primary capitalize">{phase.name}</h3>
                    <Badge 
                      variant={phase.id === 1 ? (currentMetrics.cleaning.statusType as any) : 
                              phase.id === 2 ? (currentMetrics.exchangeOfParts.statusType as any) : 
                              (currentMetrics.adjustments.statusType as any)} 
                      className="text-xs px-2.5 py-0.5"
                    >
                      {phase.status}
                    </Badge>
                  </div>
                  <div className="text-sm font-semibold text-primary">{phase.score}</div>
                </div>
                
                <p className="text-sm text-primary mb-3">{phase.description}</p>
                
                {/* Feedback buttons */}
                <div className="flex items-center gap-2 mb-3">
                  <button 
                    onClick={handleFeedbackClick}
                    className="p-1.5 bg-white border border-zinc-200 rounded-md hover:bg-gray-50 transition-colors"
                  >
                    <ThumbsUp className="w-4 h-4 text-gray-600" />
                  </button>
                  <button 
                    onClick={handleFeedbackClick}
                    className="p-1.5 bg-white border border-zinc-200 rounded-md hover:bg-gray-50 transition-colors"
                  >
                    <ThumbsDown className="w-4 h-4 text-gray-600" />
                  </button>
                </div>
                
                {/* Hide/Show Breakdown Button */}
                <button
                  onClick={() => togglePhase(phase.id)}
                  className="flex items-center gap-2 px-2 py-1 bg-accent-light text-accent text-xs font-medium rounded-md hover:bg-accent hover:text-white transition-colors"
                >
                  {collapsedPhases.has(phase.id) ? 'Show Breakdown' : 'Hide Breakdown'}
                  {collapsedPhases.has(phase.id) ? (
                    <ChevronDown className="w-4 h-4" />
                  ) : (
                    <ArrowUp className="w-4 h-4" />
                  )}
                </button>
                
                {/* Tasks */}
                {!collapsedPhases.has(phase.id) && phase.tasks.length > 0 && (
                  <div className="mt-4 space-y-4">
                    {phase.tasks.map((task, index) => (
                      <Card key={index} className="p-4 rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="text-sm font-medium text-primary capitalize">{task.name}</h4>
                          <span className="text-sm font-semibold text-primary">{task.score}</span>
                        </div>
                        <p className="text-xs text-primary mb-2 leading-5">{task.description}</p>
                        <div className="flex items-center gap-2">
                          <button 
                            onClick={handleFeedbackClick}
                            className="p-1.5 bg-white border border-zinc-200 rounded-md hover:bg-gray-50 transition-colors"
                          >
                            <ThumbsUp className="w-4 h-4 text-gray-600" />
                          </button>
                          <button 
                            onClick={handleFeedbackClick}
                            className="p-1.5 bg-white border border-zinc-200 rounded-md hover:bg-gray-50 transition-colors"
                          >
                            <ThumbsDown className="w-4 h-4 text-gray-600" />
                          </button>
                        </div>
                      </Card>
                    ))}
                  </div>
                )}
              </Card>
            </div>
          ))
        ) : activeTab === 'highlights' ? (
          <div className="space-y-4">
            {/* Run Time Card - Exact Figma Structure */}
            <div className="bg-white border border-zinc-200 rounded-lg p-4 h-[104px] flex flex-col justify-between">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-medium text-primary capitalize">run time</h3>
              </div>
              <div className="flex items-end justify-between">
                <div className="text-3xl font-medium text-primary">{currentMetrics.runTime.value}</div>
                <Badge variant={currentMetrics.runTime.changeType as any} className="text-xs font-medium">
                  {currentMetrics.runTime.change}
                </Badge>
              </div>
            </div>

            {/* Cleaning Card - Exact Figma Structure */}
            <div className="bg-white border border-zinc-200 rounded-lg p-4 h-[104px] flex flex-col justify-between">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-medium text-primary capitalize">cleaning</h3>
              </div>
              <div className="flex items-end justify-between">
                <div className="text-3xl font-medium text-primary">{currentMetrics.cleaning.value}</div>
                <Badge variant={currentMetrics.cleaning.statusType as any} className="text-xs font-medium">
                  {currentMetrics.cleaning.status}
                </Badge>
              </div>
            </div>

            {/* Exchange of Parts Card - Exact Figma Structure */}
            <div className="bg-white border border-zinc-200 rounded-lg p-4 h-[104px] flex flex-col justify-between">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-medium text-primary capitalize">exchange of parts</h3>
              </div>
              <div className="flex items-end justify-between">
                <div className="text-3xl font-medium text-primary">{currentMetrics.exchangeOfParts.value}</div>
                <Badge variant={currentMetrics.exchangeOfParts.statusType as any} className="text-xs font-medium">
                  {currentMetrics.exchangeOfParts.status}
                </Badge>
              </div>
            </div>

            {/* Adjustments Card - Exact Figma Structure */}
            <div className="bg-white border border-zinc-200 rounded-lg p-4 flex flex-col justify-between">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-medium text-primary capitalize">adjustments</h3>
              </div>
              <div className="flex items-end justify-between">
                <div className="text-3xl font-medium text-primary">{currentMetrics.adjustments.value}</div>
                <Badge variant={currentMetrics.adjustments.statusType as any} className="text-xs font-medium">
                  {currentMetrics.adjustments.status}
                </Badge>
              </div>
            </div>

            {/* What went well - Exact Figma Structure */}
            <div className="bg-white border border-zinc-200 rounded-lg p-4">
              <div className="flex items-center gap-1 mb-2">
                <Check className="w-5 h-5 text-success" />
                <h3 className="text-base font-medium text-success capitalize">What went well this run</h3>
              </div>
              <p className="text-sm text-primary leading-5">
                The team demonstrated excellent coordination and preparation with all necessary tools and materials staged properly, resulting in smooth execution of complex procedures with minimal idle time and no mechanical re-work required.
              </p>
            </div>

            {/* What could be improved - Exact Figma Structure */}
            <div className="bg-white border border-zinc-200 rounded-lg p-4">
              <div className="flex items-center gap-1 mb-2">
                <X className="w-5 h-5 text-warning" />
                <h3 className="text-base font-medium text-warning capitalize">What could be improved this run</h3>
              </div>
              <p className="text-sm text-primary leading-5">
                Flashlight confirmation during cleaning processes was inconsistent, and the final quality verification documentation was not captured on video, suggesting room for improvement in verification protocols.
              </p>
            </div>

            {/* Phase 1 Recommendation - Exact Figma Structure */}
            <div className="bg-white border border-zinc-200 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <Sparkles className="w-4 h-4 text-accent" />
                <h3 className="text-xs font-medium text-accent">Phase 1 Recommendation</h3>
              </div>
              <p className="text-xs text-primary">
                Make sure everyone stays motivated on the floor, especially during early hours.
              </p>
            </div>

            {/* Phase 2 Recommendation - Exact Figma Structure */}
            <div className="bg-white border border-zinc-200 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <Sparkles className="w-4 h-4 text-accent" />
                <h3 className="text-xs font-medium text-accent">Phase 2 Recommendation</h3>
              </div>
              <p className="text-xs text-primary">
                Make sure everyone stays motivated on the floor, especially during early hours.
              </p>
            </div>

            {/* Phase 3 Recommendation - Exact Figma Structure */}
            <div className="bg-white border border-zinc-200 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <Sparkles className="w-4 h-4 text-accent" />
                <h3 className="text-xs font-medium text-accent">Phase 3 Recommendation</h3>
              </div>
              <p className="text-xs text-primary">
                Make sure everyone stays motivated on the floor, especially during early hours.
              </p>
            </div>
          </div>
        ) : (
          <div className="text-center text-sm text-gray-500 py-4">No feed items available</div>
        )}
      </div>

      {/* Toast Notification */}
      {showToast && (
        <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50">
          <div className="bg-primary text-white px-6 py-4 rounded-md shadow-lg flex items-center gap-4 min-w-[414px]">
            <div className="w-6 h-6 flex items-center justify-center">
              <Check className="w-5 h-5 text-white" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium">Thank you for your feedback.</p>
            </div>
            <button 
              onClick={() => setShowToast(false)}
              className="p-1 hover:bg-white/20 rounded transition-colors"
            >
              <X className="w-4 h-4 text-white" />
            </button>
          </div>
        </div>
      )}
    </div>
  )
}