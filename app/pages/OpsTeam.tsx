'use client'

import { useState } from 'react'
import { Plus, ChevronRight, Filter, ArrowUpDown, MoreHorizontal, Star } from 'lucide-react'
import { SearchInput, DataTable } from '@spotai/design-system'
import Image from 'next/image'

interface OpsTeamProps {
  onNavigateToAssistant?: (assistantId: number, assistantName: string) => void
}

export default function OperationsTab({ onNavigateToAssistant }: OpsTeamProps) {
  const [selectedRun, setSelectedRun] = useState('Run 1')
  const [favorites, setFavorites] = useState<Set<number>>(new Set([1, 2])) // First two are favorited by default

  // Table data based on Figma design
  const tableData = [
    {
      id: 1,
      name: 'SOP Changeover Assistant',
      description: 'Monitors SOP Compliance.',
      location: 'Nevada',
      isFavorited: true,
      icon: '/images/Operator icon.png'
    },
    {
      id: 2,
      name: 'Workplace Monitor',
      description: 'Responsible for monitoring forklift operations to prevent near-collisions.',
      location: 'Nevada',
      isFavorited: true,
      icon: '/images/Operator icon-1.png'
    },
    {
      id: 3,
      name: 'Parking Surveillance Operator',
      description: 'Oversees security measures to detect firearms and prohibited weapons.',
      location: 'California',
      isFavorited: false,
      icon: '/images/Operator icon-2.png'
    },
    {
      id: 4,
      name: 'No Injuries Operator',
      description: 'Manages access control by unlocking doors for arriving delivery trucks.',
      location: 'Nevada',
      isFavorited: false,
      icon: '/images/Operator icon-3.png'
    },
    {
      id: 5,
      name: 'Safety and PPE',
      description: 'Issues notifications when vehicles exceed designated speed limits.',
      location: 'California',
      isFavorited: false,
      icon: '/images/Operator icon-4.png'
    },
    {
      id: 6,
      name: 'Guidelines Follower',
      description: 'Alerts staff immediately in case of spills on the factory floor.',
      location: 'Nevada',
      isFavorited: false,
      icon: '/images/Operator icon-5.png'
    },
    {
      id: 7,
      name: 'Warehouse Manager',
      description: 'Monitors the workspace for unauthorized activities or safety breaches.',
      location: 'California',
      isFavorited: false,
      icon: '/images/Operator icon-6.png'
    },
    {
      id: 8,
      name: 'Parking Surveillance Operator',
      description: 'Identifies and flags any blocked conveyor belts to maintain workflow.',
      location: 'California',
      isFavorited: false,
      icon: '/images/Operator icon.png'
    }
  ]

  const columns = [
    {
      key: 'opsAssistants',
      label: 'Ops Assistants',
      sortable: true,
      width: 'w-64'
    },
    {
      key: 'jobDescription',
      label: 'Job Description',
      sortable: true,
      width: 'flex-1'
    },
    {
      key: 'location',
      label: 'Location',
      sortable: true,
      width: 'w-32'
    },
    {
      key: 'actions',
      label: '',
      sortable: false,
      width: 'w-16'
    }
  ]

  const toggleFavorite = (assistantId: number, event: React.MouseEvent) => {
    // Stop event propagation to prevent row click
    event.stopPropagation()
    
    setFavorites(prev => {
      const newFavorites = new Set(prev)
      if (newFavorites.has(assistantId)) {
        newFavorites.delete(assistantId)
      } else {
        newFavorites.add(assistantId)
      }
      return newFavorites
    })
  }

  const handleRowClick = (assistant: any) => {
    if (assistant.name === 'SOP Changeover Assistant' && onNavigateToAssistant) {
      onNavigateToAssistant(assistant.id, assistant.name)
    }
  }

  const renderFavorite = (assistant: any) => (
    <button
      onClick={(e) => toggleFavorite(assistant.id, e)}
      className="flex items-center justify-center p-1 hover:bg-neutral-100 rounded transition-colors"
    >
      <Star 
        className={`w-4 h-4 ${
          favorites.has(assistant.id) 
            ? 'text-accent fill-current' 
            : 'text-gray-300'
        }`} 
      />
    </button>
  )

  const renderOpsAssistant = (assistant: any) => (
    <div className="flex items-center gap-2.5">
      {/* Operator Icon - Using actual operator images, bigger size */}
      <div className="w-6 h-6 rounded-sm overflow-hidden flex items-center justify-center">
        <Image
          src={assistant.icon}
          alt={`${assistant.name} icon`}
          width={24}
          height={24}
          className="w-full h-full object-contain"
        />
      </div>
      {/* Assistant Name */}
      <span className="font-medium text-sm text-primary capitalize">
        {assistant.name}
      </span>
    </div>
  )

  const renderJobDescription = (assistant: any) => (
    <div className="text-xs text-primary font-normal leading-normal">
      {assistant.description}
    </div>
  )

  const renderLocation = (assistant: any) => (
    <div className="text-xs text-primary font-normal">
      {assistant.location}
    </div>
  )

  const renderActions = (assistant: any) => (
    <div className="flex items-center justify-center">
      <button 
        className="p-1 hover:bg-neutral-100 rounded"
        onClick={(e) => {
          e.stopPropagation() // Prevent row click when clicking actions
          if (assistant.name === 'SOP Changeover Assistant' && onNavigateToAssistant) {
            onNavigateToAssistant(assistant.id, assistant.name)
          }
        }}
      >
        <MoreHorizontal className="w-4 h-4 text-primary" />
      </button>
    </div>
  )

  // Transform data for table
  const tableRows = tableData.map(assistant => ({
    opsAssistants: renderOpsAssistant(assistant),
    jobDescription: renderJobDescription(assistant),
    location: renderLocation(assistant),
    actions: renderActions(assistant)
  }))

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
              <span className="capitalize font-medium text-primary text-sm">Assistants</span>
            </div>
          </div>
          
          {/* Title and Actions */}
          <div className="flex items-end justify-between mt-6">
            <div className="flex flex-col gap-1">
              <h1 className="capitalize font-semibold text-primary text-xl">
                Assistants
              </h1>
              <p className="font-normal text-primary text-sm leading-[20px]">
                Meet your team of AI Operations Assistants!
              </p>
            </div>
            
            <div className="flex gap-2 items-center">
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

        {/* Data Table Section */}
        <div className="flex-1 p-4 overflow-auto">
          <div>
            {/* Search Bar Section */}
            <div className="flex gap-4 items-center mb-4">
              <div className="flex-1">
                <SearchInput placeholder="Search" />
              </div>
              <div className="flex gap-2">
                {/* Filter Button */}
                <button className="bg-white border border-zinc-200 rounded-lg px-4 py-2 flex items-center gap-2">
                  <Filter className="w-4 h-4 text-primary" />
                  <span className="capitalize font-medium text-primary text-sm">filter</span>
                </button>
                
                {/* Columns Button */}
                <button className="bg-white border border-zinc-200 rounded-lg p-2.5">
                  <ArrowUpDown className="w-4 h-4 text-primary" />
                </button>
              </div>
            </div>

            {/* Data Table - Rounded with overflow clipping */}
            <div className="bg-white rounded-lg border border-zinc-200 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-zinc-200">
                      {/* Checkbox Column */}
                      <th className="text-left p-4 w-16">
                        <div className="w-4 h-4 border border-primary rounded"></div>
                      </th>
                      
                      {/* Favorite Column */}
                      <th className="text-center p-4 w-16">
                        <div className="flex items-center justify-center">
                          <Star className="w-4 h-4 text-gray-300" />
                        </div>
                      </th>
                      
                      {/* Main Columns */}
                      {columns.map((column) => (
                        <th
                          key={column.key}
                          className={`text-left p-4 font-medium text-primary text-sm capitalize ${
                            column.sortable ? 'cursor-pointer hover:bg-neutral-100' : ''
                          } ${column.width || ''}`}
                        >
                          <div className="flex items-center gap-2">
                            <span>{column.label}</span>
                            {column.sortable && (
                              <ArrowUpDown className="w-3 h-3 text-gray-300" />
                            )}
                          </div>
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {tableRows.map((row, rowIndex) => (
                      <tr
                        key={rowIndex}
                        onClick={() => handleRowClick(tableData[rowIndex])}
                        className={`border-b border-zinc-200 bg-white hover:bg-neutral-100 transition-colors ${
                          tableData[rowIndex].name === 'SOP Changeover Assistant' 
                            ? 'cursor-pointer' 
                            : ''
                        }`}
                      >
                        {/* Checkbox Column */}
                        <td className="p-4" onClick={(e) => e.stopPropagation()}>
                          <div className="w-4 h-4 border border-primary rounded"></div>
                        </td>
                        
                        {/* Favorite Column */}
                        <td className="p-4 text-center">
                          {renderFavorite(tableData[rowIndex])}
                        </td>
                        
                        {/* Main Data Columns */}
                        {columns.map((column) => (
                          <td key={column.key} className="p-4">
                            {row[column.key as keyof typeof row]}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
