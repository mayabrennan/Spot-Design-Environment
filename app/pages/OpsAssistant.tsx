'use client'

import { useState, forwardRef, useImperativeHandle } from 'react'
import { ChevronRight, Plus, LayoutGrid, Bot, LucideIcon } from 'lucide-react'
import { Button } from '@spotai/design-system'
import VideoTab from '../components/OpsAssistant/VideoTab'
import RunsTab from '../components/OpsAssistant/RunsTab'
import OutputTab from '../components/OpsAssistant/OutputTab'
import ProfileTab from '../components/OpsAssistant/ProfileTab'
import ReportingTab from '../components/OpsAssistant/ReportingTab'
import OpsTeam from './OpsTeam'
import Runbar from '../components/UI/Runbar'
import Image from 'next/image'

interface OpsAssistantProps {
  onNavigateToOperations?: () => void
}

const OpsAssistant = forwardRef<{ handleNavigateToOperations: () => void }, OpsAssistantProps>(
  ({ onNavigateToOperations }, ref) => {
  const [activeTab, setActiveTab] = useState('runs')
  const [currentPage, setCurrentPage] = useState('runs') // 'runs' or 'operations'
  const [selectedRun, setSelectedRun] = useState('Run 1')
  const [isRunDropdownOpen, setIsRunDropdownOpen] = useState(false)
  const [showVideoTab, setShowVideoTab] = useState(true)
  const runOptions = ['Run 1', 'Run 2', 'Run 3', 'Run 4', 'Run 5']

  const handleRunSelect = (run: string) => {
    setSelectedRun(run)
    setIsRunDropdownOpen(false)
  }

  // Handle navigation to operations page
  const handleNavigateToOperations = () => {
    setCurrentPage('operations')
  }

  // Handle breadcrumb navigation back to OpsTeam
  const handleBreadcrumbClick = () => {
    setCurrentPage('operations')
  }

  // Handle breadcrumb navigation back to runs tab
  const handleRunsBreadcrumbClick = () => {
    setActiveTab('runs')
    setShowVideoTab(false)
  }

  const handleCloseRunbar = () => {
    setShowVideoTab(false)
    setActiveTab('runs')
  }

  // Handle navigation to video tab from RunsTab
  const handleNavigateToVideo = (runId: string, runName: string) => {
    setActiveTab('video')
    setSelectedRun(runName)
    setShowVideoTab(true)
  }

  // Expose the navigation function to parent components
  useImperativeHandle(ref, () => ({
    handleNavigateToOperations
  }), [])

  return (
    <div className="flex flex-col h-full bg-neutral-100 overflow-hidden">
      {/* Only show header when not on operations page */}
      {currentPage !== 'operations' && (
        <>
          {/* Header with breadcrumbs and main content */}
          <div className="bg-white border-b border-zinc-200 px-6 py-6">
            {/* Breadcrumbs */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <button 
                  onClick={handleBreadcrumbClick}
                  className="hover:text-primary transition-colors cursor-pointer"
                >
                  AI Ops Assistant
                </button>
                <ChevronRight className="w-4 h-4" />
                <button 
                  onClick={handleRunsBreadcrumbClick}
                  className="hover:text-primary transition-colors cursor-pointer"
                >
                  SOP Changeover Assistant
                </button>
                {activeTab === 'video' && (
                  <>
                    <ChevronRight className="w-4 h-4" />
                    <span className="text-primary font-medium">{selectedRun}</span>
                  </>
                )}
              </div>
            </div>
            
            {/* Main header content */}
            <div className="flex items-end justify-between mt-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-accent-light rounded-lg flex items-center justify-center">
                  <Image 
                    src="/images/Operator icon.png" 
                    alt="Operator" 
                    width={48} 
                    height={48}
                    className="w-full h-full object-cover rounded-lg"
                  />
                </div>
                <div>
                  <h1 className="text-xl font-semibold text-primary">SOP Changeover Assistant</h1>
                  <p className="text-sm text-gray-600">AI-powered assistant for manufacturing operations</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                {/* Edit Run Button */}
                <div className="bg-white border border-zinc-200 rounded-lg px-4 py-2 flex items-center">
                  <span className="capitalize font-medium text-primary text-sm">
                    edit run
                  </span>
                </div>
                
                {/* Add New Run Button */}
                <div className="bg-accent rounded-lg px-4 py-2 flex items-center gap-2">
                  <Plus className="w-4 h-4 text-white" />
                  <span className="capitalize font-medium text-white text-sm">
                    add new run
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Runbar - Only show when video tab is active */}
          {activeTab === 'video' && (
            <Runbar
              selectedRun={selectedRun}
              isRunDropdownOpen={isRunDropdownOpen}
              setIsRunDropdownOpen={setIsRunDropdownOpen}
              handleRunSelect={handleRunSelect}
              runOptions={runOptions}
              onClose={handleCloseRunbar}
            />
          )}
        </>
      )}

      {/* Content Area */}
      <div className="flex-1 min-h-0 overflow-auto">
        {currentPage === 'operations' ? (
          <OpsTeam onNavigateToAssistant={(assistantId, assistantName) => {
            setCurrentPage('runs')
            setActiveTab('runs')
          }} />
        ) : activeTab === 'runs' ? (
          <RunsTab onNavigateToVideo={handleNavigateToVideo} />
        ) : activeTab === 'video' ? (
          <VideoTab />
        ) : activeTab === 'output' ? (
          <OutputTab />
        ) : activeTab === 'reporting' ? (
          <ReportingTab />
        ) : activeTab === 'profile' ? (
          <ProfileTab />
        ) : (
          <RunsTab onNavigateToVideo={handleNavigateToVideo} />
        )}
      </div>
    </div>
  )
})

OpsAssistant.displayName = 'OpsAssistant'

export default OpsAssistant
