'use client'

import { useState, useRef } from 'react'
import { X, Download, Check, Sparkles, AlertTriangle } from 'lucide-react'
import { Card, Button, Badge, DataTable } from '@spotai/design-system'

interface ReportingTabPreviewProps {
  onClose: () => void
}

export default function ReportingTabPreview({ onClose }: ReportingTabPreviewProps) {
  const scorecardRef = useRef<HTMLDivElement>(null)
  
  const downloadPDF = async () => {
    if (!scorecardRef.current) return
    
    try {
      // Dynamically import the libraries to avoid SSR issues
      const html2canvas = (await import('html2canvas')).default
      const jsPDF = (await import('jspdf')).jsPDF
      
      console.log('Starting PDF generation...')
      console.log('Element dimensions:', {
        width: scorecardRef.current.offsetWidth,
        height: scorecardRef.current.offsetHeight,
        scrollHeight: scorecardRef.current.scrollHeight
      })
      
      // Create canvas with simpler, more reliable options
      const canvas = await html2canvas(scorecardRef.current, {
        scale: 2,
        useCORS: true,
        allowTaint: true,
        backgroundColor: '#ffffff',
        logging: true // Enable logging to see what's happening
      })
      
      console.log('Canvas created:', {
        width: canvas.width,
        height: canvas.height
      })
      
      // Check if canvas has content
      if (canvas.width === 0 || canvas.height === 0) {
        throw new Error('Canvas is empty - no content captured')
      }
      
      // Create PDF and fit everything on one page
      const imgData = canvas.toDataURL('image/png')
      console.log('Image data length:', imgData.length)
      
      // Check if image data is valid (should start with data:image/png;base64,)
      if (!imgData.startsWith('data:image/png;base64,')) {
        throw new Error('Invalid image data generated')
      }
      
      const pdf = new jsPDF('p', 'mm', 'a4')
      
      // Calculate dimensions to fill majority of page (minimal margins)
      const margin = 5 // Very small margins (about 5mm)
      const pageWidth = 210 // A4 width in mm
      const pageHeight = 297 // A4 height in mm
      const contentWidth = pageWidth - (margin * 2) // 200mm wide
      const contentHeight = pageHeight - (margin * 2) // 287mm tall
      
      // Calculate image dimensions maintaining aspect ratio
      const imgWidth = contentWidth
      const imgHeight = (canvas.height * contentWidth) / canvas.width
      
      // Scale down if content is taller than available content area
      let finalWidth = imgWidth
      let finalHeight = imgHeight
      
      if (imgHeight > contentHeight) {
        finalHeight = contentHeight
        finalWidth = (canvas.width * contentHeight) / canvas.height
      }
      
      console.log('Final dimensions:', {
        finalWidth,
        finalHeight,
        xOffset: margin + (contentWidth - finalWidth) / 2,
        yOffset: margin + (contentHeight - finalHeight) / 2
      })
      
      // Center the content within the minimal margins
      const xOffset = margin + (contentWidth - finalWidth) / 2
      const yOffset = margin + (contentHeight - finalHeight) / 2
      
      // Add the image to fit on one page with proper margins
      pdf.addImage(imgData, 'PNG', xOffset, yOffset, finalWidth, finalHeight)
      
      // Download the PDF
      pdf.save('scorecard-run-5.pdf')
      console.log('PDF saved successfully')
    } catch (error) {
      console.error('Error generating PDF:', error)
      alert(`Error generating PDF: ${error instanceof Error ? error.message : 'Unknown error'}`)
    }
  }
  
  return (
    <div className="flex h-full">
      {/* Left Side - Download Button */}
      <div className="flex flex-col items-start justify-start pt-6 px-6 pb-0">
        <Button variant="primary" onClick={downloadPDF}>
          <Download className="w-4 h-4" />
          Download
        </Button>
      </div>

            {/* Main Content - Scorecard */}
      <div className="flex-1 p-6 space-y-6" ref={scorecardRef}>
        {/* Header Card */}
        <Card className="p-6">
          <div className="flex items-start justify-between">
            <div className="space-y-2">
              <h1 className="text-primary font-semibold text-lg capitalize">
                Scorecard - Run 5
              </h1>
              <div className="space-y-1 text-sm text-gray-600">
                <p className="font-medium">Camera Factory 1 - Jan 2, 2026 8:04:94</p>
                <p className="capitalize">Lead: John Smith</p>
              </div>
            </div>
                          <div className="bg-accent text-white px-4 py-1 rounded text-sm font-semibold">
                Overall: PASS
              </div>
          </div>
        </Card>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card className="p-4 border-l-4 border-l-success">
            <div className="flex items-center gap-2 mb-2">
              <Check className="w-4 h-4 text-success" />
              <h3 className="text-sm font-semibold text-primary capitalize">
                What went well this run
              </h3>
            </div>
            <p className="text-sm text-gray-600">
              Timing of each step was within the baseline time. Keep up the good work team!
            </p>
          </Card>
          
          <Card className="p-4 border-l-4 border-l-warning">
            <div className="flex items-center gap-2 mb-2">
              <X className="w-4 h-4 text-warning" />
              <h3 className="text-sm font-semibold text-primary capitalize">
                What could be improved this run
              </h3>
            </div>
            <p className="text-sm text-gray-600">
              There was a mid-shift dip in performance, especially during Raw Material Inspection.
            </p>
          </Card>
                </div>

        {/* Phase 1 Section */}
        <Card className="p-6">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h3 className="font-semibold text-lg text-primary mb-2">Phase 1</h3>
              <p className="text-sm text-gray-600">
                Overall, this phase was successful. The equipment adjustment and manual labelling 
                were conducted quickly and correctly, but there was room for improvement on the raw 
                material inspection.
              </p>
            </div>
            <div className="text-right">
              <p className="text-sm font-medium text-primary mb-2">Average Score: 8</p>
                                           <span className="bg-success-light text-success px-2 py-1 rounded text-xs font-semibold inline-flex items-center gap-1">
                Nice one!
                <Sparkles className="w-3 h-3" />
              </span>
            </div>
          </div>

          {/* Phase 1 Tasks Table */}
          <div className="space-y-3 mb-4">
            <div className="grid grid-cols-12 gap-4 py-2 border-b border-gray-200 font-semibold text-sm">
              <div className="col-span-3">Task</div>
              <div className="col-span-7">Description</div>
              <div className="col-span-2 text-right">Score</div>
            </div>
            
            <div className="grid grid-cols-12 gap-4 py-2 border-b border-gray-100">
              <div className="col-span-3 font-medium text-sm capitalize">Equipment Adjustment</div>
              <div className="col-span-7 text-sm text-gray-600">
                The equipment adjustment phase was executed well, with skilled workers ensuring precise 
                assembly of components, contributing to a successful product outcome.
              </div>
              <div className="col-span-2 text-right font-semibold">8</div>
            </div>
            
            <div className="grid grid-cols-12 gap-4 py-2 border-b border-gray-100">
              <div className="col-span-3 font-medium text-sm capitalize">Manual Product Assembly</div>
              <div className="col-span-7 text-sm text-gray-600">
                The manual product assembly was effective, with workers efficiently assembling components 
                to create a high-quality finished product.
              </div>
              <div className="col-span-2 text-right font-semibold">6</div>
            </div>
            
            <div className="grid grid-cols-12 gap-4 py-2 border-b border-gray-100">
              <div className="col-span-3 font-medium text-sm capitalize">Raw Material Inspection</div>
              <div className="col-span-7 text-sm text-gray-600">
                Raw material inspection showed some inconsistencies; improvements are needed to ensure 
                all materials meet quality standards before production.
              </div>
              <div className="col-span-2 text-right font-semibold text-red-600">3</div>
            </div>
            
            <div className="grid grid-cols-12 gap-4 py-2">
              <div className="col-span-3 font-medium text-sm capitalize">Manual Labeling</div>
              <div className="col-span-7 text-sm text-gray-600">
                Manual labeling was performed accurately, finalizing the products without issues, 
                showcasing the team&apos;s attention to detail.
              </div>
              <div className="col-span-2 text-right font-semibold">8</div>
            </div>
          </div>

          {/* Phase 1 Recommendation */}
          <Card className="bg-accent-light border-l-4 border-l-accent p-4">
            <div className="flex items-center gap-2 mb-2">
              <Sparkles className="w-4 h-4 text-accent" />
              <h4 className="font-semibold text-primary">Phase 1 Recommendation</h4>
            </div>
            <p className="text-sm text-gray-600">
              Make sure everyone stays motivated on the floor, especially during early hours.
            </p>
          </Card>
        </Card>

        {/* Phase 2 Section */}
        <Card className="p-6">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h3 className="font-semibold text-lg text-primary mb-2">Phase 2</h3>
              <p className="text-sm text-gray-600">
                Overall, this phase faced significant challenges. The equipment adjustment and manual 
                labeling were delayed and not executed properly, leading to critical issues during the 
                raw material inspection that require immediate attention.
              </p>
            </div>
            <div className="text-right">
              <p className="text-sm font-medium text-primary mb-2">Average Score: 6</p>
                                           <span className="bg-warning-light text-warning px-2 py-1 rounded text-xs font-semibold inline-flex items-center gap-1">
                Room for Improvement
                <AlertTriangle className="w-3 h-3" />
              </span>
            </div>
          </div>

          {/* Phase 2 Tasks */}
          <div className="space-y-3 mb-4">
            <div className="grid grid-cols-12 gap-4 py-2 border-b border-gray-200 font-semibold text-sm">
              <div className="col-span-3">Task</div>
              <div className="col-span-7">Description</div>
              <div className="col-span-2 text-right">Score</div>
            </div>
            
            <div className="grid grid-cols-12 gap-4 py-2">
              <div className="col-span-3 font-medium text-sm capitalize">Sorting and Arranging</div>
              <div className="col-span-7 text-sm text-gray-600">
                Sorting and arranging of components was handled meticulously, facilitating a smooth 
                assembly process and enhancing overall efficiency.
              </div>
              <div className="col-span-2 text-right font-semibold">8</div>
            </div>
          </div>

          {/* Phase 2 Recommendation */}
          <Card className="bg-accent-light border-l-4 border-l-accent p-4">
            <div className="flex items-center gap-2 mb-2">
              <Sparkles className="w-4 h-4 text-accent" />
              <h4 className="font-semibold text-primary">Phase 2 Recommendation</h4>
            </div>
            <p className="text-sm text-gray-600">
              Try implementing longer breaks between shifts so operators have time to reset!
            </p>
          </Card>
        </Card>

        {/* Footer */}
        <div className="text-center">
          <p className="text-sm font-medium text-gray-500">Page 1 of 2</p>
        </div>
      </div>

      {/* Right Side - Close Button */}
      <div className="flex flex-col items-start justify-start pt-6 px-6 pb-0">
        <Button variant="outline" onClick={onClose}>
          <X className="w-4 h-4" />
          Close
        </Button>
      </div>
    </div>
  )
} 