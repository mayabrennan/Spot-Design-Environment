'use client'

import { useState } from 'react'
import { 
  Search, 
  Filter, 
  Share, 
  Plus, 
  GripVertical, 
  MoreHorizontal
} from 'lucide-react'
import { Card, SearchInput } from '@spotai/design-system'
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from '@dnd-kit/core'
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable'
import {
  useSortable,
} from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'

interface TableRow {
  id: string
  field: string
  description: string
  value: string
  scorecard: boolean
  timeline: boolean
}

function SortableTableRow({ 
  row, 
  index, 
  isSelected, 
  onSelect 
}: { 
  row: TableRow; 
  index: number; 
  isSelected: boolean;
  onSelect: (id: string) => void;
}) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: row.id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  }

  return (
    <tr 
      ref={setNodeRef} 
      style={style}
      className={`border-b border-zinc-200 bg-white ${isDragging ? 'z-10' : ''} ${isSelected ? 'border-2 border-accent bg-accent-light' : ''}`}
      onClick={() => onSelect(row.id)}
    >
      <td className="p-4">
        <div
          {...attributes}
          {...listeners}
          className="cursor-grab active:cursor-grabbing"
          onClick={(e) => e.stopPropagation()}
        >
          <GripVertical className="w-4 h-4 text-gray-400" />
        </div>
      </td>
      <td className="p-4">
        <span className="text-sm font-medium text-primary">{row.field}</span>
      </td>
      <td className="p-4">
        <span className="text-sm text-primary">{row.description}</span>
      </td>
      <td className="p-4">
        <span className="text-sm font-medium text-primary">{row.value}</span>
      </td>
      <td className="p-4">
        <div className="flex items-center gap-2">
          <div className={`w-7 h-4 rounded-full p-0.5 flex items-center ${row.scorecard ? 'bg-accent justify-end' : 'bg-primary justify-start'}`}>
            <div className="w-3 h-3 bg-white rounded-full"></div>
          </div>
          <span className="text-sm font-medium text-primary capitalize">
            {row.scorecard ? 'on' : 'off'}
          </span>
        </div>
      </td>
      <td className="p-4">
        <div className="flex items-center gap-2">
          <div className={`w-7 h-4 rounded-full p-0.5 flex items-center ${row.timeline ? 'bg-accent justify-end' : 'bg-primary justify-start'}`}>
            <div className="w-3 h-3 bg-white rounded-full"></div>
          </div>
          <span className="text-sm font-medium text-primary capitalize">
            {row.timeline ? 'on' : 'off'}
          </span>
        </div>
      </td>
      <td className="p-4">
        <MoreHorizontal className="w-4 h-4 text-gray-400" />
      </td>
    </tr>
  )
}

