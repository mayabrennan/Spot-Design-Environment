import React, { useState } from 'react'
import { cn } from '../utils/classNames'
import { BarChart3, Trash2 } from 'lucide-react'
import Button from './Button'
import Input from './Input'
import Modal from './Modal'
import Dropdown from './Dropdown'

export interface ChartWidgetConfig {
  title: string
  irisPrompt: string
  actions: {
    email: string
    recipient: string
  }
  schedule: {
    frequency: string
    day: string
    time: string
  }
}

export interface ChartWidgetDialogProps {
  isOpen: boolean
  onClose: () => void
  onSave: (config: ChartWidgetConfig) => void
  onDelete: () => void
  className?: string
}

const ChartWidgetDialog: React.FC<ChartWidgetDialogProps> = ({
  isOpen,
  onClose,
  onSave,
  onDelete,
  className
}) => {
  const [config, setConfig] = useState<ChartWidgetConfig>({
    title: 'Car Wash Report',
    irisPrompt: 'area chart of results',
    actions: {
      email: 'email',
      recipient: 'john@gmail.com'
    },
    schedule: {
      frequency: 'weekly',
      day: 'monday',
      time: '9am'
    }
  })

  const handleSave = () => {
    onSave(config)
    onClose()
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="custom" customWidth="w-[600px]" showCloseButton={false}>
      {/* Header */}
      <div className="flex items-start justify-between mb-6">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <h2 className="text-base font-medium text-primary capitalize">chart widget</h2>
          </div>
          <p className="text-sm text-gray-600">This is a charts widget.</p>
        </div>
        <div className="bg-accent p-2.5 rounded-lg flex-shrink-0">
          <BarChart3 className="w-4 h-4 text-white" />
        </div>
      </div>

      {/* Content */}
      <div className="space-y-6">
          {/* Widget Title */}
          <div className="space-y-1.5">
            <label className="text-sm font-medium text-primary capitalize block">widget title</label>
            <Input
              value={config.title}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setConfig({ ...config, title: e.target.value })}
              placeholder="Enter widget title"
              className="w-full"
            />
          </div>

          {/* Iris Prompt */}
          <div className="space-y-1.5">
            <label className="text-sm font-medium text-primary capitalize block">iris prompt</label>
            <Input
              value={config.irisPrompt}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setConfig({ ...config, irisPrompt: e.target.value })}
              placeholder="Enter iris prompt"
              className="w-full bg-gray-50"
            />
          </div>

          {/* Actions */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-primary capitalize block">actions</label>
            <div className="grid grid-cols-2 gap-2">
              <Dropdown
                trigger={
                  <span className="text-sm text-primary capitalize">
                    {config.actions.email}
                  </span>
                }
                items={[
                  { label: 'email', value: 'email' },
                  { label: 'sms', value: 'sms' },
                  { label: 'notification', value: 'notification' }
                ]}
                onSelect={(item) => setConfig({
                  ...config,
                  actions: { ...config.actions, email: item.value }
                })}
                size="sm"
              />
              <Dropdown
                trigger={
                  <span className="text-sm text-primary capitalize">
                    {config.actions.recipient}
                  </span>
                }
                items={[
                  { label: 'john@gmail.com', value: 'john@gmail.com' },
                  { label: 'jane@gmail.com', value: 'jane@gmail.com' },
                  { label: 'team@company.com', value: 'team@company.com' }
                ]}
                onSelect={(item) => setConfig({
                  ...config,
                  actions: { ...config.actions, recipient: item.value }
                })}
                size="sm"
              />
            </div>
          </div>

          {/* Schedule */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-primary capitalize block">schedule</label>
            <div className="grid grid-cols-3 gap-2">
              <Dropdown
                trigger={
                  <span className="text-sm text-primary capitalize">
                    {config.schedule.frequency}
                  </span>
                }
                items={[
                  { label: 'daily', value: 'daily' },
                  { label: 'weekly', value: 'weekly' },
                  { label: 'monthly', value: 'monthly' }
                ]}
                onSelect={(item) => setConfig({
                  ...config,
                  schedule: { ...config.schedule, frequency: item.value }
                })}
                size="sm"
              />
              <Dropdown
                trigger={
                  <span className="text-sm text-primary capitalize">
                    {config.schedule.day}
                  </span>
                }
                items={[
                  { label: 'monday', value: 'monday' },
                  { label: 'tuesday', value: 'tuesday' },
                  { label: 'wednesday', value: 'wednesday' },
                  { label: 'thursday', value: 'thursday' },
                  { label: 'friday', value: 'friday' }
                ]}
                onSelect={(item) => setConfig({
                  ...config,
                  schedule: { ...config.schedule, day: item.value }
                })}
                size="sm"
              />
              <Dropdown
                trigger={
                  <span className="text-sm text-primary capitalize">
                    {config.schedule.time}
                  </span>
                }
                items={[
                  { label: '9am', value: '9am' },
                  { label: '12pm', value: '12pm' },
                  { label: '3pm', value: '3pm' },
                  { label: '6pm', value: '6pm' }
                ]}
                onSelect={(item) => setConfig({
                  ...config,
                  schedule: { ...config.schedule, time: item.value }
                })}
                size="sm"
              />
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between pt-6 border-t border-zinc-200">
          <Button
            variant="outline"
            onClick={onDelete}
            className="border-red-600 text-red-600 hover:bg-red-50"
          >
            <Trash2 className="w-4 h-4 mr-2" />
            delete
          </Button>
          
          <div className="flex items-center gap-2">
            <Button variant="outline" onClick={onClose}>
              cancel
            </Button>
            <Button variant="primary" onClick={handleSave}>
              save
            </Button>
          </div>
        </div>
      </Modal>
    )
}

export default ChartWidgetDialog 
 
 
 
 
 
 