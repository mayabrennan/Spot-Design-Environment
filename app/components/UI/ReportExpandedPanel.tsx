'use client'

import { ChevronRight, MoreHorizontal, Download, Sparkles, ArrowUp, Check, X, ChevronDown, ArrowLeft, ThumbsUp, ThumbsDown } from 'lucide-react'
import { Card, Badge } from '@spotai/design-system'
import { useState } from 'react'

interface ReportExpandedPanelProps {
  onBack: () => void
  onTaskClick?: () => void
}

export default function ReportExpandedPanel({ onBack, onTaskClick }: ReportExpandedPanelProps) {
  const [collapsedPhases, setCollapsedPhases] = useState<Set<number>>(new Set())
  const [activeTab, setActiveTab] = useState('highlights')

  const togglePhase = (phaseId: number) => {
    const newCollapsed = new Set(collapsedPhases)
    if (newCollapsed.has(phaseId)) {
      newCollapsed.delete(phaseId)
    } else {
      newCollapsed.add(phaseId)
    }
    setCollapsedPhases(newCollapsed)
  }

  const phases = [
    {
      id: 1,
      name: 'phase 1',
      status: 'Nice one!',
      score: '4/4',
      color: 'bg-success',
      borderColor: 'border-l-success',
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
    {
      id: 2,
      name: 'phase 2',
      status: 'Could be Improved',
      score: '2/4',
      color: 'bg-warning',
      borderColor: 'border-l-blue-500',
      description: 'Overall, this phase was successful. The equipment adjustment and manual labelling were conducted quickly and correctly, but there was room for improvement on the raw material inspection.',
      tasks: []
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
                      variant={phase.id === 1 ? 'success' : 'warning'} 
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
                  <button className="p-1.5 bg-neutral-100 rounded-md hover:bg-gray-200 transition-colors">
                    <ThumbsUp className="w-4 h-4 text-gray-600" />
                  </button>
                  <button className="p-1.5 bg-white border border-zinc-200 rounded-md hover:bg-gray-50 transition-colors">
                    <ThumbsDown className="w-4 h-4 text-gray-600" />
                  </button>
                </div>
                
                {/* Hide/Show Breakdown Button */}
                <button
                  onClick={() => togglePhase(phase.id)}
                  className="flex items-center gap-2 px-2 py-1 bg-accent-light text-accent text-xs font-medium rounded-md hover:bg-accent hover:text-white transition-colors"
                >
                  {collapsedPhases.has(phase.id) ? 'show breakdown' : 'hide breakdown'}
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
                          <button className="p-1.5 bg-white border border-zinc-200 rounded-md hover:bg-gray-50 transition-colors">
                            <ThumbsUp className="w-4 h-4 text-gray-600" />
                          </button>
                          <button className="p-1.5 bg-white border border-zinc-200 rounded-md hover:bg-gray-50 transition-colors">
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
                <div className="text-3xl font-medium text-primary">23 min</div>
                <Badge variant="warning" className="text-xs font-medium">
                  +3 min
                </Badge>
              </div>
            </div>

            {/* Cleaning Card - Exact Figma Structure */}
            <div className="bg-white border border-zinc-200 rounded-lg p-4 h-[104px] flex flex-col justify-between">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-medium text-primary capitalize">cleaning</h3>
              </div>
              <div className="flex items-end justify-between">
                <div className="text-3xl font-medium text-primary">4/5</div>
                <Badge variant="info" className="text-xs font-medium">
                  great
                </Badge>
              </div>
            </div>

            {/* Exchange of Parts Card - Exact Figma Structure */}
            <div className="bg-white border border-zinc-200 rounded-lg p-4 h-[104px] flex flex-col justify-between">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-medium text-primary capitalize">exchange of parts</h3>
              </div>
              <div className="flex items-end justify-between">
                <div className="text-3xl font-medium text-primary">4/5</div>
                <Badge variant="warning" className="text-xs font-medium">
                  needs work
                </Badge>
              </div>
            </div>

            {/* Adjustments Card - Exact Figma Structure */}
            <div className="bg-white border border-zinc-200 rounded-lg p-4 flex flex-col justify-between">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-medium text-primary capitalize">adjustments</h3>
              </div>
              <div className="flex items-end justify-between">
                <div className="text-3xl font-medium text-primary">3.8/4</div>
                <Badge variant="success" className="text-xs font-medium">
                  excellent
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
    </div>
  )
}