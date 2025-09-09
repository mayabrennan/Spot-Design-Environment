'use client'

import React, { useState, useRef, useEffect } from 'react'
import { Play, Pause, Volume2, Settings, Maximize, ChevronRight, X } from 'lucide-react'
import { Card, Timeline } from '@spotai/design-system'
import ReportsExpandedPanel from '../UI/ReportExpandedPanel'

interface VideoTabProps {
  selectedRun?: string
}

export default function VideoTab({ selectedRun = 'Run 1' }: VideoTabProps) {
  const [isPlaying, setIsPlaying] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)
  const [hoverModal, setHoverModal] = useState<{
    isVisible: boolean
    x: number
    y: number
    step: string
    label: string
    duration: string
    status: string
    screenshot?: string
  }>({
    isVisible: false,
    x: 0,
    y: 0,
    step: '',
    label: '',
    duration: '',
    status: '',
    screenshot: undefined
  })

  const handleBack = () => {
    // Handle going back - for now just a placeholder
    console.log('Going back from video tab')
  }

  // Individual steps data matching Figma design
  const stepsData = [
    { id: 'step-1', width: '450px', leftOffset: '0px', color: 'bg-teal-500', label: 'cleaning and prep', duration: '3:20', status: 'completed' },
    { id: 'step-2', width: '380px', leftOffset: '100px', color: 'bg-teal-500', label: 'tools staging', duration: '2:15', status: 'completed' },
    { id: 'step-3', width: '420px', leftOffset: '50px', color: 'bg-teal-500', label: 'plates staging', duration: '2:45', status: 'completed' },
    { id: 'step-4', width: '594px', leftOffset: '0px', color: 'bg-success', label: 'equipment adjustment', duration: '2:15', status: 'completed' },
    { id: 'step-5', width: '477px', leftOffset: '120px', color: 'bg-success', label: 'manual adjustment', duration: '1:45', status: 'completed' },
    { id: 'step-6', width: '5px', leftOffset: '300px', color: 'bg-success', label: 'raw material inspection', duration: '1:20', status: 'completed' },
    { id: 'step-7', width: '726px', leftOffset: '0px', color: 'bg-blue-500', label: 'quality inspection', duration: '2:30', status: 'in-progress' },
    { id: 'step-8', width: '726px', leftOffset: '80px', color: 'bg-blue-500', label: 'documentation review', duration: '1:50', status: 'pending' },
    { id: 'step-9', width: '477px', leftOffset: '50px', color: 'bg-blue-500', label: 'safety compliance', duration: '3:10', status: 'completed' },
    { id: 'step-10', width: '600px', leftOffset: '100px', color: 'bg-blue-500', label: 'equipment calibration', duration: '2:45', status: 'pending' }
  ]

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

  const handleStepHover = (step: { id: string; label: string; duration: string; status: string }, event: React.MouseEvent) => {
    const rect = event.currentTarget.getBoundingClientRect()
    
    // Capture screenshot
    const screenshot = captureVideoScreenshot()
    
    setHoverModal({
      isVisible: true,
      x: rect.left + rect.width / 2,
      y: rect.top,
      step: step.id,
      label: step.label,
      duration: step.duration,
      status: step.status,
      screenshot
    })
  }

  const handleSegmentLeave = () => {
    setHoverModal(prev => ({ ...prev, isVisible: false }))
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

  return (
    <div className="flex h-full bg-neutral-50">
      {/* Reports Expanded Panel */}
      <ReportsExpandedPanel onBack={handleBack} selectedRun={selectedRun} />

      {/* Main Video Content */}
      <div className="flex-1 flex flex-col h-full">
        {/* Video Player */}
        <div className="px-6 pt-6">
          <div className="bg-black rounded-lg aspect-video relative overflow-hidden" style={{ borderRadius: '8px' }}>
            {/* Video Player */}
            <video
              ref={videoRef}
              src="/videos/sampe_video.mp4"
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

        {/* Timebar Card */}
        <div className="px-6 pt-4">
          <Card variant="default" className="p-0">
            <div className="bg-white relative rounded-lg size-full">
              <div className="box-border content-stretch flex flex-col gap-2 items-start justify-center overflow-clip px-0 py-4 relative size-full">
                <div className="box-border capitalize content-stretch flex font-['Inter:Regular',_sans-serif] font-normal h-3 items-center justify-between leading-[0] not-italic px-4 py-0 relative shrink-0 text-[#313a45] text-[10px] text-nowrap w-full">
                  <div className="relative shrink-0">
                    <p className="leading-[normal] text-nowrap whitespace-pre">00:02:00</p>
                  </div>
                  <div className="relative shrink-0">
                    <p className="leading-[normal] text-nowrap whitespace-pre">00:02:05</p>
                  </div>
                  <div className="relative shrink-0">
                    <p className="leading-[normal] text-nowrap whitespace-pre">00:02:10</p>
                  </div>
                  <div className="relative shrink-0">
                    <p className="leading-[normal] text-nowrap whitespace-pre">00:02:15</p>
                  </div>
                  <div className="relative shrink-0">
                    <p className="leading-[normal] text-nowrap whitespace-pre">00:02:20</p>
                  </div>
                  <div className="relative shrink-0">
                    <p className="leading-[normal] text-nowrap whitespace-pre">00:02:25</p>
                  </div>
                  <div className="relative shrink-0">
                    <p className="leading-[normal] text-nowrap whitespace-pre">00:02:30</p>
                  </div>
                  <div className="relative shrink-0">
                    <p className="leading-[normal] text-nowrap whitespace-pre">00:02:35</p>
                  </div>
                  <div className="relative shrink-0">
                    <p className="leading-[normal] text-nowrap whitespace-pre">00:02:40</p>
                  </div>
                </div>
              </div>
              <div aria-hidden="true" className="absolute border border-solid border-zinc-200 inset-0 pointer-events-none rounded-lg" />
            </div>
          </Card>
        </div>

        {/* Timeline */}
        <div className="px-6 pb-6 mt-6">
          <Card variant="default" className="p-0">
            <div className="bg-white rounded-lg">
              <div className="p-2">
                {/* Individual Steps Timeline matching Figma design */}
                <div>
                  {stepsData.map((step, index) => (
                    <div key={step.id} className="p-2">
                      <div className="flex flex-col gap-2">
                        {/* Step Button */}
                        <div className="flex gap-2 items-center justify-start p-1 rounded-md">
                          <div className="flex gap-2.5 items-center justify-start">
                            <div className="capitalize font-medium text-primary text-sm">
                              {step.label}
                            </div>
                          </div>
                        </div>
                        
                        {/* Timeline Bar */}
                        <div className="flex flex-col items-start justify-start px-2 py-0 relative w-full">
                          {/* Base line with overlaid progress bar */}
                          <div className="h-1.5 relative w-full">
                            <div className="absolute inset-[-3px_-0.35%]">
                              {/* Grey base line */}
                              <div className="h-1.5 bg-zinc-200 w-full rounded-full"></div>
                              
                              {/* Purple progress bar overlaid on top */}
                              <div 
                                className={`absolute top-0 h-1.5 ${step.color} cursor-pointer transition-all duration-200 hover:opacity-80 rounded-full ${
                                  hoverModal?.isVisible && hoverModal.step === step.id
                                    ? 'h-2 shadow-md' 
                                    : 'h-1.5'
                                }`}
                                style={{ 
                                  width: step.width,
                                  left: step.leftOffset,
                                  marginTop: hoverModal?.isVisible && hoverModal.step === step.id
                                    ? '-2px' 
                                    : '0px'
                                }}
                                onMouseEnter={(e) => handleStepHover(step, e)}
                                onMouseLeave={handleSegmentLeave}
                              ></div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Card>
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
                {hoverModal.label}
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
                // eslint-disable-next-line @next/next/no-img-element
                <img 
                  src={hoverModal.screenshot} 
                  alt="Video preview" 
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <div className="text-white text-xs">Loading preview...</div>
                </div>
              )}
            </div>

            {/* Step Info */}
            <div className="mt-2 space-y-1">
              <div className="text-xs text-gray-600">Duration: {hoverModal.duration}</div>
              <div className="text-xs text-gray-600 capitalize">Status: {hoverModal.status}</div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}