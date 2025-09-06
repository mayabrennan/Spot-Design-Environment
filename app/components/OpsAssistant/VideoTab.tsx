'use client'

import React, { useState, useRef, useEffect } from 'react'
import { Play, Pause, Volume2, Settings, Maximize, ChevronRight, X } from 'lucide-react'
import { Card, Timeline } from '@spotai/design-system'
import ReportsExpandedPanel from '../UI/ReportExpandedPanel'

export default function VideoTab() {
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

  // Individual steps data
  const stepsData = [
    { id: 'step-1', width: '18%', color: 'bg-blue-500', label: 'Equipment Shutdown', duration: '2:15', status: 'completed' },
    { id: 'step-2', width: '15%', color: 'bg-blue-500', label: 'Safety Lockout', duration: '1:45', status: 'completed' },
    { id: 'step-3', width: '12%', color: 'bg-success', label: 'Tool Preparation', duration: '1:20', status: 'completed' },
    { id: 'step-4', width: '20%', color: 'bg-success', label: 'Component Removal', duration: '3:10', status: 'completed' },
    { id: 'step-5', width: '16%', color: 'bg-warning', label: 'Cleaning Process', duration: '2:30', status: 'in-progress' },
    { id: 'step-6', width: '14%', color: 'bg-gray-300', label: 'Quality Check', duration: '1:50', status: 'pending' },
    { id: 'step-7', width: '5%', color: 'bg-gray-300', label: 'Final Setup', duration: '0:45', status: 'pending' }
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
      <ReportsExpandedPanel onBack={handleBack} />

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

        {/* Timeline */}
        <div className="px-6 pb-6 mt-6">
          <Card variant="default" className="p-6">
            <h3 className="text-lg font-semibold text-primary mb-6">Timeline</h3>
            
            {/* Individual Steps Timeline */}
            <div className="space-y-4">
              {/* Steps Timeline Bar */}
              <div className="px-2">
                <div className="h-2 bg-zinc-200 rounded-full relative flex items-center">
                  {stepsData.map((step, index) => (
                    <React.Fragment key={step.id}>
                      {/* Visual break between steps (except for the first one) */}
                      {index > 0 && <div className="h-2 bg-zinc-200" style={{ width: '1px' }}></div>}
                      
                      {/* Step Segment */}
                      <div
                        className={`${step.color} rounded-full transition-all duration-200 cursor-pointer hover:opacity-80 ${
                          hoverModal?.isVisible && hoverModal.step === step.id
                            ? 'h-3 shadow-md' 
                            : 'h-2'
                        }`}
                        style={{ 
                          width: step.width,
                          marginTop: hoverModal?.isVisible && hoverModal.step === step.id
                            ? '-2px' 
                            : '0px'
                        }}
                        onMouseEnter={(e) => handleStepHover(step, e)}
                        onMouseLeave={handleSegmentLeave}
                      />
                    </React.Fragment>
                  ))}
                </div>
              </div>

              {/* Steps Labels */}
              <div className="grid grid-cols-7 gap-2">
                {stepsData.map((step, index) => (
                  <div key={step.id} className="text-center">
                    <div className={`w-2 h-2 rounded-full mx-auto mb-1 ${
                      step.status === 'completed' ? 'bg-success' :
                      step.status === 'in-progress' ? 'bg-warning' :
                      'bg-gray-300'
                    }`}></div>
                    <div className="text-xs text-gray-600 font-medium capitalize">
                      {step.label.split(' ')[0]}
                    </div>
                    <div className="text-xs text-gray-500">
                      {step.duration}
                    </div>
                  </div>
                ))}
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