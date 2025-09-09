'use client'

import { useState } from 'react'
import { ChevronDown, Tag, Download, MessageSquare, X, User } from 'lucide-react'
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
  const [isCommentModalOpen, setIsCommentModalOpen] = useState(false)
  const [comment, setComment] = useState('')
  const [hasComment, setHasComment] = useState(false)

  // Convert run options to dropdown items
  const dropdownItems = runOptions.map(run => ({
    label: run,
    value: run
  }))

  const handleDropdownSelect = (item: { label: string; value: string }) => {
    handleRunSelect(item.value)
  }

  const handleDownload = () => {
    // Create a link element to trigger download
    const link = document.createElement('a')
    link.href = '/docs/example_scorecard.pdf'
    link.download = 'example_scorecard.pdf'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const handleCommentClick = () => {
    setIsCommentModalOpen(true)
  }

  const handleCommentSubmit = () => {
    // Handle comment submission here
    console.log('Comment submitted:', comment)
    setHasComment(true)
    setComment('')
    setIsCommentModalOpen(false)
  }

  const handleCommentCancel = () => {
    setComment('')
    setIsCommentModalOpen(false)
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
            onClick={handleDownload}
          >
            <Download className="w-4 h-4" />
            <span className="text-sm font-medium capitalize">Download</span>
          </Button>

          {/* Comment Button - with neutral background */}
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              className="px-4 py-2 h-9 rounded-lg bg-neutral-100 hover:bg-neutral-100 text-primary border-0"
              onClick={handleCommentClick}
            >
              <MessageSquare className="w-4 h-4" />
              <span className="text-sm font-medium capitalize">Comment</span>
            </Button>
            
            {/* Profile Icon - Show when comment has been made */}
            {hasComment && (
              <div className="flex items-center justify-center w-9 h-9 bg-accent-light rounded-lg">
                <User className="w-4 h-4 text-accent" />
              </div>
            )}
          </div>

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

      {/* Comment Modal */}
      {isCommentModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg shadow-xl w-[600px] max-w-[90vw] mx-4">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b border-zinc-200">
              <h3 className="text-lg font-semibold text-primary">Add Comment</h3>
              <button
                onClick={handleCommentCancel}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            {/* Modal Content */}
            <div className="p-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-primary mb-2">
                    Comment for {selectedRun}
                  </label>
                  <textarea
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    placeholder="Enter your comment here..."
                    className="w-full px-3 py-2 border border-zinc-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent resize-none"
                    rows={4}
                  />
                </div>
                
                <div className="flex justify-end gap-2 pt-4">
                  <Button
                    variant="outline"
                    onClick={handleCommentCancel}
                    className="px-4 py-2"
                  >
                    Cancel
                  </Button>
                  <Button
                    variant="primary"
                    onClick={handleCommentSubmit}
                    className="px-4 py-2"
                    disabled={!comment.trim()}
                  >
                    Submit Comment
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Runbar
