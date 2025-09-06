import React, { useState } from 'react'
import { X } from 'lucide-react'

interface TimelineSegment {
  id: string
  width: string
  color: string
  phase: string
  type: 'timeline' | 'baseline'
}

interface TimelineProps {
  segments: TimelineSegment[]
  onSegmentHover?: (segment: TimelineSegment, event: React.MouseEvent) => void
  onSegmentLeave?: () => void
  hoverModal?: {
    isVisible: boolean
    x: number
    y: number
    phase: string
    type: string
    segment?: number
  }
}

export default function Timeline({ segments, onSegmentHover, onSegmentLeave, hoverModal }: TimelineProps) {
  return (
    <div className="px-2">
      <div className="h-2 bg-zinc-200 rounded-full relative flex items-center">
        {/* Timeline Segments */}
        {segments.map((segment, index) => (
          <React.Fragment key={segment.id}>
            {/* Visual break between segments (except for the first one) */}
            {index > 0 && <div className="h-2 bg-zinc-200" style={{ width: '1px' }}></div>}
            
            {/* Timeline Segment */}
            <div
              className={`${segment.color} rounded-full transition-all duration-200 cursor-pointer hover:opacity-80 ${
                hoverModal?.isVisible && 
                hoverModal.phase === segment.phase && 
                hoverModal.type === segment.type && 
                hoverModal.segment === index 
                  ? 'h-3 shadow-md' 
                  : 'h-2'
              }`}
              style={{ 
                width: segment.width,
                marginTop: hoverModal?.isVisible && 
                  hoverModal.phase === segment.phase && 
                  hoverModal.type === segment.type && 
                  hoverModal.segment === index 
                    ? '-2px' 
                    : '0px'
              }}
              onMouseEnter={(e) => onSegmentHover?.(segment, e)}
              onMouseLeave={onSegmentLeave}
            />
          </React.Fragment>
        ))}
      </div>
    </div>
  )
} 