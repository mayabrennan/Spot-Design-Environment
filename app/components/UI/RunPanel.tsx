'use client'

import { ChevronRight, MoreHorizontal, Download, Sparkles, ArrowUp, Check, X, ChevronDown, ArrowLeft, ThumbsUp, ThumbsDown, Tag, MessageSquare, User, Pen, Copy, Trash2, Plus, ChevronUp } from 'lucide-react'
import { Card, Badge, Button, Modal } from '@spotai/design-system'
import { useState, useEffect } from 'react'

interface RunPanelProps {
  onBack: () => void
  onTaskClick?: () => void
  selectedRun?: string
}

export default function RunPanel({ onBack, onTaskClick, selectedRun = 'Run 1' }: RunPanelProps) {
  const [collapsedPhases, setCollapsedPhases] = useState<Set<number>>(new Set([1, 2, 3]))
  const [activeTab, setActiveTab] = useState('scorecard')
  const [showToast, setShowToast] = useState(false)
  const [isCommentModalOpen, setIsCommentModalOpen] = useState(false)
  const [comment, setComment] = useState('')
  const [hasComment, setHasComment] = useState(false)
  const [showMentionSuggestions, setShowMentionSuggestions] = useState(false)
  const [mentionQuery, setMentionQuery] = useState('')
  const [mentionPosition, setMentionPosition] = useState({ top: 0, left: 0 })
  const [isTagsModalOpen, setIsTagsModalOpen] = useState(false)
  const [newTagKey, setNewTagKey] = useState('')
  const [newTagValue, setNewTagValue] = useState('')
  const [tags, setTags] = useState([
    { id: 1, key: 'Plant', value: 'Plant 1' },
    { id: 2, key: 'Line', value: 'Line 1' }
  ])
  const [activeActionsDropdown, setActiveActionsDropdown] = useState<string | null>(null)
  const [editingField, setEditingField] = useState<string | null>(null)
  const [fieldFormData, setFieldFormData] = useState({
    fieldType: 'task',
    fieldName: '',
    description: '',
    value: 'numerical score',
    category: 'none'
  })
  const [runName, setRunName] = useState('Run Sept 8th 2025 5:25 PM PDT')
  const [isEditingRunName, setIsEditingRunName] = useState(false)
  const [newComment, setNewComment] = useState('')
  const [existingComments] = useState([
    {
      id: 1,
      author: 'Mike Chen',
      timestamp: '2 hours ago',
      content: 'kept same ink colors here, so longer clean phase was not needed',
      avatar: 'MC'
    },
    {
      id: 2,
      author: 'Sarah Johnson',
      timestamp: '1 day ago',
      content: '@jackgreen decorator was in training, that\'s why scores are a bit lower this run',
      avatar: 'SJ'
    }
  ])

  // Available users for @ mentions
  const availableUsers = [
    { id: 1, name: 'John Smith', username: 'johnsmith', avatar: 'JS' },
    { id: 2, name: 'Sarah Johnson', username: 'sarahjohnson', avatar: 'SJ' },
    { id: 3, name: 'Mike Chen', username: 'mikechen', avatar: 'MC' },
    { id: 4, name: 'Emily Davis', username: 'emilydavis', avatar: 'ED' },
    { id: 5, name: 'Alex Rodriguez', username: 'alexrodriguez', avatar: 'AR' }
  ]

  const togglePhase = (phaseId: number) => {
    const newCollapsed = new Set(collapsedPhases)
    if (newCollapsed.has(phaseId)) {
      newCollapsed.delete(phaseId)
    } else {
      newCollapsed.add(phaseId)
    }
    setCollapsedPhases(newCollapsed)
  }

  const handleFeedbackClick = () => {
    setShowToast(true)
    // Auto-hide toast after 3 seconds
    setTimeout(() => {
      setShowToast(false)
    }, 3000)
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
    setShowMentionSuggestions(false)
    setIsCommentModalOpen(false)
  }

  // Tag modal handlers
  const handleTagsClick = () => {
    setIsTagsModalOpen(true)
  }

  const handleTagsModalClose = () => {
    setIsTagsModalOpen(false)
    setNewTagKey('')
    setNewTagValue('')
  }

  const handleAddTag = () => {
    if (newTagKey.trim() && newTagValue.trim()) {
      const newTag = {
        id: Date.now(),
        key: newTagKey.trim(),
        value: newTagValue.trim()
      }
      setTags([...tags, newTag])
      setNewTagKey('')
      setNewTagValue('')
    }
  }

  const handleDeleteTag = (tagId: number) => {
    setTags(tags.filter(tag => tag.id !== tagId))
  }

  const handleActionsClick = (fieldId: string, event: React.MouseEvent) => {
    event.stopPropagation()
    setActiveActionsDropdown(activeActionsDropdown === fieldId ? null : fieldId)
  }

  const handleActionSelect = (action: string, fieldId: string) => {
    console.log(`${action} action selected for field: ${fieldId}`)
    setActiveActionsDropdown(null)
    
    if (action === 'edit') {
      // For now, just log that edit was clicked
      // TODO: Implement inline editing for existing fields
      console.log(`Edit mode for field: ${fieldId}`)
    }
  }

  const getFieldName = (fieldId: string) => {
    const fieldNames: { [key: string]: string } = {
      'equipment-adjustment': 'Equipment Adjustment',
      'manual-product-assembly': 'Manual Product Assembly',
      'raw-material-inspection': 'Raw Material Inspection',
      'manual-labeling': 'Manual Labeling',
      'sorting-and-arranging': 'Sorting and Arranging'
    }
    return fieldNames[fieldId] || ''
  }

  const getFieldDescription = (fieldId: string) => {
    const descriptions: { [key: string]: string } = {
      'equipment-adjustment': 'Equipment adjustment for product assembly requires skilled workers to manually assemble various components, ensuring that each part fits perfectly to create the final product.',
      'manual-product-assembly': 'Manual Product Assembly involves the hands-on assembly of product components by workers to create a finished product.',
      'raw-material-inspection': 'Raw material inspection entails the thorough examination of incoming materials by workers to ensure quality before production.',
      'manual-labeling': 'Manual labeling requires workers to physically attach labels to product components to finalize the product.',
      'sorting-and-arranging': 'Sorting and arranging product components is a crucial step in the manual assembly process, where workers meticulously organize parts to ensure a smooth transition to creating the final product.'
    }
    return descriptions[fieldId] || ''
  }

  const handleCloseActions = () => {
    setActiveActionsDropdown(null)
  }

  const handleAddFieldClick = () => {
    setActiveTab('fields')
    setEditingField('new-field')
    setFieldFormData({
      fieldType: 'task',
      fieldName: '',
      description: '',
      value: 'numerical score',
      category: 'none'
    })
  }

  const handleFormChange = (field: string, value: string) => {
    setFieldFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleCreateField = () => {
    console.log('Creating field with data:', fieldFormData)
    setEditingField(null)
    setFieldFormData({
      fieldType: 'task',
      fieldName: '',
      description: '',
      value: 'numerical score',
      category: 'none'
    })
  }

  const handleCancelEdit = () => {
    setEditingField(null)
    setFieldFormData({
      fieldType: 'task',
      fieldName: '',
      description: '',
      value: 'numerical score',
      category: 'none'
    })
  }

  const handleRunNameClick = () => {
    setIsEditingRunName(true)
  }

  const handleRunNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRunName(e.target.value)
  }

  const handleRunNameBlur = () => {
    setIsEditingRunName(false)
  }

  const handleRunNameKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      setIsEditingRunName(false)
    }
    if (e.key === 'Escape') {
      setRunName('Run Sept 8th 2025 5:25 PM PDT') // Reset to original
      setIsEditingRunName(false)
    }
  }

  const handleNewCommentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setNewComment(e.target.value)
  }

  const handleAddNewComment = () => {
    if (newComment.trim()) {
      // Here you would typically add the comment to the existingComments array
      console.log('Adding new comment:', newComment)
      setNewComment('')
    }
  }

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (activeActionsDropdown) {
        const target = event.target as Element
        if (!target.closest('.actions-dropdown')) {
          setActiveActionsDropdown(null)
        }
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [activeActionsDropdown])

  // Handle @ mention functionality
  const handleCommentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value
    const cursorPosition = e.target.selectionStart
    
    setComment(value)
    
    // Check for @ mention
    const textBeforeCursor = value.substring(0, cursorPosition)
    const lastAtIndex = textBeforeCursor.lastIndexOf('@')
    
    if (lastAtIndex !== -1) {
      const textAfterAt = textBeforeCursor.substring(lastAtIndex + 1)
      const hasSpaceAfterAt = textAfterAt.includes(' ')
      
      if (!hasSpaceAfterAt) {
        setMentionQuery(textAfterAt)
        setShowMentionSuggestions(true)
        
        // Position the suggestions dropdown
        const textarea = e.target
        const rect = textarea.getBoundingClientRect()
        setMentionPosition({
          top: rect.top + 100, // Position below textarea
          left: rect.left
        })
      } else {
        setShowMentionSuggestions(false)
      }
    } else {
      setShowMentionSuggestions(false)
    }
  }

  const handleMentionSelect = (user: any) => {
    const textBeforeCursor = comment.substring(0, comment.lastIndexOf('@'))
    const textAfterMention = comment.substring(comment.lastIndexOf('@') + 1 + mentionQuery.length)
    
    const newComment = `${textBeforeCursor}@${user.username} ${textAfterMention}`
    setComment(newComment)
    setShowMentionSuggestions(false)
    setMentionQuery('')
  }

  const filteredUsers = availableUsers.filter(user => 
    user.name.toLowerCase().includes(mentionQuery.toLowerCase()) ||
    user.username.toLowerCase().includes(mentionQuery.toLowerCase())
  )

  // Different metrics data for each run
  const runMetrics = {
    'Run 1': {
      runTime: { value: '23 min', change: '+3 min', changeType: 'warning' },
      cleaning: { value: '4/5', status: 'great', statusType: 'info' },
      exchangeOfParts: { value: '4/5', status: 'needs work', statusType: 'warning' },
      adjustments: { value: '3/5', status: 'needs work', statusType: 'warning' }
    },
    'Run 2': {
      runTime: { value: '18 min', change: '-2 min', changeType: 'success' },
      cleaning: { value: '5/5', status: 'excellent', statusType: 'success' },
      exchangeOfParts: { value: '5/5', status: 'excellent', statusType: 'success' },
      adjustments: { value: '4/5', status: 'good', statusType: 'info' }
    }
  }

  const currentMetrics = runMetrics[selectedRun as keyof typeof runMetrics] || runMetrics['Run 1']

  // Different phase data for each run
  const runPhaseData = {
    'Run 1': {
      cleaning: {
        description: 'The cleaning phase focuses on thorough preparation and staging of all necessary tools and materials to ensure optimal working conditions and efficiency.',
        tasks: [
          {
            name: 'cleaning and preparation',
            score: '4/4',
            description: 'Cleaning and preparation was executed excellently, with all surfaces properly sanitized and work areas organized for maximum efficiency.'
          },
          {
            name: 'tools staging',
            score: '4/4',
            description: 'Tools were staged systematically and efficiently, with all required equipment properly positioned and ready for immediate use.'
          },
          {
            name: 'plates staging',
            score: '4/4',
            description: 'Plate staging was completed with precision, ensuring all materials were properly organized and easily accessible throughout the process.'
          }
        ]
      },
      exchangeOfParts: {
        description: 'Overall, this phase was successful. The equipment adjustment and manual labelling were conducted quickly and correctly, but there was room for improvement on the raw material inspection.',
        tasks: [
          {
            name: 'equipment adjustment',
            score: '4/4',
            description: 'The equipment adjustment phase was executed well, with skilled workers ensuring precise assembly of components, contributing to a successful product outcome.'
          },
          {
            name: 'Manual Product Assembly',
            score: '4/4',
            description: 'The equipment adjustment phase was executed well, with skilled workers ensuring precise assembly of components, contributing to a successful product outcome.'
          },
          {
            name: 'raw material inspection',
            score: '4/4',
            description: 'Raw material inspection showed some inconsistencies; improvements are needed to ensure all materials meet quality standards before production.'
          }
        ]
      },
      adjustments: {
        description: 'Overall, this phase was successful. The equipment adjustment and manual labelling were conducted quickly and correctly, but there was room for improvement on the raw material inspection.',
        tasks: [
          {
            name: 'quality inspection',
            score: '2/4',
            description: 'Quality inspection revealed several inconsistencies in the final product. Additional training and stricter protocols are needed to ensure consistent quality standards.'
          },
          {
            name: 'documentation review',
            score: '3/4',
            description: 'Documentation was mostly complete but missing some critical details. The process needs better standardization to capture all required information.'
          },
          {
            name: 'safety compliance',
            score: '1/4',
            description: 'Safety compliance was below standards with several protocol violations observed. Immediate corrective action and retraining are required.'
          },
          {
            name: 'equipment calibration',
            score: '2/4',
            description: 'Equipment calibration was partially completed but not verified properly. Regular calibration checks and verification procedures need to be implemented.'
          }
        ]
      }
    },
    'Run 2': {
      cleaning: {
        description: 'The cleaning phase was executed flawlessly with exceptional attention to detail. All preparation and staging activities were completed with superior efficiency and organization.',
        tasks: [
          {
            name: 'cleaning and preparation',
            score: '5/5',
            description: 'Outstanding cleaning and preparation execution with meticulous attention to every surface and work area, setting the gold standard for efficiency.'
          },
          {
            name: 'tools staging',
            score: '5/5',
            description: 'Perfect tools staging with exceptional organization and systematic placement, ensuring optimal workflow and immediate accessibility.'
          },
          {
            name: 'plates staging',
            score: '5/5',
            description: 'Exemplary plate staging with flawless precision and organization, demonstrating superior material management and process optimization.'
          }
        ]
      },
      exchangeOfParts: {
        description: 'This phase exceeded expectations with outstanding performance across all areas. Equipment adjustments and manual operations were executed with exceptional precision and efficiency.',
        tasks: [
          {
            name: 'equipment adjustment',
            score: '5/5',
            description: 'Exceptional equipment adjustment execution with outstanding precision and expertise, resulting in superior product quality and operational excellence.'
          },
          {
            name: 'Manual Product Assembly',
            score: '5/5',
            description: 'Outstanding manual assembly performance with exceptional skill and attention to detail, contributing to superior product outcomes.'
          },
          {
            name: 'raw material inspection',
            score: '5/5',
            description: 'Excellent raw material inspection with thorough quality checks and consistent standards, ensuring all materials meet the highest quality requirements.'
          }
        ]
      },
      adjustments: {
        description: 'This phase demonstrated significant improvement with excellent performance across all critical areas. All adjustments and quality checks were completed with superior precision.',
        tasks: [
          {
            name: 'quality inspection',
            score: '4/5',
            description: 'Significant improvement in quality inspection with much better consistency and attention to detail, showing clear progress in quality standards.'
          },
          {
            name: 'documentation review',
            score: '4/5',
            description: 'Good documentation review with improved completeness and better standardization, capturing most required information effectively.'
          },
          {
            name: 'safety compliance',
            score: '4/5',
            description: 'Much improved safety compliance with better adherence to protocols and reduced violations, showing clear progress in safety standards.'
          },
          {
            name: 'equipment calibration',
            score: '4/5',
            description: 'Good equipment calibration with proper completion and verification procedures, ensuring consistent performance and reliability.'
          }
        ]
      }
    }
  }

  const currentPhaseData = runPhaseData[selectedRun as keyof typeof runPhaseData] || runPhaseData['Run 1']

  const phases = [
    {
      id: 1,
      name: 'cleaning',
      status: currentMetrics.cleaning.status,
      score: currentMetrics.cleaning.value,
      color: currentMetrics.cleaning.statusType === 'success' ? 'bg-success' : 
             currentMetrics.cleaning.statusType === 'warning' ? 'bg-warning' : 'bg-info',
      borderColor: 'border-l-accent',
      description: currentPhaseData.cleaning.description,
      tasks: currentPhaseData.cleaning.tasks
    },
    {
      id: 2,
      name: 'exchange of parts',
      status: currentMetrics.exchangeOfParts.status,
      score: currentMetrics.exchangeOfParts.value,
      color: currentMetrics.exchangeOfParts.statusType === 'success' ? 'bg-success' : 
             currentMetrics.exchangeOfParts.statusType === 'warning' ? 'bg-warning' : 'bg-info',
      borderColor: 'border-l-accent',
      description: currentPhaseData.exchangeOfParts.description,
      tasks: currentPhaseData.exchangeOfParts.tasks
    },
    {
      id: 3,
      name: 'adjustments',
      status: currentMetrics.adjustments.status,
      score: currentMetrics.adjustments.value,
      color: currentMetrics.adjustments.statusType === 'success' ? 'bg-success' : 
             currentMetrics.adjustments.statusType === 'warning' ? 'bg-warning' : 'bg-info',
      borderColor: 'border-l-accent',
      description: currentPhaseData.adjustments.description,
      tasks: currentPhaseData.adjustments.tasks
    }
  ]

  const toggleItems = [
    { label: 'Feed', value: 'feed' },
    { label: 'Scorecard', value: 'scorecard' },
    { label: 'Fields', value: 'fields' },
    { label: 'Comments', value: 'comments' }
  ]

  // ActionsDropdown component
  const ActionsDropdown = ({ fieldId, isOpen, onClose, onActionSelect }: {
    fieldId: string
    isOpen: boolean
    onClose: () => void
    onActionSelect: (action: string, fieldId: string) => void
  }) => {
    if (!isOpen) return null

    return (
      <div className="absolute top-full right-0 mt-1 bg-white border border-zinc-200 rounded-lg shadow-lg z-50 min-w-[120px]">
        <div className="py-1">
          {/* Header */}
          <div className="px-3 py-1.5 border-b border-zinc-200">
            <div className="text-sm font-semibold text-primary capitalize">Actions</div>
          </div>
          
          {/* Edit */}
          <button
            onClick={() => onActionSelect('edit', fieldId)}
            disabled
            className="w-full flex items-center gap-2 px-3 py-2 text-left cursor-not-allowed opacity-50"
          >
            <Pen className="w-4 h-4 text-gray-400" />
            <span className="text-sm font-medium text-gray-400 capitalize">Edit</span>
          </button>
          
          {/* Divider */}
          <div className="border-b border-zinc-200"></div>
          
          {/* Duplicate */}
          <button
            onClick={() => onActionSelect('duplicate', fieldId)}
            disabled
            className="w-full flex items-center gap-2 px-3 py-2 text-left cursor-not-allowed opacity-50"
          >
            <Copy className="w-4 h-4 text-gray-400" />
            <span className="text-sm font-medium text-gray-400 capitalize">Duplicate</span>
          </button>
          
          {/* Divider */}
          <div className="border-b border-zinc-200"></div>
          
          {/* Delete */}
          <button
            onClick={() => onActionSelect('delete', fieldId)}
            disabled
            className="w-full flex items-center gap-2 px-3 py-2 text-left cursor-not-allowed opacity-50"
          >
            <Trash2 className="w-4 h-4 text-red-400" />
            <span className="text-sm font-medium text-red-400 capitalize">Delete</span>
          </button>
        </div>
      </div>
    )
  }

  // EditFieldForm component
  const EditFieldForm = ({ onSave, onCancel }: {
    onSave: () => void
    onCancel: () => void
  }) => {
    return (
      <div className="bg-white border border-zinc-200 rounded-lg p-4">
        {/* Header with action buttons */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-1">
            {/* Move up button */}
            <button className="p-1.5 bg-white border border-zinc-200 rounded-md hover:bg-gray-50 transition-colors">
              <ChevronUp className="w-4 h-4 text-gray-600" />
            </button>
            {/* Move down button */}
            <button className="p-1.5 bg-white border border-zinc-200 rounded-md hover:bg-gray-50 transition-colors">
              <ChevronDown className="w-4 h-4 text-gray-600" />
            </button>
          </div>
          {/* Delete button */}
          <button 
            onClick={onCancel}
            className="p-2.5 bg-white border border-zinc-200 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <Trash2 className="w-4 h-4 text-gray-600" />
          </button>
        </div>

        {/* Form fields */}
        <div className="space-y-4">
          {/* Field Type */}
          <div className="space-y-1.5">
            <label className="text-sm font-medium text-primary capitalize">Field Type</label>
            <div className="relative">
              <select
                value={fieldFormData.fieldType}
                onChange={(e) => handleFormChange('fieldType', e.target.value)}
                className="w-full h-9 px-3 py-2 bg-white border border-zinc-200 rounded-md text-sm font-medium text-primary capitalize focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent appearance-none"
              >
                <option value="task">Task</option>
                <option value="phase">Phase</option>
              </select>
              <ChevronUp className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-600 pointer-events-none" />
            </div>
          </div>

          {/* Field Name */}
          <div className="space-y-1.5">
            <label className="text-sm font-medium text-primary capitalize">Field Name</label>
            <input
              type="text"
              value={fieldFormData.fieldName}
              onChange={(e) => handleFormChange('fieldName', e.target.value)}
              className="w-full h-9 px-3 py-2 bg-white border border-zinc-200 rounded-md text-sm text-gray-600 focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent"
              placeholder="Manual Product Assembly"
            />
          </div>

          {/* Description */}
          <div className="space-y-1.5">
            <label className="text-sm font-medium text-primary capitalize">Description</label>
            <textarea
              value={fieldFormData.description}
              onChange={(e) => handleFormChange('description', e.target.value)}
              rows={3}
              className="w-full px-3 py-2 bg-white border border-zinc-200 rounded-md text-sm text-gray-600 focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent resize-none"
              placeholder="In Manual Product Assembly, skilled workers meticulously join product parts, turning raw materials into high-quality finished goods through their expertise and dedication."
            />
          </div>

          {/* Value */}
          <div className="space-y-1.5">
            <label className="text-sm font-medium text-primary capitalize">Value</label>
            <div className="relative">
              <select
                value={fieldFormData.value}
                onChange={(e) => handleFormChange('value', e.target.value)}
                className="w-full h-9 px-3 py-2 bg-white border border-zinc-200 rounded-md text-sm font-medium text-primary capitalize focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent appearance-none"
              >
                <option value="numerical score">Numerical Score</option>
                <option value="text">Text</option>
                <option value="boolean">Boolean</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-600 pointer-events-none" />
            </div>
          </div>

          {/* Category */}
          <div className="space-y-1.5">
            <label className="text-sm font-medium text-primary capitalize">Category</label>
            <div className="relative">
              <select
                value={fieldFormData.category}
                onChange={(e) => handleFormChange('category', e.target.value)}
                className="w-full h-9 px-3 py-2 bg-white border border-zinc-200 rounded-md text-sm font-medium text-primary capitalize focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent appearance-none"
              >
                <option value="none">None</option>
                <option value="quality">Quality</option>
                <option value="efficiency">Efficiency</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-600 pointer-events-none" />
            </div>
          </div>

          {/* Create Button */}
          <button
            onClick={onSave}
            className="w-full bg-accent hover:bg-accent-hover text-white font-medium text-sm capitalize py-2 px-4 rounded-lg transition-colors"
          >
            Create
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="w-1/3 bg-white border-l border-zinc-200 border-r border-zinc-200 flex flex-col h-full">
      {/* Content */}
      <div className="flex-1 overflow-y-auto overflow-x-hidden p-4 space-y-4">
        {/* Toggle Group with Download Button */}
        <div className="flex items-center justify-between">
          {/* Toggle Group */}
          <div className="bg-white border border-zinc-200 rounded-md p-1.5 w-fit">
            <div className="flex gap-1">
              {toggleItems.map((item) => (
                <button
                  key={item.value}
                  onClick={() => setActiveTab(item.value)}
                  className={`px-3 py-1.5 rounded text-sm font-medium transition-colors ${
                    activeTab === item.value
                      ? 'bg-accent-light text-accent'
                      : 'text-primary-hover hover:bg-gray-50'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2">
            {/* Add Field Button */}
            <Button
              variant="outline"
              size="sm"
              className="px-3 py-2 h-9 rounded-lg bg-neutral-100 hover:bg-gray-200 text-primary border-0 transition-colors"
              onClick={handleAddFieldClick}
            >
              <Plus className="w-4 h-4" />
            </Button>

            {/* Download Button */}
            <Button
              variant="outline"
              size="sm"
              className="px-3 py-2 h-9 rounded-lg bg-neutral-100 hover:bg-gray-200 text-primary border-0 transition-colors"
              onClick={handleDownload}
            >
              <Download className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Tab Content */}
        {activeTab === 'scorecard' ? (
          <>
            {/* What went well and What could be improved cards */}
            <div className="space-y-4 mb-6">
              {/* What went well - With Green Stroke */}
              <div className="bg-white border border-zinc-200 border-l-4 border-l-success rounded-lg p-4">
                <div className="flex items-center gap-1 mb-2">
                  <Check className="w-5 h-5 text-success" />
                  <h3 className="text-base font-medium text-success capitalize">What went well this run</h3>
                </div>
                <p className="text-sm text-primary leading-5">
                  The team demonstrated excellent coordination and preparation with all necessary tools and materials staged properly, resulting in smooth execution of complex procedures with minimal idle time and no mechanical re-work required.
                </p>
              </div>

              {/* What could be improved - With Orange Stroke */}
              <div className="bg-white border border-zinc-200 border-l-4 border-l-warning rounded-lg p-4">
                <div className="flex items-center gap-1 mb-2">
                  <X className="w-5 h-5 text-warning" />
                  <h3 className="text-base font-medium text-warning capitalize">What could be improved this run</h3>
                </div>
                <p className="text-sm text-primary leading-5">
                  Flashlight confirmation during cleaning processes was inconsistent, and the final quality verification documentation was not captured on video, suggesting room for improvement in verification protocols.
                </p>
              </div>
            </div>

            {/* Phase cards */}
            {phases.map((phase) => (
            <div key={phase.id} className={`relative ${phase.borderColor} border-l-4 rounded-lg`}>
              <Card className="p-4 rounded-lg">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <h3 className="text-base font-medium text-primary capitalize">{phase.name}</h3>
                    <Badge 
                      variant={phase.id === 1 ? (currentMetrics.cleaning.statusType as any) : 
                              phase.id === 2 ? (currentMetrics.exchangeOfParts.statusType as any) : 
                              (currentMetrics.adjustments.statusType as any)} 
                      className="text-xs px-2.5 py-0.5"
                    >
                      {phase.status}
                    </Badge>
                  </div>
                  <div className="text-sm font-semibold text-primary">{phase.score}</div>
                </div>
                
                <p className="text-sm text-primary mb-3">{phase.description}</p>
                
                {/* Bottom section with feedback buttons and breakdown button */}
                <div className="flex items-center justify-between">
                  {/* Feedback buttons */}
                  <div className="flex items-center gap-2">
                    <button 
                      onClick={handleFeedbackClick}
                      className="p-1.5 bg-white border border-zinc-200 rounded-md hover:bg-gray-50 transition-colors"
                    >
                      <ThumbsUp className="w-4 h-4 text-gray-600" />
                    </button>
                    <button 
                      onClick={handleFeedbackClick}
                      className="p-1.5 bg-white border border-zinc-200 rounded-md hover:bg-gray-50 transition-colors"
                    >
                      <ThumbsDown className="w-4 h-4 text-gray-600" />
                    </button>
                  </div>
                  
                  {/* Hide/Show Breakdown Button - moved to bottom right */}
                  <button
                    onClick={() => togglePhase(phase.id)}
                    className="flex items-center gap-2 px-2 py-1 bg-accent-light text-accent text-xs font-medium rounded-md hover:bg-accent hover:text-white transition-colors"
                  >
                    {collapsedPhases.has(phase.id) ? 'Show Breakdown' : 'Hide Breakdown'}
                    {collapsedPhases.has(phase.id) ? (
                      <ChevronDown className="w-4 h-4" />
                    ) : (
                      <ArrowUp className="w-4 h-4" />
                    )}
                  </button>
                </div>
                
                {/* Tasks */}
                {!collapsedPhases.has(phase.id) && phase.tasks.length > 0 && (
                  <div className="mt-4 space-y-4">
                    {phase.tasks.map((task, index) => (
                      <Card key={index} className="p-4 rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="text-sm font-medium text-primary capitalize">{task.name}</h4>
                          <span className="text-sm font-semibold text-primary">{task.score}</span>
                        </div>
                        <p className="text-xs text-primary mb-2 leading-5">{task.description}</p>
                        <div className="flex items-center gap-2">
                          <button 
                            onClick={handleFeedbackClick}
                            className="p-1.5 bg-white border border-zinc-200 rounded-md hover:bg-gray-50 transition-colors"
                          >
                            <ThumbsUp className="w-4 h-4 text-gray-600" />
                          </button>
                          <button 
                            onClick={handleFeedbackClick}
                            className="p-1.5 bg-white border border-zinc-200 rounded-md hover:bg-gray-50 transition-colors"
                          >
                            <ThumbsDown className="w-4 h-4 text-gray-600" />
                          </button>
                        </div>
                      </Card>
                    ))}
                  </div>
                )}
              </Card>
            </div>
            ))}

            {/* Phase Recommendation Cards */}
            <div className="space-y-4 mt-6">
              {/* Phase 1 Recommendation */}
              <div className="bg-white border border-zinc-200 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Sparkles className="w-4 h-4 text-accent" />
                  <h3 className="text-xs font-medium text-accent">Phase 1 Recommendation</h3>
                </div>
                <p className="text-xs text-primary">
                  Make sure everyone stays motivated on the floor, especially during early hours.
                </p>
              </div>

              {/* Phase 2 Recommendation */}
              <div className="bg-white border border-zinc-200 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Sparkles className="w-4 h-4 text-accent" />
                  <h3 className="text-xs font-medium text-accent">Phase 2 Recommendation</h3>
                </div>
                <p className="text-xs text-primary">
                  Make sure everyone stays motivated on the floor, especially during early hours.
                </p>
              </div>

              {/* Phase 3 Recommendation */}
              <div className="bg-white border border-zinc-200 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Sparkles className="w-4 h-4 text-accent" />
                  <h3 className="text-xs font-medium text-accent">Phase 3 Recommendation</h3>
                </div>
                <p className="text-xs text-primary">
                  Make sure everyone stays motivated on the floor, especially during early hours.
                </p>
              </div>
            </div>
          </>
        ) : activeTab === 'feed' ? (
          <div className="text-center text-sm text-gray-500 py-4">No feed items available</div>
        ) : activeTab === 'fields' ? (
          <>
            {/* Fields Content */}
            <div className="space-y-4">
              {/* Edit Field Form */}
              {editingField === 'new-field' && (
                <EditFieldForm
                  onSave={handleCreateField}
                  onCancel={handleCancelEdit}
                />
              )}

              {/* Phase 1 */}
              <div className="bg-white border border-zinc-200 rounded-lg py-4 px-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-base font-medium text-primary capitalize">Phase 1</h3>
                  <button className="p-1.5 bg-white border border-zinc-200 rounded-md hover:bg-gray-50 transition-colors">
                    <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <circle cx="12" cy="12" r="1"></circle>
                      <circle cx="19" cy="12" r="1"></circle>
                      <circle cx="5" cy="12" r="1"></circle>
                    </svg>
                  </button>
                </div>
              </div>

              {/* Equipment Adjustment */}
              <div className="bg-white border border-zinc-200 rounded-lg p-4">
                <div className="flex flex-col gap-2 mb-3">
                  <h4 className="text-sm font-medium text-primary capitalize">Equipment Adjustment</h4>
                  <p className="text-xs text-primary leading-5">
                    Equipment adjustment for product assembly requires skilled workers to manually assemble various components, ensuring that each part fits perfectly to create the final product.
                  </p>
                </div>
                <div className="flex items-center justify-between">
                  <div className="bg-neutral-100 px-2.5 py-0.5 rounded text-sm font-medium text-primary capitalize">
                    Score: Out of 4
                  </div>
                  <div className="relative actions-dropdown">
                    <button 
                      onClick={(e) => handleActionsClick('equipment-adjustment', e)}
                      className="p-1.5 bg-white border border-zinc-200 rounded-md hover:bg-gray-50 transition-colors"
                    >
                      <MoreHorizontal className="w-4 h-4 text-gray-600" />
                    </button>
                    <ActionsDropdown
                      fieldId="equipment-adjustment"
                      isOpen={activeActionsDropdown === 'equipment-adjustment'}
                      onClose={handleCloseActions}
                      onActionSelect={handleActionSelect}
                    />
                  </div>
                </div>
              </div>

              {/* Manual Product Assembly */}
              <div className="bg-white border border-zinc-200 rounded-lg p-4">
                <div className="flex flex-col gap-2 mb-3">
                  <h4 className="text-sm font-medium text-primary capitalize">Manual Product Assembly</h4>
                  <p className="text-xs text-primary leading-5">
                    Manual Product Assembly involves the hands-on assembly of product components by workers to create a finished product.
                  </p>
                </div>
                <div className="flex items-center justify-between">
                  <div className="bg-neutral-100 px-2.5 py-0.5 rounded text-sm font-medium text-primary capitalize">
                    Score: Out of 4
                  </div>
                  <div className="relative actions-dropdown">
                    <button 
                      onClick={(e) => handleActionsClick('manual-product-assembly', e)}
                      className="p-1.5 bg-white border border-zinc-200 rounded-md hover:bg-gray-50 transition-colors"
                    >
                      <MoreHorizontal className="w-4 h-4 text-gray-600" />
                    </button>
                    <ActionsDropdown
                      fieldId="manual-product-assembly"
                      isOpen={activeActionsDropdown === 'manual-product-assembly'}
                      onClose={handleCloseActions}
                      onActionSelect={handleActionSelect}
                    />
                  </div>
                </div>
              </div>

              {/* Raw Material Inspection */}
              <div className="bg-white border border-zinc-200 rounded-lg p-4">
                <div className="flex flex-col gap-2 mb-3">
                  <h4 className="text-sm font-medium text-primary capitalize">Raw Material Inspection</h4>
                  <p className="text-xs text-primary leading-5">
                    Raw material inspection entails the thorough examination of incoming materials by workers to ensure quality before production.
                  </p>
                </div>
                <div className="flex items-center justify-between">
                  <div className="bg-neutral-100 px-2.5 py-0.5 rounded text-sm font-medium text-primary capitalize">
                    Score: Out of 4
                  </div>
                  <div className="relative actions-dropdown">
                    <button 
                      onClick={(e) => handleActionsClick('raw-material-inspection', e)}
                      className="p-1.5 bg-white border border-zinc-200 rounded-md hover:bg-gray-50 transition-colors"
                    >
                      <MoreHorizontal className="w-4 h-4 text-gray-600" />
                    </button>
                    <ActionsDropdown
                      fieldId="raw-material-inspection"
                      isOpen={activeActionsDropdown === 'raw-material-inspection'}
                      onClose={handleCloseActions}
                      onActionSelect={handleActionSelect}
                    />
                  </div>
                </div>
              </div>

              {/* Manual Labeling */}
              <div className="bg-white border border-zinc-200 rounded-lg p-4">
                <div className="flex flex-col gap-2 mb-3">
                  <h4 className="text-sm font-medium text-primary capitalize">Manual Labeling</h4>
                  <p className="text-xs text-primary leading-5">
                    Manual labeling requires workers to physically attach labels to product components to finalize the product.
                  </p>
                </div>
                <div className="flex items-center justify-between">
                  <div className="bg-neutral-100 px-2.5 py-0.5 rounded text-sm font-medium text-primary capitalize">
                    Score: Out of 4
                  </div>
                  <div className="relative actions-dropdown">
                    <button 
                      onClick={(e) => handleActionsClick('manual-labeling', e)}
                      className="p-1.5 bg-white border border-zinc-200 rounded-md hover:bg-gray-50 transition-colors"
                    >
                      <MoreHorizontal className="w-4 h-4 text-gray-600" />
                    </button>
                    <ActionsDropdown
                      fieldId="manual-labeling"
                      isOpen={activeActionsDropdown === 'manual-labeling'}
                      onClose={handleCloseActions}
                      onActionSelect={handleActionSelect}
                    />
                  </div>
                </div>
              </div>

              {/* Phase 2 */}
              <div className="bg-white border border-zinc-200 rounded-lg py-4 px-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-base font-medium text-primary capitalize">Phase 2</h3>
                  <button className="p-1.5 bg-white border border-zinc-200 rounded-md hover:bg-gray-50 transition-colors">
                    <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <circle cx="12" cy="12" r="1"></circle>
                      <circle cx="19" cy="12" r="1"></circle>
                      <circle cx="5" cy="12" r="1"></circle>
                    </svg>
                  </button>
                </div>
              </div>

              {/* Sorting and Arranging */}
              <div className="bg-white border border-zinc-200 rounded-lg p-4">
                <div className="flex flex-col gap-2 mb-3">
                  <h4 className="text-sm font-medium text-primary capitalize">Sorting and Arranging</h4>
                  <p className="text-xs text-primary leading-5">
                    Sorting and arranging product components is a crucial step in the manual assembly process, where workers meticulously organize parts to ensure a smooth transition to creating the final product.
                  </p>
                </div>
                <div className="flex items-center justify-between">
                  <div className="bg-neutral-100 px-2.5 py-0.5 rounded text-sm font-medium text-primary capitalize">
                    Score: Out of 4
                  </div>
                  <div className="relative actions-dropdown">
                    <button 
                      onClick={(e) => handleActionsClick('sorting-and-arranging', e)}
                      className="p-1.5 bg-white border border-zinc-200 rounded-md hover:bg-gray-50 transition-colors"
                    >
                      <MoreHorizontal className="w-4 h-4 text-gray-600" />
                    </button>
                    <ActionsDropdown
                      fieldId="sorting-and-arranging"
                      isOpen={activeActionsDropdown === 'sorting-and-arranging'}
                      onClose={handleCloseActions}
                      onActionSelect={handleActionSelect}
                    />
                  </div>
                </div>
              </div>

            </div>
          </>
        ) : activeTab === 'comments' ? (
          <>
            {/* Comments Content */}
            <div className="space-y-4">
              {/* New Comment Text Box */}
              <div className="bg-white border border-zinc-200 rounded-lg p-4">
                <div className="space-y-3">
                  <label className="text-sm font-medium text-primary">Add a comment</label>
                  <textarea
                    value={newComment}
                    onChange={handleNewCommentChange}
                    placeholder="Share your thoughts about this run..."
                    className="w-full h-20 p-3 border border-zinc-200 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent transition-colors text-sm text-primary placeholder-gray-400 bg-white"
                  />
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-500">
                      {newComment.length}/500 characters
                    </span>
                    <Button
                      variant="primary"
                      size="sm"
                      className="px-4 py-2 h-8 text-sm"
                      onClick={handleAddNewComment}
                      disabled={!newComment.trim()}
                    >
                      Add Comment
                    </Button>
                  </div>
                </div>
              </div>

              {/* Existing Comments */}
              {existingComments.map((comment) => (
                <div key={comment.id} className="bg-white border border-zinc-200 rounded-lg p-4">
                  <div className="flex items-start gap-3">
                    {/* Avatar */}
                    <div className="w-8 h-8 bg-accent-light rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-sm font-medium text-accent">{comment.avatar}</span>
                    </div>
                    
                    {/* Comment Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-sm font-medium text-primary">{comment.author}</span>
                        <span className="text-xs text-gray-500">{comment.timestamp}</span>
                      </div>
                      <p className="text-sm text-gray-700 leading-relaxed">
                        {comment.content.split(/(@\w+)/g).map((part, index) => 
                          part.startsWith('@') ? (
                            <span key={index} className="text-accent font-medium cursor-pointer hover:underline">
                              {part}
                            </span>
                          ) : (
                            part
                          )
                        )}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
              
              {/* No Comments Message */}
              {existingComments.length === 0 && (
                <div className="text-center text-sm text-gray-500 py-8">
                  No comments yet. Click the comment button to add the first one.
                </div>
              )}
            </div>
          </>
        ) : (
          <div className="text-center text-sm text-gray-500 py-4">No content available</div>
        )}
      </div>

      {/* Toast Notification */}
      {showToast && (
        <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50">
          <div className="bg-primary text-white px-6 py-4 rounded-md shadow-lg flex items-center gap-4 min-w-[414px]">
            <div className="w-6 h-6 flex items-center justify-center">
              <Check className="w-5 h-5 text-white" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium">Thank you for your feedback.</p>
            </div>
            <button 
              onClick={() => setShowToast(false)}
              className="p-1 hover:bg-white/20 rounded transition-colors"
            >
              <X className="w-4 h-4 text-white" />
            </button>
          </div>
        </div>
      )}

      {/* Comment Modal */}
      <Modal
        isOpen={isCommentModalOpen}
        onClose={handleCommentCancel}
        size="custom"
        customWidth="max-w-[600px]"
        showCloseButton={false}
      >
        <div className="space-y-6">
          {/* Custom Header to match Figma */}
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold text-primary">Add Comments</h2>
              <p className="text-sm text-gray-600 mt-1">Share your thoughts about this run</p>
            </div>
            <button
              onClick={handleCommentCancel}
              className="p-1 hover:bg-gray-100 rounded-lg transition-colors"
              aria-label="Close modal"
            >
              <X className="w-5 h-5 text-gray-500" />
            </button>
          </div>

          {/* Add New Comment */}
          <div className="space-y-4">
            <div className="relative">
              <textarea
                id="comment-textarea"
                value={comment}
                onChange={handleCommentChange}
                placeholder="Type @ to mention a coworker, or share your thoughts..."
                className="w-full h-32 p-4 border border-zinc-200 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent transition-colors text-sm text-primary placeholder-gray-400 bg-white"
              />
              
              {/* @ Mention Suggestions Dropdown */}
              {showMentionSuggestions && filteredUsers.length > 0 && (
                <div 
                  className="absolute z-10 bg-white border border-zinc-200 rounded-lg shadow-lg max-h-48 overflow-y-auto"
                  style={{
                    top: `${mentionPosition.top}px`,
                    left: `${mentionPosition.left}px`,
                    minWidth: '200px'
                  }}
                >
                  {filteredUsers.slice(0, 5).map((user) => (
                    <button
                      key={user.id}
                      onClick={() => handleMentionSelect(user)}
                      className="w-full px-3 py-2 text-left hover:bg-gray-50 flex items-center gap-3 first:rounded-t-lg last:rounded-b-lg"
                    >
                      <div className="w-6 h-6 bg-accent rounded-full flex items-center justify-center flex-shrink-0">
                        <span className="text-xs font-medium text-white">{user.avatar}</span>
                      </div>
                      <div>
                        <div className="text-sm font-medium text-primary">{user.name}</div>
                        <div className="text-xs text-gray-500">@{user.username}</div>
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>
            
            {/* Character count */}
            <div className="flex justify-end">
              <span className="text-xs text-gray-400">
                {comment.length}/500 characters
              </span>
            </div>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-end gap-3" style={{ marginTop: '24px' }}>
            <Button
              variant="outline"
              size="md"
              onClick={handleCommentCancel}
              className="capitalize"
            >
              Cancel
            </Button>
            <Button
              variant="primary"
              size="md"
              onClick={handleCommentSubmit}
              className="capitalize"
              disabled={!comment.trim()}
            >
              Add Comments
            </Button>
          </div>

        </div>
      </Modal>

      {/* Tags Modal */}
      <Modal
        isOpen={isTagsModalOpen}
        onClose={handleTagsModalClose}
        size="custom"
        customWidth="max-w-[500px]"
        showCloseButton={false}
      >
        <div className="space-y-6">
          {/* Custom Header */}
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold text-primary">Manage Tags</h2>
              <p className="text-sm text-gray-600 mt-1">Add, edit, or remove tags for this run</p>
            </div>
            <button
              onClick={handleTagsModalClose}
              className="p-1 hover:bg-gray-100 rounded-lg transition-colors"
              aria-label="Close modal"
            >
              <X className="w-5 h-5 text-gray-500" />
            </button>
          </div>

          {/* Add New Tag */}
          <div className="space-y-4">
            <h3 className="text-sm font-medium text-primary capitalize">add new tag</h3>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label htmlFor="tag-key" className="block text-sm font-medium text-primary mb-2">
                  Key
                </label>
                <input
                  id="tag-key"
                  type="text"
                  value={newTagKey}
                  onChange={(e) => setNewTagKey(e.target.value)}
                  placeholder="e.g. Plant"
                  className="w-full p-3 border border-zinc-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent transition-colors text-sm text-primary placeholder-gray-400 bg-white"
                />
              </div>
              <div>
                <label htmlFor="tag-value" className="block text-sm font-medium text-primary mb-2">
                  Value
                </label>
                <input
                  id="tag-value"
                  type="text"
                  value={newTagValue}
                  onChange={(e) => setNewTagValue(e.target.value)}
                  placeholder="e.g. Plant 1"
                  className="w-full p-3 border border-zinc-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent transition-colors text-sm text-primary placeholder-gray-400 bg-white"
                />
              </div>
            </div>
            <div className="flex justify-end">
              <Button
                variant="primary"
                size="sm"
                onClick={handleAddTag}
                className="capitalize"
                disabled={!newTagKey.trim() || !newTagValue.trim()}
              >
                Add Tag
              </Button>
            </div>
          </div>

          {/* Existing Tags */}
          <div className="space-y-4">
            <h3 className="text-sm font-medium text-primary capitalize">existing tags</h3>
            {tags.length > 0 ? (
              <div className="space-y-2">
                {tags.map((tag) => (
                  <div key={tag.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium text-primary">{tag.key}:</span>
                      <span className="text-sm text-gray-700">{tag.value}</span>
                    </div>
                    <button
                      onClick={() => handleDeleteTag(tag.id)}
                      className="p-1 hover:bg-gray-200 rounded transition-colors"
                      aria-label={`Delete ${tag.key} tag`}
                    >
                      <X className="w-4 h-4 text-gray-500" />
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-gray-500 text-center py-4">No tags added yet</p>
            )}
          </div>

          {/* Footer */}
          <div className="flex items-center justify-end" style={{ marginTop: '24px' }}>
            <Button
              variant="outline"
              size="md"
              onClick={handleTagsModalClose}
              className="capitalize"
            >
              Done
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  )
}

