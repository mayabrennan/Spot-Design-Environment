'use client'

import { useState } from 'react'
import OpsTeam from '../pages/OpsTeam'
import OpsAssistant from '../pages/OpsAssistant'
import Analytics from '../pages/Analytics'
import Insights from '../pages/Insights'
import Run from '../pages/Run'
import Reports from '../pages/Reports'
import NavbarOld from './UI/NavbarOld'
import IrisSidebar from './UI/IrisSidebar'

export default function Dashboard() {
  const [currentPage, setCurrentPage] = useState('operations')
  const [isIrisSidebarOpen, setIsIrisSidebarOpen] = useState(false)

  const handlePageClick = (page: string) => {
    setCurrentPage(page)
  }

  const handleNavigateToAssistant = (assistantId: number, assistantName: string) => {
    setCurrentPage('assistant')
  }

  const handleIrisToggle = () => {
    setIsIrisSidebarOpen(!isIrisSidebarOpen)
  }

  const handleIrisExpand = () => {
    setCurrentPage('iris')
  }

  const renderMainContent = () => {
    switch (currentPage) {
      case 'operations':
        return <OpsTeam onNavigateToAssistant={handleNavigateToAssistant} />
      case 'assistant':
        return <OpsAssistant onNavigateToOperations={() => setCurrentPage('operations')} />
      case 'analytics':
        return <Analytics />
      case 'insights':
        return <Insights />
      case 'run':
        return <Run />
      case 'reports':
        return <Reports />
      default:
        return <OpsTeam onNavigateToAssistant={handleNavigateToAssistant} />
    }
  }

  // Show Iris sidebar on all pages except Reports page
  const shouldShowIrisSidebar = isIrisSidebarOpen && currentPage !== 'reports'

  return (
    <div className="flex flex-col h-screen bg-neutral-50">
      {/* Top Navigation - NavbarOld */}
      <div className="sticky top-0 z-50">
        <NavbarOld 
          currentPage={currentPage}
          onPageClick={handlePageClick}
          onIrisToggle={handleIrisToggle}
        />
      </div>

      <div className="flex-1 flex min-w-0 relative z-10">
        {/* Page Content */}
        <main className={`flex-1 overflow-hidden transition-all duration-300 ${
          shouldShowIrisSidebar ? 'mr-[400px]' : 'mr-0'
        }`}>
          {renderMainContent()}
        </main>
      </div>

      {/* Iris AI Sidebar - Fixed sidepanel */}
      {shouldShowIrisSidebar && (
        <div className="fixed top-20 right-0 z-30 h-[calc(100vh-80px)]">
          <IrisSidebar onExpand={handleIrisExpand} onClose={handleIrisToggle} />
        </div>
      )}
    </div>
  )
}

