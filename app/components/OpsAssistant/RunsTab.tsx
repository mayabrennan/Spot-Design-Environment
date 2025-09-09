'use client'

import { useState } from 'react'
import { ArrowUpDown, Filter, MoreHorizontal, ChevronsUpDown, ChevronLeft, ChevronRight, ChevronDown } from 'lucide-react'
import { SearchInput, Badge, Button, ActionMenu, Card, Dropdown } from '@spotai/design-system'

interface RunData {
  id: string
  run: string
  avgScore: string
  runDuration: string
  footage: string
  runProcessedOn: string
  leads: string
  review: 'reviewed' | 'pending'
}

interface RunsTabProps {
  onNavigateToVideo?: (runId: string, runName: string) => void
}

const RunsTab = ({ onNavigateToVideo }: RunsTabProps) => {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedRows, setSelectedRows] = useState<string[]>([])
  const [rowsPerPage, setRowsPerPage] = useState('10')

  const runsData: RunData[] = [
    {
      id: '1',
      run: 'Run 1',
      avgScore: '3/5',
      runDuration: '02:03:01',
      footage: '08/09/24, 6:30 PM PST',
      runProcessedOn: '01/06/24 11:32 AM PST',
      leads: 'Michael Johnson',
      review: 'reviewed'
    },
    {
      id: '2',
      run: 'Run 2',
      avgScore: '5/5',
      runDuration: '02:03:01',
      footage: '08/08/24, 12:00 PM PST',
      runProcessedOn: '01/06/24 11:32 AM PST',
      leads: 'David Brown, James Wilson',
      review: 'pending'
    },
    {
      id: '3',
      run: 'Run 4',
      avgScore: '5/5',
      runDuration: '02:03:01',
      footage: '08/07/24, 5:45 PM PST',
      runProcessedOn: '01/06/24 11:32 AM PST',
      leads: 'Robert Davis',
      review: 'reviewed'
    },
    {
      id: '4',
      run: 'Run 5',
      avgScore: '4/5',
      runDuration: '02:03:01',
      footage: '08/06/24, 2:00 PM PST',
      runProcessedOn: '01/06/24 11:32 AM PST',
      leads: 'William Garcia',
      review: 'pending'
    },
    {
      id: '5',
      run: 'Run 7',
      avgScore: '4/5',
      runDuration: '02:03:01',
      footage: '08/05/24, 4:15 PM PST',
      runProcessedOn: '01/06/24 11:32 AM PST',
      leads: 'Daniel Martinez, Christopher Rodriguez',
      review: 'pending'
    },
    {
      id: '6',
      run: 'Run 6',
      avgScore: '5/5',
      runDuration: '02:03:01',
      footage: '08/04/24, 1:30 PM PST',
      runProcessedOn: '01/06/24 11:32 AM PST',
      leads: 'Joseph Hernandez',
      review: 'reviewed'
    },
    {
      id: '7',
      run: 'Run 3',
      avgScore: '5/5',
      runDuration: '02:03:01',
      footage: '08/03/24, 3:00 PM PST',
      runProcessedOn: '01/06/24 11:32 AM PST',
      leads: 'Thomas Gonzalez',
      review: 'reviewed'
    }
  ]

  const getScoreBadgeVariant = (score: string) => {
    if (score === '5/5') return 'success'
    if (score === '4/5') return 'info'
    if (score === '3/5') return 'warning'
    return 'default'
  }

  const handleSelectAll = () => {
    const enabledRuns = runsData.filter(run => run.run === 'Run 1' || run.run === 'Run 2')
    const enabledRunIds = enabledRuns.map(run => run.id)
    
    if (selectedRows.length === enabledRunIds.length) {
      setSelectedRows([])
    } else {
      setSelectedRows(enabledRunIds)
    }
  }

  const handleSelectRow = (id: string, run: RunData) => {
    // Only allow selecting Run 1 and Run 2
    if (run.run === 'Run 1' || run.run === 'Run 2') {
      if (selectedRows.includes(id)) {
        setSelectedRows(selectedRows.filter(rowId => rowId !== id))
      } else {
        setSelectedRows([...selectedRows, id])
      }
    }
  }

  const handleActionSelect = (value: string) => {
    console.log('Action selected:', value)
  }

  const handleRowsPerPageSelect = (item: any) => {
    setRowsPerPage(item.value)
  }

  const handleRowClick = (run: RunData) => {
    // Only allow clicking on Run 1 and Run 2
    if ((run.run === 'Run 1' || run.run === 'Run 2') && onNavigateToVideo) {
      onNavigateToVideo(run.id, run.run)
    }
  }

  const filteredRuns = runsData.filter(run =>
    run.run.toLowerCase().includes(searchQuery.toLowerCase()) ||
    run.leads.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const rowsPerPageOptions = [
    { label: '10', value: '10' },
    { label: '25', value: '25' },
    { label: '50', value: '50' }
  ]

  return (
    <div className="flex h-full bg-neutral-50">
      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Data Table Section */}
        <div className="flex-1 p-4 overflow-auto">
          <div>
            {/* Search and Filter Bar - Exact same as OpsTeam */}
            <div className="flex gap-4 items-center mb-4">
              <div className="flex-1">
                <SearchInput placeholder="Search" />
              </div>
              <div className="flex gap-2">
                {/* Filter Button - Disabled */}
                <button className="bg-white border border-zinc-200 rounded-lg px-4 py-2 flex items-center gap-2 opacity-85 cursor-not-allowed" disabled>
                  <Filter className="w-4 h-4 text-primary" />
                  <span className="capitalize font-medium text-primary text-sm">filter</span>
                </button>
                
                {/* Columns Button - Disabled */}
                <button className="bg-white border border-zinc-200 rounded-lg p-2.5 opacity-85 cursor-not-allowed" disabled>
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
                        <div className="flex items-center">
                          <input
                            type="checkbox"
                            checked={selectedRows.length === runsData.filter(run => run.run === 'Run 1' || run.run === 'Run 2').length && runsData.filter(run => run.run === 'Run 1' || run.run === 'Run 2').length > 0}
                            onChange={handleSelectAll}
                            className="w-4 h-4 rounded border-zinc-300 text-accent focus:ring-accent focus:ring-2"
                          />
                        </div>
                      </th>
                      
                      {/* Runs Column */}
                      <th className="text-left p-4 font-medium text-primary text-sm capitalize cursor-pointer hover:bg-neutral-100">
                        <div className="flex items-center gap-2">
                          <span>Runs</span>
                          <ChevronsUpDown className="w-3 h-3 text-gray-300" />
                        </div>
                      </th>
                      
                      {/* Avg Score Column */}
                      <th className="text-left p-4 font-medium text-primary text-sm capitalize cursor-pointer hover:bg-neutral-100 w-32">
                        <div className="flex items-center gap-2">
                          <span>Avg Score</span>
                          <ChevronsUpDown className="w-3 h-3 text-gray-300" />
                        </div>
                      </th>
                      
                      {/* Run Duration Column */}
                      <th className="text-left p-4 font-medium text-primary text-sm capitalize cursor-pointer hover:bg-neutral-100 w-40">
                        <div className="flex items-center gap-2">
                          <span>Run Duration</span>
                          <ChevronsUpDown className="w-3 h-3 text-gray-300" />
                        </div>
                      </th>
                      
                      {/* Footage Column */}
                      <th className="text-left p-4 font-medium text-primary text-sm capitalize cursor-pointer hover:bg-neutral-100">
                        <div className="flex items-center gap-2">
                          <span>Footage</span>
                          <ChevronsUpDown className="w-3 h-3 text-gray-300" />
                        </div>
                      </th>
                      
                      {/* Run Processed On Column */}
                      <th className="text-left p-4 font-medium text-primary text-sm capitalize cursor-pointer hover:bg-neutral-100">
                        <div className="flex items-center gap-2">
                          <span>Run Processed On</span>
                          <ChevronsUpDown className="w-3 h-3 text-gray-300" />
                        </div>
                      </th>
                      
                      {/* Leads Column */}
                      <th className="text-left p-4 font-medium text-primary text-sm capitalize cursor-pointer hover:bg-neutral-100">
                        <div className="flex items-center gap-2">
                          <span>Leads</span>
                          <ChevronsUpDown className="w-3 h-3 text-gray-300" />
                        </div>
                      </th>
                      
                      {/* Review Column */}
                      <th className="text-left p-4 font-medium text-primary text-sm capitalize cursor-pointer hover:bg-neutral-100 w-32">
                        <div className="flex items-center gap-2">
                          <span>Review</span>
                          <ChevronsUpDown className="w-3 h-3 text-gray-300" />
                        </div>
                      </th>
                      
                      {/* Actions Column */}
                      <th className="text-left p-4 w-16"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredRuns.map((run) => (
                      <tr
                        key={run.id}
                        onClick={() => handleRowClick(run)}
                        className={`border-b border-zinc-200 bg-white transition-colors ${
                          run.run === 'Run 1' || run.run === 'Run 2' 
                            ? 'cursor-pointer hover:bg-neutral-100' 
                            : 'cursor-not-allowed opacity-85'
                        }`}
                      >
                        {/* Checkbox Column */}
                        <td className="p-4" onClick={(e) => e.stopPropagation()}>
                          <input
                            type="checkbox"
                            checked={selectedRows.includes(run.id)}
                            onChange={() => handleSelectRow(run.id, run)}
                            disabled={run.run !== 'Run 1' && run.run !== 'Run 2'}
                            className={`w-4 h-4 rounded border-zinc-300 text-accent focus:ring-accent focus:ring-2 ${
                              run.run !== 'Run 1' && run.run !== 'Run 2' 
                                ? 'opacity-85 cursor-not-allowed' 
                                : ''
                            }`}
                          />
                        </td>
                        
                        {/* Run */}
                        <td className="p-4">
                          <span className="text-sm font-medium text-primary capitalize">{run.run}</span>
                        </td>
                        
                        {/* Avg Score */}
                        <td className="p-4">
                          <Badge variant={getScoreBadgeVariant(run.avgScore)}>
                            {run.avgScore}
                          </Badge>
                        </td>
                        
                        {/* Run Duration */}
                        <td className="p-4">
                          <span className="text-sm font-medium text-primary">{run.runDuration}</span>
                        </td>
                        
                        {/* Footage */}
                        <td className="p-4">
                          <span className="text-sm font-semibold text-primary">{run.footage}</span>
                        </td>
                        
                        {/* Run Processed On */}
                        <td className="p-4">
                          <span className="text-sm text-primary">{run.runProcessedOn}</span>
                        </td>
                        
                        {/* Leads */}
                        <td className="p-4">
                          <span className="text-xs text-primary">{run.leads}</span>
                        </td>
                        
                        {/* Review */}
                        <td className="p-4">
                          {run.review === 'reviewed' ? (
                            <Badge variant="reviewed">
                              reviewed
                            </Badge>
                          ) : (
                            <Button variant="outline" size="sm" className="px-3 py-1">
                              <span className="text-sm font-medium capitalize">review</span>
                            </Button>
                          )}
                        </td>
                        
                        {/* Actions */}
                        <td className="p-4" onClick={(e) => e.stopPropagation()}>
                          <ActionMenu onSelect={handleActionSelect} />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              
              {/* Pagination */}
              <div className="flex items-center justify-between px-6 py-4 border-t border-zinc-200 bg-white">
                <div className="text-sm text-primary-hover">
                  {selectedRows.length} of {runsData.length} row(s) selected.
                </div>
                
                <div className="flex items-center gap-8">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-primary capitalize">Rows per page</span>
                    <Dropdown
                      trigger={
                        <div className="flex items-center gap-2 px-3 py-1.5 bg-white border border-zinc-200 rounded-md hover:bg-neutral-50 cursor-pointer">
                          <span className="text-sm font-medium text-primary">{rowsPerPage}</span>
                          <ChevronDown className="w-4 h-4 text-primary" />
                        </div>
                      }
                      items={rowsPerPageOptions}
                      onSelect={handleRowsPerPageSelect}
                    />
                  </div>
                  
                  <div className="text-sm font-medium text-primary">
                    Page 1 of 10
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm" disabled className="p-2">
                      <ChevronLeft className="w-4 h-4" />
                    </Button>
                    <Button variant="outline" size="sm" className="p-2">
                      <ChevronRight className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default RunsTab
