'use client'

import { useState, useRef, useEffect } from 'react'
import Image from 'next/image'
import { Play, Pause, Volume2, Settings, Maximize, ChevronRight, ChevronDown, X } from 'lucide-react'
import { Card, Timeline } from '@spotai/design-system'
import ReportsPanel from '../components/UI/ReportsPanel'

interface RunProps {
  onTaskClick?: () => void
}

export default function Run({ onTaskClick }: RunProps = {}) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [showScorecard, setShowScorecard] = useState(true)
  const [selectedRun, setSelectedRun] = useState('Run 1')
  const [isRunDropdownOpen, setIsRunDropdownOpen] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)
  const [hoverModal, setHoverModal] = useState<{
    isVisible: boolean
    x: number
    y: number
    phase: string
    type: string
    segment?: number
    screenshot?: string
  }>({
    isVisible: false,
    x: 0,
    y: 0,
    phase: '',
    type: '',
    segment: undefined,
    screenshot: undefined
  })

  // Available runs
  const runs = ['Run 1', 'Run 2']

  // Timeline data
  const timelineData = {
    phase1: {
      timeline: [
        { id: 'p1-t1', width: '25%', color: 'bg-blue-500', phase: 'phase 1', type: 'timeline' as const },
        { id: 'p1-t2', width: '20%', color: 'bg-blue-500', phase: 'phase 1', type: 'timeline' as const },
        { id: 'p1-t3', width: '15%', color: 'bg-blue-500', phase: 'phase 1', type: 'timeline' as const },
        { id: 'p1-t4', width: '18%', color: 'bg-blue-500', phase: 'phase 1', type: 'timeline' as const },
        { id: 'p1-t5', width: '14%', color: 'bg-blue-500', phase: 'phase 1', type: 'timeline' as const }
      ],
      baseline: [
        { id: 'p1-b1', width: '30%', color: 'bg-accent', phase: 'phase 1', type: 'baseline' as const },
        { id: 'p1-b2', width: '18%', color: 'bg-accent', phase: 'phase 1', type: 'baseline' as const },
        { id: 'p1-b3', width: '22%', color: 'bg-accent', phase: 'phase 1', type: 'baseline' as const },
        { id: 'p1-b4', width: '24%', color: 'bg-accent', phase: 'phase 1', type: 'baseline' as const }
      ]
    },
    phase2: {
      timeline: [
        { id: 'p2-t1', width: '20%', color: 'bg-success', phase: 'phase 2', type: 'timeline' as const },
        { id: 'p2-t2', width: '18%', color: 'bg-success', phase: 'phase 2', type: 'timeline' as const },
        { id: 'p2-t3', width: '15%', color: 'bg-success', phase: 'phase 2', type: 'timeline' as const },
        { id: 'p2-t4', width: '8%', color: 'bg-success', phase: 'phase 2', type: 'timeline' as const }
      ],
      baseline: [
        { id: 'p2-b1', width: '25%', color: 'bg-accent', phase: 'phase 2', type: 'baseline' as const },
        { id: 'p2-b2', width: '20%', color: 'bg-accent', phase: 'phase 2', type: 'baseline' as const },
        { id: 'p2-b3', width: '12%', color: 'bg-accent', phase: 'phase 2', type: 'baseline' as const },
        { id: 'p2-b4', width: '4%', color: 'bg-accent', phase: 'phase 2', type: 'baseline' as const }
      ]
    },
    phase3: {
      timeline: [
        { id: 'p3-t1', width: '15%', color: 'bg-warning', phase: 'phase 3', type: 'timeline' as const },
        { id: 'p3-t2', width: '12%', color: 'bg-warning', phase: 'phase 3', type: 'timeline' as const },
        { id: 'p3-t3', width: '8%', color: 'bg-warning', phase: 'phase 3', type: 'timeline' as const },
        { id: 'p3-t4', width: '4%', color: 'bg-warning', phase: 'phase 3', type: 'timeline' as const }
      ],
      baseline: [
        { id: 'p3-b1', width: '18%', color: 'bg-accent', phase: 'phase 3', type: 'baseline' as const },
        { id: 'p3-b2', width: '12%', color: 'bg-accent', phase: 'phase 3', type: 'baseline' as const },
        { id: 'p3-b3', width: '8%', color: 'bg-accent', phase: 'phase 3', type: 'baseline' as const },
        { id: 'p3-b4', width: '3%', color: 'bg-accent', phase: 'phase 3', type: 'baseline' as const }
      ]
    }
  }

  const captureVideoScreenshot = (): string | undefined => {
    if (!videoRef.current) return undefined
    
    const canvas = document.createElement('canvas')
    const video = videoRef.current
    const context = canvas.getContext('2d')
    
    if (!context) return undefined
    
    // Set canvas size to match video dimensions
    canvas.width = video.videoWidth || 640
    canvas.height = video.videoHeight || 360
    
    // Draw the current video frame to canvas
    context.drawImage(video, 0, 0, canvas.width, canvas.height)
    
    // Convert to data URL
    return canvas.toDataURL('image/jpeg', 0.8)
  }

  const handleSegmentHover = (segment: { id: string; phase: string; type: string }, event: React.MouseEvent) => {
    const rect = event.currentTarget.getBoundingClientRect()
    const phaseKey = segment.phase.replace(' ', '') as keyof typeof timelineData
    const segmentIndex = timelineData[phaseKey][segment.type as 'timeline' | 'baseline'].findIndex(s => s.id === segment.id)
    
    // Capture screenshot
    const screenshot = captureVideoScreenshot()
    
    setHoverModal({
      isVisible: true,
      x: rect.left + rect.width / 2,
      y: rect.top,
      phase: segment.phase,
      type: segment.type,
      segment: segmentIndex,
      screenshot
    })
  }

  const handleSegmentLeave = () => {
    setHoverModal(prev => ({ ...prev, isVisible: false }))
  }

  const playRandomVideoSegment = () => {
    if (videoRef.current) {
      // Generate a random time between 0 and 90% of video duration
      const duration = videoRef.current.duration || 120 // Default 2 minutes if duration not available
      const randomTime = Math.random() * (duration * 0.9)
      
      videoRef.current.currentTime = randomTime
      setIsPlaying(true)
      videoRef.current.play()
    }
  }

  // Handle video play/pause
  useEffect(() => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.play().catch(console.error)
      } else {
        videoRef.current.pause()
      }
    }
  }, [isPlaying])

  // Handle clicks outside dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (isRunDropdownOpen) {
        const target = event.target as Element
        if (!target.closest('.run-dropdown')) {
          setIsRunDropdownOpen(false)
        }
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [isRunDropdownOpen])

  return (
    <div className="flex flex-col h-full bg-neutral-50 w-full">
      {/* Run Header - spans full width */}
      <div className="bg-white border-b border-zinc-200 px-4 py-4 flex flex-col gap-4">
        <div className="flex gap-1 items-center">
          <div className="flex gap-1.5 items-center">
            <div className="text-sm font-medium text-primary-hover">Operations</div>
          </div>
          <ChevronRight className="w-3.5 h-3.5" />
          <div className="flex gap-2.5 items-center">
            <div className="text-sm font-medium text-primary-hover">SOP Changeover Assistant</div>
          </div>
          <ChevronRight className="w-3.5 h-3.5" />
          <div className="flex gap-2.5 items-center">
            <div className="text-sm font-medium text-primary">{selectedRun}</div>
          </div>
          <ChevronDown className="w-3.5 h-3.5" />
        </div>
        
        <div className="flex items-center justify-between">
          <div className="text-xl font-semibold text-primary capitalize">{selectedRun.toLowerCase()}</div>
          <div className="flex gap-4 items-center">
            <div className="relative run-dropdown">
              <button
                onClick={() => setIsRunDropdownOpen(!isRunDropdownOpen)}
                className="bg-white border border-zinc-200 flex h-9 items-center justify-between px-3 py-2 rounded-md w-56 hover:bg-gray-50 transition-colors"
              >
                <div className="flex gap-2.5 items-center">
                  <div className="text-sm font-medium text-primary capitalize">{selectedRun.toLowerCase()}</div>
                </div>
                <div className="flex gap-2.5 items-center justify-end">
                  <ChevronDown className={`w-4 h-4 transition-transform ${isRunDropdownOpen ? 'rotate-180' : ''}`} />
                </div>
              </button>
              
              {/* Dropdown Menu */}
              {isRunDropdownOpen && (
                <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
                  {runs.map((run) => (
                    <button
                      key={run}
                      onClick={() => {
                        setSelectedRun(run)
                        setIsRunDropdownOpen(false)
                      }}
                      className={`flex items-center gap-2 w-full px-3 py-2 text-left hover:bg-gray-50 focus:outline-none focus:bg-gray-50 transition-colors text-sm ${
                        selectedRun === run ? 'bg-accent-light text-accent' : ''
                      }`}
                    >
                      <span className="capitalize">{run.toLowerCase()}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Content Area */}
      <div className="flex flex-1 overflow-hidden">
                    {/* Scorecard Panel */}
            {showScorecard && <ReportsPanel onTaskClick={playRandomVideoSegment} />}

        {/* Main Video Content */}
        <div className="flex-1 flex flex-col h-full min-w-0">
        {/* Video Player */}
        <div className="flex-1 p-6">
          <div className="bg-black rounded-lg aspect-video relative overflow-hidden" style={{ borderRadius: '8px' }}>
            {/* Video Player */}
            <video
              ref={videoRef}
              src="/videos/sample_video.mp4"
              className="w-full h-full object-cover"
              controls={false}
              onLoadedMetadata={() => {
                if (videoRef.current) {
                  // Set initial time to 30 seconds for better preview
                  videoRef.current.currentTime = 30
                }
              }}
            />
            
            {/* Video Controls */}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="text-white hover:text-gray-300 transition-colors"
                >
                  {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6" />}
                </button>
                
                <div className="flex-1 bg-white/20 rounded-full h-1">
                  <div className="bg-white h-1 rounded-full" style={{ width: '35%' }}></div>
                </div>
                
                <div className="flex items-center gap-2">
                  <Volume2 className="w-4 h-4 text-white" />
                  <Settings className="w-4 h-4 text-white" />
                  <Maximize className="w-4 h-4 text-white" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Timeline */}
        <div className="px-6 pb-6">
          <Card variant="default" className="p-4">
            <h3 className="text-base font-medium text-accent mb-4">Timeline</h3>
            <div className="space-y-4">
              {/* Phase 1 Section */}
              <div className="space-y-2">
                {/* Phase 1 Button */}
                <div className="flex items-center gap-2">
                  <button className="px-2 py-1 text-sm font-medium text-primary capitalize">
                    phase 1
                  </button>
                </div>
                
                {/* Phase 1 Timeline */}
                <Timeline 
                  segments={timelineData.phase1.timeline}
                  onSegmentHover={handleSegmentHover}
                  onSegmentLeave={handleSegmentLeave}
                  hoverModal={hoverModal}
                />
                
                {/* Phase 1 Baseline */}
                <div className="flex items-center gap-2">
                  <button className="px-2 py-1 text-sm font-medium text-primary-hover capitalize">
                    baseline
                  </button>
                </div>
                <Timeline 
                  segments={timelineData.phase1.baseline}
                  onSegmentHover={handleSegmentHover}
                  onSegmentLeave={handleSegmentLeave}
                  hoverModal={hoverModal}
                />
              </div>

              {/* Phase 2 Section */}
              <div className="space-y-2">
                {/* Phase 2 Button */}
                <div className="flex items-center gap-2">
                  <button className="px-2 py-1 text-sm font-medium text-primary capitalize">
                    phase 2
                  </button>
                </div>
                
                {/* Phase 2 Timeline */}
                <Timeline 
                  segments={timelineData.phase2.timeline}
                  onSegmentHover={handleSegmentHover}
                  onSegmentLeave={handleSegmentLeave}
                  hoverModal={hoverModal}
                />
                
                {/* Phase 2 Baseline */}
                <div className="flex items-center gap-2">
                  <button className="px-2 py-1 text-sm font-medium text-primary-hover capitalize">
                    baseline
                  </button>
                </div>
                <Timeline 
                  segments={timelineData.phase2.baseline}
                  onSegmentHover={handleSegmentHover}
                  onSegmentLeave={handleSegmentLeave}
                  hoverModal={hoverModal}
                />
              </div>

              {/* Phase 3 Section */}
              <div className="space-y-2">
                {/* Phase 3 Button */}
                <div className="flex items-center gap-2">
                  <button className="px-2 py-1 text-sm font-medium text-primary capitalize">
                    phase 3
                  </button>
                </div>
                
                {/* Phase 3 Timeline */}
                <Timeline 
                  segments={timelineData.phase3.timeline}
                  onSegmentHover={handleSegmentHover}
                  onSegmentLeave={handleSegmentLeave}
                  hoverModal={hoverModal}
                />
                
                {/* Phase 3 Baseline */}
                <div className="flex items-center gap-2">
                  <button className="px-2 py-1 text-sm font-medium text-primary-hover capitalize">
                    baseline
                  </button>
                </div>
                <Timeline 
                  segments={timelineData.phase3.baseline}
                  onSegmentHover={handleSegmentHover}
                  onSegmentLeave={handleSegmentLeave}
                  hoverModal={hoverModal}
                />
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>

      {/* Hover Video Preview Modal */}
      {hoverModal.isVisible && (
        <div
          className="fixed z-50 pointer-events-none"
          style={{
            left: hoverModal.x,
            top: hoverModal.y - 16,
            transform: 'translate(-50%, -100%)'
          }}
        >
          <div className="bg-white rounded-lg shadow-xl border border-zinc-200 p-3 pointer-events-auto">
            {/* Modal Header */}
            <div className="flex items-center justify-between mb-2">
              <div className="text-sm font-medium text-primary capitalize">
                {hoverModal.phase} {hoverModal.type}
              </div>
              <button
                onClick={() => setHoverModal(prev => ({ ...prev, isVisible: false }))}
                className="p-1 hover:bg-gray-100 rounded transition-colors"
              >
                <X className="w-3 h-3 text-gray-500" />
              </button>
            </div>

            {/* Video Preview */}
            <div className="w-64 h-36 bg-black rounded-md overflow-hidden">
              {hoverModal.screenshot ? (
                <Image 
                  src={hoverModal.screenshot} 
                  alt="Video preview" 
                  width={256}
                  height={144}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <div className="text-white text-xs">Loading preview...</div>
                </div>
              )}
            </div>

            {/* Video Info */}
            <div className="mt-2 space-y-1">
              <div className="text-xs text-gray-600">Duration: 2:34</div>
              <div className="text-xs text-gray-600">Quality: 1080p</div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

