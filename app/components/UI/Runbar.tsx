'use client'

import { ChevronDown, Tag, Download, MessageSquare, X } from 'lucide-react'
import { Button, Dropdown } from '@spotai/design-system'

interface RunbarProps {
  selectedRun: string
  isRunDropdownOpen: boolean
  setIsRunDropdownOpen: (open: boolean) => void
  handleRunSelect: (run: string) => void
  runOptions: string[]
  onClose: () => void
}

const Runbar = ({
  selectedRun,
  isRunDropdownOpen,
  setIsRunDropdownOpen,
  handleRunSelect,
  runOptions,
  onClose
}: RunbarProps) => {
  // Convert run options to dropdown items
  const dropdownItems = runOptions.map(run => ({
    label: run,
    value: run
  }))

  const handleDropdownSelect = (item: { label: string; value: string }) => {
    handleRunSelect(item.value)
  }

  return (
    <div className="bg-white border-b border-zinc-200 px-4 py-4">
      <div className="flex items-center justify-between">
        {/* Run Dropdown */}
        <div className="w-[339px]">
          <Dropdown
            trigger={
              <span className="text-sm font-medium text-primary capitalize">
                {selectedRun}
              </span>
            }
            items={dropdownItems}
            onSelect={handleDropdownSelect}
            size="sm"
          />
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-4">
          {/* Tags Button - with accent background */}
          <Button
            variant="secondary"
            size="sm"
            className="px-4 py-2 h-9 rounded-lg"
          >
            <Tag className="w-4 h-4" />
            <span className="text-sm font-medium capitalize">Tags</span>
          </Button>

          {/* Download Button - with neutral background */}
          <Button
            variant="outline"
            size="sm"
            className="px-4 py-2 h-9 rounded-lg bg-neutral-100 hover:bg-neutral-100 text-primary border-0"
          >
            <Download className="w-4 h-4" />
            <span className="text-sm font-medium capitalize">Download</span>
          </Button>

          {/* Comment Button - with neutral background */}
          <Button
            variant="outline"
            size="sm"
            className="px-4 py-2 h-9 rounded-lg bg-neutral-100 hover:bg-neutral-100 text-primary border-0"
          >
            <MessageSquare className="w-4 h-4" />
            <span className="text-sm font-medium capitalize">Comment</span>
          </Button>

          {/* Close Button - with border */}
          <Button
            variant="outline"
            size="sm"
            className="px-4 py-2 h-9 rounded-lg bg-white border border-zinc-200 hover:bg-gray-50"
            onClick={onClose}
          >
            <X className="w-4 h-4" />
            <span className="text-sm font-medium capitalize">Close</span>
          </Button>
        </div>
      </div>
    </div>
  )
}

export default Runbar
