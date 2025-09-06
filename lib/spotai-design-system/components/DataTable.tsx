import React from 'react'
import { cn } from '../utils/classNames'
import { Search, Filter, ArrowUpDown } from 'lucide-react'

export interface DataTableColumn {
  key: string
  label: string
  sortable?: boolean
  width?: string
}

export interface DataTableProps {
  columns: DataTableColumn[]
  data: Record<string, any>[]
  searchable?: boolean
  filterable?: boolean
  sortable?: boolean
  onSort?: (column: string, direction: 'asc' | 'desc') => void
  onSearch?: (query: string) => void
  className?: string
}

const DataTable: React.FC<DataTableProps> = ({
  columns,
  data,
  searchable = false,
  filterable = false,
  sortable = false,
  onSort,
  onSearch,
  className
}) => {
  const [sortColumn, setSortColumn] = React.useState<string | null>(null)
  const [sortDirection, setSortDirection] = React.useState<'asc' | 'desc'>('asc')
  const [searchQuery, setSearchQuery] = React.useState('')

  const handleSort = (column: string) => {
    if (!sortable) return

    const newDirection = sortColumn === column && sortDirection === 'asc' ? 'desc' : 'asc'
    setSortColumn(column)
    setSortDirection(newDirection)
    onSort?.(column, newDirection)
  }

  const handleSearch = (query: string) => {
    setSearchQuery(query)
    onSearch?.(query)
  }

  return (
    <div className={cn('bg-white rounded-lg border border-zinc-200', className)}>
      {/* Controls */}
      {(searchable || filterable) && (
        <div className="px-4 py-3 border-b border-zinc-200">
          <div className="flex items-center gapx-4 py-3">
            {searchable && (
              <div className="flex-1 max-w-md">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search..."
                    value={searchQuery}
                    onChange={(e) => handleSearch(e.target.value)}
                    className="w-full pl-10 pr-3 py-2 border border-zinc-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-accent"
                  />
                </div>
              </div>
            )}
            
            {filterable && (
                              <button className="flex items-center gap-2 px-4 py-2 border border-zinc-200 rounded-lg text-sm font-medium text-primary hover:bg-neutral-100">
                <Filter className="w-4 h-4" />
                Filter
              </button>
            )}
          </div>
        </div>
      )}

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-zinc-200">
              {columns.map((column) => (
                <th
                  key={column.key}
                  className={cn(
                    'text-left px-4 py-3 font-medium text-primary',
                    column.sortable && sortable && 'cursor-pointer hover:bg-neutral-100',
                    column.width && `w-${column.width}`
                  )}
                  onClick={() => column.sortable && handleSort(column.key)}
                >
                  <div className="flex items-center gap-2">
                    <span>{column.label}</span>
                    {column.sortable && sortable && (
                      <ArrowUpDown
                        className={cn(
                          'w-3 h-3',
                          sortColumn === column.key
                            ? 'text-accent'
                            : 'text-gray-300'
                        )}
                      />
                    )}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((row, rowIndex) => (
              <tr
                key={rowIndex}
                className={cn(
                  'border-b border-zinc-200',
                  rowIndex % 2 === 0 ? 'bg-white' : 'bg-neutral-100'
                )}
              >
                {columns.map((column) => (
                  <td key={column.key} className="px-4 py-3 text-sm text-primary">
                    {row[column.key]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default DataTable 