export default function OutputTab() {
  const [activeFilter, setActiveFilter] = useState('scorecard')
  const [selectedRowId, setSelectedRowId] = useState<string | null>(null)

  const filterItems = [
    { value: 'scorecard', label: 'Scorecard' },
    { value: 'people', label: 'People' }
  ]

  const [tableData, setTableData] = useState<TableRow[]>([
    {
      id: '1',
      field: 'Phase 1',
      description: 'Initial phase of the operational process.',
      value: 'Out of 4',
      scorecard: true,
      timeline: true
    },
    {
      id: '2',
      field: 'Equipment Adjustment',
      description: 'Adjusting equipment settings for optimal performance.',
      value: 'Out of 4',
      scorecard: true,
      timeline: true
    },
    {
      id: '3',
      field: 'Manual Product Assembly',
      description: 'Assembling products by hand for precision.',
      value: 'Out of 4',
      scorecard: true,
      timeline: true
    },
    {
      id: '4',
      field: 'Raw Material Inspection',
      description: 'Inspecting raw materials for quality assurance.',
      value: 'Out of 4',
      scorecard: false,
      timeline: true
    },
    {
      id: '5',
      field: 'Manual Labeling',
      description: 'Labeling items manually for accurate identification.',
      value: 'Out of 4',
      scorecard: true,
      timeline: true
    },
    {
      id: '6',
      field: 'Phase 2',
      description: 'Second phase of the operational process.',
      value: 'Out of 4',
      scorecard: true,
      timeline: true
    },
    {
      id: '7',
      field: 'Sorting and Arranging',
      description: 'Organizing and categorizing items systematically.',
      value: 'Out of 4',
      scorecard: true,
      timeline: true
    },
    {
      id: '8',
      field: 'Cleaning Equipment',
      description: 'Equipment used for maintaining cleanliness and hygiene in various environments.',
      value: 'Out of 4',
      scorecard: false,
      timeline: true
    },
    {
      id: '9',
      field: 'Operator Break',
      description: 'Scheduled downtime for operators to rest and recharge.',
      value: 'Out of 4',
      scorecard: true,
      timeline: true
    },
    {
      id: '10',
      field: 'Packaging and Shipping',
      description: 'The process of preparing products for delivery, including packing and labeling.',
      value: 'Out of 4',
      scorecard: true,
      timeline: true
    }
  ])

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  )

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event

    if (active.id !== over?.id) {
      setTableData((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id)
        const newIndex = items.findIndex((item) => item.id === over?.id)

        return arrayMove(items, oldIndex, newIndex)
      })
    }
  }

  const handleRowSelect = (id: string) => {
    setSelectedRowId(id)
  }

  return (
    <div className="flex h-full bg-neutral-50">
      {/* Main Content */}
      <div className="flex-1 flex flex-col gap-4 p-4 overflow-auto">
        {/* Search and Filter Bar */}
        <div className="flex items-center gap-4 w-full">
          {/* Filter Toggle Group - Hidden */}
          {/* <div className="bg-white border border-zinc-200 rounded-md p-1.5 w-fit">
            <div className="flex gap-1">
              {filterItems.map((item) => (
                <button
                  key={item.value}
                  onClick={() => setActiveFilter(item.value)}
                  className={`px-3 py-1.5 rounded text-sm font-medium transition-colors ${
                    activeFilter === item.value
                      ? 'bg-accent-light text-accent'
                      : 'text-primary-hover hover:bg-gray-50'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div> */}

          {/* Search and Filter */}
          <div className="flex items-center gap-6 flex-1">
            {/* Search Bar */}
            <div className="flex-1">
              <SearchInput
                placeholder="Search"
                size="md"
              />
            </div>

            {/* Filter Button */}
            <div className="bg-white border border-gray-200 rounded-lg px-4 py-2 flex items-center gap-2">
              <Filter className="w-4 h-4 text-primary" />
              <span className="capitalize font-medium text-sm text-primary">
                filter
              </span>
            </div>

            {/* Export Output Button */}
            <div className="bg-primary flex items-center gap-2 px-4 py-2 rounded-lg">
              <Share className="w-4 h-4 text-white" />
              <span className="capitalize font-medium text-sm text-white">
                export output
              </span>
            </div>

            {/* Add Field Button */}
            <div className="bg-accent flex items-center gap-2 px-4 py-2 rounded-lg">
              <Plus className="w-4 h-4 text-white" />
              <span className="capitalize font-medium text-sm text-white">
                add field
              </span>
            </div>
          </div>
        </div>

        {/* Data Table */}
        <Card variant="default" className="flex-1 p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-zinc-200">
                  <th className="text-left p-4 w-12">
                    <GripVertical className="w-4 h-4 text-gray-400" />
                  </th>
                  <th className="text-left p-4">
                    <span className="text-sm font-medium text-gray-600">Fields</span>
                  </th>
                  <th className="text-left p-4">
                    <span className="text-sm font-medium text-gray-600">Descriptions</span>
                  </th>
                  <th className="text-left p-4">
                    <span className="text-sm font-medium text-gray-600">Value</span>
                  </th>
                  <th className="text-left p-4">
                    <span className="text-sm font-medium text-gray-600">Scorecard</span>
                  </th>
                  <th className="text-left p-4">
                    <span className="text-sm font-medium text-gray-600">Timeline</span>
                  </th>
                  <th className="text-left p-4 w-12">
                    <MoreHorizontal className="w-4 h-4 text-gray-400" />
                  </th>
                </tr>
              </thead>
              <tbody>
                <DndContext
                  sensors={sensors}
                  collisionDetection={closestCenter}
                  onDragEnd={handleDragEnd}
                >
                  <SortableContext
                    items={tableData.map(item => item.id)}
                    strategy={verticalListSortingStrategy}
                  >
                {tableData.map((row, index) => (
                      <SortableTableRow 
                        key={row.id} 
                        row={row} 
                        index={index} 
                        isSelected={selectedRowId === row.id}
                        onSelect={handleRowSelect}
                      />
                    ))}
                  </SortableContext>
                </DndContext>
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    </div>
  )
} 