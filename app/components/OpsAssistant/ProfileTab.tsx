'use client'

import { useState } from 'react'
import { 
  Info, 
  Plus, 
  Mail, 
  Edit3,
  ChevronRight,
  User,
  Settings,
  Camera,
  X,
  Trash2,
  Clock,
  Calendar
} from 'lucide-react'
import { Card } from '@spotai/design-system'

export default function ProfileTab() {
  const [runMode, setRunMode] = useState('automatic')
  const [isEditGoalModalOpen, setIsEditGoalModalOpen] = useState(false)
  const [isReferenceImageModalOpen, setIsReferenceImageModalOpen] = useState(false)
  
  // Scheduled settings state
  const [scheduleFrequency, setScheduleFrequency] = useState('daily')
  const [scheduleTime, setScheduleTime] = useState('09:00')
  const [selectedDays, setSelectedDays] = useState(['monday', 'tuesday', 'wednesday', 'thursday', 'friday'])
  const [scheduleInterval, setScheduleInterval] = useState('1')

  const daysOfWeek = [
    { key: 'monday', label: 'Mon' },
    { key: 'tuesday', label: 'Tue' },
    { key: 'wednesday', label: 'Wed' },
    { key: 'thursday', label: 'Thu' },
    { key: 'friday', label: 'Fri' },
    { key: 'saturday', label: 'Sat' },
    { key: 'sunday', label: 'Sun' }
  ]

  const toggleDay = (day: string) => {
    setSelectedDays(prev => 
      prev.includes(day) 
        ? prev.filter(d => d !== day)
        : [...prev, day]
    )
  }

  return (
    <div className="flex h-full">
      {/* Main Content Area */}
      <div className="flex-1 p-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Left Column - Agent Details */}
          <div className="lg:col-span-1">
            <Card className="p-4">
              <div className="aspect-square bg-gray-100 rounded-lg mb-4 flex items-center justify-center">
                <div className="w-16 h-16 bg-accent rounded-lg flex items-center justify-center">
                  <User className="w-8 h-8 text-white" />
                </div>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-primary mb-2 block">Name</label>
                  <div className="bg-white border border-zinc-200 rounded-md p-3">
                    <span className="text-sm text-primary">SOP Changeover Assistant</span>
                  </div>
                </div>
                
                <div>
                  <label className="text-sm font-medium text-primary mb-2 block">Date Created</label>
                  <div className="bg-white border border-zinc-200 rounded-md p-3">
                    <span className="text-sm text-primary">05/04/2025</span>
                  </div>
                </div>
                
                <div>
                  <label className="text-sm font-medium text-primary mb-2 block">Created by</label>
                  <div className="bg-white border border-zinc-200 rounded-md p-3">
                    <span className="text-sm text-primary">John smith</span>
                  </div>
                </div>
                
                <button className="text-sm font-medium text-accent hover:text-accent-hover transition-colors capitalize">
                  edit
                </button>
              </div>
            </Card>
            
                        {/* Advanced Settings */}
            <div className="pt-4">
              <Card className="p-4">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <h3 className="text-sm font-medium text-primary">Advanced Settings</h3>
                    <Info className="w-4 h-4 text-gray-400" />
                  </div>
                  <button className="text-sm font-medium text-accent hover:text-accent-hover transition-colors capitalize">
                    edit
                  </button>
                </div>
              </Card>
            </div>
          </div>
          
          {/* Middle Column - Settings */}
          <div className="lg:col-span-1 space-y-6">
            
            {/* Assistant Goal */}
            <Card className="p-4">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-2">
                  <h3 className="text-sm font-medium text-primary">Assistant Goal</h3>
                  <Info className="w-4 h-4 text-gray-400" />
                </div>
                <button 
                  onClick={() => setIsEditGoalModalOpen(true)}
                  className="text-sm font-medium text-accent hover:text-accent-hover transition-colors capitalize"
                >
                  edit
                </button>
              </div>
              
              <div className="bg-white border border-zinc-200 rounded-md p-3 mb-4">
                <p className="text-sm text-primary leading-relaxed">
                  Identify, quantify (frequency and duration), and report on human touches within manufacturing processes using video footage. The ultimate aim of this analysis is to provide data-driven insights that enable user to effectively prioritize areas for potential automation.
                </p>
                <br />
                <p className="text-sm text-primary leading-relaxed">
                  This comprehensive analysis involves systematically capturing instances where human operators interact with machinery, equipment, or products, and then assessing the frequency, duration, and context of each touchpoint.
                </p>
              </div>
            </Card>
            
            {/* Upload Docs */}
            <Card className="p-4">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-2">
                  <h3 className="text-sm font-medium text-primary">Upload Docs</h3>
                  <Info className="w-4 h-4 text-gray-400" />
                </div>
                <button className="text-sm font-medium text-accent hover:text-accent-hover transition-colors capitalize">
                  edit
                </button>
              </div>
              
              <div className="bg-neutral-100 border border-zinc-200 rounded-lg p-4 flex items-center gap-3">
                <div className="w-4 h-4 bg-gray-400 rounded"></div>
                <span className="text-sm font-medium text-primary">SOPGuidelines.pdf</span>
              </div>
            </Card>
            
            {/* Reference Images */}
            <Card className="p-4">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-2">
                  <h3 className="text-sm font-medium text-primary">Reference Images</h3>
                  <Info className="w-4 h-4 text-gray-400" />
                </div>
                <button 
                  onClick={() => setIsReferenceImageModalOpen(true)}
                  className="text-sm font-medium text-accent hover:text-accent-hover transition-colors capitalize"
                >
                  edit
                </button>
              </div>
              
              <div className="w-40 h-24 bg-gray-200 rounded-md flex items-center justify-center">
                <Camera className="w-6 h-6 text-gray-400" />
              </div>
            </Card>
          </div>
          
          {/* Right Column - Additional Settings */}
          <div className="lg:col-span-1 space-y-6">
            
            {/* Run Settings */}
            <Card className="p-6">
              <div className="flex items-start justify-between mb-6">
                <div className="flex items-center gap-2">
                  <h3 className="text-sm font-medium text-primary">Run Settings</h3>
                  <Info className="w-4 h-4 text-gray-400" />
                </div>
                <button className="text-sm font-medium text-accent hover:text-accent-hover transition-colors capitalize">
                  edit
                </button>
              </div>
              
              <div className="space-y-6">
                {/* Run Mode Toggle */}
                <div className="bg-white border border-zinc-200 rounded-md p-1.5">
                  <div className="flex gap-1">
                    <button
                      onClick={() => setRunMode('manual')}
                      className={`px-3 py-1.5 rounded-sm text-sm font-medium transition-colors ${
                        runMode === 'manual' 
                          ? 'bg-accent text-white' 
                          : 'text-gray-600 hover:text-primary'
                      }`}
                    >
                      Manual
                    </button>
                    <button
                      onClick={() => setRunMode('automatic')}
                      className={`px-3 py-1.5 rounded-sm text-sm font-medium transition-colors ${
                        runMode === 'automatic' 
                          ? 'bg-accent text-white' 
                          : 'text-gray-600 hover:text-primary'
                      }`}
                    >
                      Automatic
                    </button>
                    <button
                      onClick={() => setRunMode('scheduled')}
                      className={`px-3 py-1.5 rounded-sm text-sm font-medium transition-colors ${
                        runMode === 'scheduled' 
                          ? 'bg-accent text-white' 
                          : 'text-gray-600 hover:text-primary'
                      }`}
                    >
                      Scheduled
                    </button>
                  </div>
                </div>

                {/* Scheduled Settings */}
                {runMode === 'scheduled' && (
                  <div className="space-y-4">
                    {/* Frequency */}
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-primary capitalize">frequency</label>
                      <div className="bg-white border border-zinc-200 rounded-md p-1.5">
                        <div className="flex gap-1">
                          <button
                            onClick={() => setScheduleFrequency('daily')}
                            className={`px-3 py-1.5 rounded-sm text-sm font-medium transition-colors ${
                              scheduleFrequency === 'daily' 
                                ? 'bg-accent text-white' 
                                : 'text-gray-600 hover:text-primary'
                            }`}
                          >
                            Daily
                          </button>
                          <button
                            onClick={() => setScheduleFrequency('weekly')}
                            className={`px-3 py-1.5 rounded-sm text-sm font-medium transition-colors ${
                              scheduleFrequency === 'weekly' 
                                ? 'bg-accent text-white' 
                                : 'text-gray-600 hover:text-primary'
                            }`}
                          >
                            Weekly
                          </button>
                          <button
                            onClick={() => setScheduleFrequency('monthly')}
                            className={`px-3 py-1.5 rounded-sm text-sm font-medium transition-colors ${
                              scheduleFrequency === 'monthly' 
                                ? 'bg-accent text-white' 
                                : 'text-gray-600 hover:text-primary'
                            }`}
                          >
                            Monthly
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Time */}
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-primary capitalize">time</label>
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-gray-400" />
                        <input
                          type="time"
                          value={scheduleTime}
                          onChange={(e) => setScheduleTime(e.target.value)}
                          className="bg-white border border-zinc-200 rounded-md px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
                        />
                      </div>
                    </div>

                    {/* Days of Week (for weekly frequency) */}
                    {scheduleFrequency === 'weekly' && (
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-primary capitalize">days of week</label>
                        <div className="flex gap-1">
                          {daysOfWeek.map((day) => (
                            <button
                              key={day.key}
                              onClick={() => toggleDay(day.key)}
                              className={`px-2 py-1 rounded text-xs font-medium transition-colors ${
                                selectedDays.includes(day.key)
                                  ? 'bg-accent text-white'
                                  : 'bg-white border border-zinc-200 text-gray-600 hover:text-primary'
                              }`}
                            >
                              {day.label}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Interval (for monthly frequency) */}
                    {scheduleFrequency === 'monthly' && (
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-primary capitalize">day of month</label>
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4 text-gray-400" />
                          <select
                            value={scheduleInterval}
                            onChange={(e) => setScheduleInterval(e.target.value)}
                            className="bg-white border border-zinc-200 rounded-md px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
                          >
                            {Array.from({ length: 28 }, (_, i) => i + 1).map((day) => (
                              <option key={day} value={day}>
                                {day}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>
                    )}

                    {/* Schedule Summary */}
                    <div className="bg-accent-light border border-accent rounded-md p-3">
                      <p className="text-sm text-primary">
                        {scheduleFrequency === 'daily' && `Runs daily at ${scheduleTime}`}
                        {scheduleFrequency === 'weekly' && `Runs weekly on ${selectedDays.map(day => daysOfWeek.find(d => d.key === day)?.label).join(', ')} at ${scheduleTime}`}
                        {scheduleFrequency === 'monthly' && `Runs monthly on day ${scheduleInterval} at ${scheduleTime}`}
                      </p>
                    </div>
                  </div>
                )}
                
                {/* Activator Agents */}
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <h4 className="text-sm font-medium text-primary">Activator Agents</h4>
                    <Info className="w-4 h-4 text-gray-400" />
                  </div>
                  <div className="bg-white border border-zinc-200 rounded-lg p-3 flex items-center gap-3">
                    <div className="w-4 h-4 bg-accent rounded"></div>
                    <span className="text-sm font-medium text-primary">Human Touch Monitor</span>
                  </div>
                </div>
                
                {/* Deactivator Agents */}
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <h4 className="text-sm font-medium text-primary">Deactivator Agents</h4>
                    <Info className="w-4 h-4 text-gray-400" />
                  </div>
                  <div className="bg-white border border-zinc-200 rounded-lg p-3 flex items-center gap-3">
                    <div className="w-4 h-4 bg-accent rounded"></div>
                    <span className="text-sm font-medium text-primary">Workflow Analysis</span>
                  </div>
                </div>
              </div>
            </Card>
            
            {/* Actions */}
            <Card className="p-6">
              <div className="flex items-start justify-between mb-6">
                <div className="flex items-center gap-2">
                  <h3 className="text-sm font-medium text-primary">Actions</h3>
                  <Info className="w-4 h-4 text-gray-400" />
                </div>
                <button className="text-sm font-medium text-accent hover:text-accent-hover transition-colors capitalize">
                  edit
                </button>
              </div>
              
              <div className="bg-white border border-zinc-200 rounded-lg p-3 flex items-center gap-3">
                <Mail className="w-4 h-4 text-primary" />
                <span className="text-sm font-medium text-primary">Send Email to John</span>
              </div>
            </Card>
            
            {/* Cameras */}
            <Card className="p-4">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-2">
                  <h3 className="text-sm font-medium text-primary">Cameras</h3>
                  <Info className="w-4 h-4 text-gray-400" />
                </div>
                <button className="text-sm font-medium text-accent hover:text-accent-hover transition-colors capitalize">
                  edit
                </button>
              </div>
              
              <div className="grid grid-cols-2 gap-2">
                <div className="h-24 bg-gray-200 rounded flex items-center justify-center">
                  <Camera className="w-6 h-6 text-gray-400" />
                </div>
                <div className="h-24 bg-gray-200 rounded flex items-center justify-center">
                  <Camera className="w-6 h-6 text-gray-400" />
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>

      {/* Edit Goal Modal */}
      {isEditGoalModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setIsEditGoalModalOpen(false)}
          />
          
          {/* Modal */}
          <div className="relative bg-white rounded-lg shadow-xl w-full max-w-2xl mx-4">
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-primary">Edit Assistant Goal</h2>
              <button
                onClick={() => setIsEditGoalModalOpen(false)}
                className="p-1 hover:bg-gray-100 rounded-lg transition-colors"
                aria-label="Close modal"
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>
            
            {/* Content */}
            <div className="p-6">
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-primary mb-2 block">Assistant Goal</label>
                  <textarea
                    className="w-full h-32 p-3 border border-zinc-200 rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
                    placeholder="Enter the assistant goal..."
                    defaultValue="Identify, quantify (frequency and duration), and report on human touches within manufacturing processes using video footage. The ultimate aim of this analysis is to provide data-driven insights that enable user to effectively prioritize areas for potential automation.

This comprehensive analysis involves systematically capturing instances where human operators interact with machinery, equipment, or products, and then assessing the frequency, duration, and context of each touchpoint."
                  />
                </div>
                
                <div className="flex justify-end gap-3 pt-4">
                  <button
                    onClick={() => setIsEditGoalModalOpen(false)}
                    className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-primary transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => setIsEditGoalModalOpen(false)}
                    className="px-4 py-2 text-sm font-medium bg-accent text-white rounded-md hover:bg-accent-hover transition-colors"
                  >
                    Save Changes
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Reference Image Modal */}
      {isReferenceImageModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-6">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setIsReferenceImageModalOpen(false)}
          />
          
          {/* Modal */}
          <div className="relative bg-white rounded-lg shadow-xl w-full max-w-5xl mx-4 max-h-[90vh] overflow-auto">
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-zinc-200">
              <h2 className="text-base font-medium text-primary capitalize">annotate your reference image</h2>
              <button
                onClick={() => setIsReferenceImageModalOpen(false)}
                className="p-1 hover:bg-gray-100 rounded-lg transition-colors opacity-70"
                aria-label="Close modal"
              >
                <X className="w-4 h-4 text-primary" />
              </button>
            </div>
            
            {/* Description */}
            <div className="px-6 pt-4">
              <p className="text-sm text-gray-600 leading-5">
                Annotate your reference image so that the operator can better understand it.
              </p>
            </div>
            
            {/* Content */}
            <div className="p-6 flex gap-4">
              {/* Left Panel - Form */}
              <div className="w-[271px] flex flex-col h-full">
                <div className="flex-1 overflow-y-auto space-y-4">
                  {/* Image Title */}
                  <div className="space-y-1.5">
                    <div className="flex items-center">
                      <label className="text-sm font-medium text-primary capitalize">image title</label>
                      <div className="pl-2">
                        <Info className="w-4 h-4 text-gray-400" />
                      </div>
                    </div>
                    <div className="bg-white border border-zinc-200 rounded-md p-3">
                      <span className="text-sm text-gray-600">Factory floor with multiple stations</span>
                    </div>
                  </div>
                  
                  {/* Image Description */}
                  <div className="space-y-1.5">
                    <div className="flex items-center">
                      <label className="text-sm font-medium text-primary capitalize">Image Description</label>
                      <div className="pl-2">
                        <Info className="w-4 h-4 text-gray-400" />
                      </div>
                    </div>
                    <div className="bg-white border border-zinc-200 rounded-md p-3 h-20 overflow-y-auto">
                      <p className="text-sm text-gray-600 leading-5">
                        Each station is equipped with machinery and tools, and workers are actively engaged in assembly and inspection tasks. Overhead conveyor belts transport materials between stations, while digital screens display operational metrics and safety guidelines. The atmosphere is structured and organized, emphasizing precision and efficiency in production.
                      </p>
                    </div>
                  </div>
                  
                  {/* Marks */}
                  <div className="space-y-2">
                    <div className="flex items-center">
                      <label className="text-sm font-medium text-primary capitalize">marks</label>
                      <div className="pl-2">
                        <Info className="w-4 h-4 text-gray-400" />
                      </div>
                    </div>
                    
                    {/* Mark Items */}
                    <div className="space-y-2">
                      <div className="bg-white border border-zinc-200 rounded-md p-3 flex items-center justify-between h-10">
                        <span className="text-xs font-semibold text-primary capitalize">person in PPE</span>
                        <Edit3 className="w-4 h-4 text-gray-400 opacity-50" />
                      </div>
                      
                      <div className="bg-white border border-zinc-200 rounded-md p-3 flex items-center justify-between h-10">
                        <span className="text-xs font-semibold text-primary capitalize">white fridge</span>
                        <Edit3 className="w-4 h-4 text-gray-400 opacity-50" />
                      </div>
                      
                      <div className="bg-white border border-zinc-200 rounded-md p-3 flex items-center justify-between h-10">
                        <span className="text-xs font-semibold text-primary capitalize">ceiling light</span>
                        <Edit3 className="w-4 h-4 text-gray-400 opacity-50" />
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Action Buttons */}
                <div className="mt-4 space-y-2">
                  <button className="w-full bg-primary text-white px-4 py-2 rounded-lg text-sm font-medium capitalize hover:bg-primary-hover transition-colors">
                    save image
                  </button>
                  <button className="w-full bg-white border border-zinc-200 text-red-600 px-4 py-2 rounded-lg text-sm font-medium capitalize hover:bg-gray-50 transition-colors flex items-center justify-center gap-2">
                    <Trash2 className="w-4 h-4" />
                    delete image
                  </button>
                </div>
              </div>
              
              {/* Right Panel - Image */}
              <div className="flex-1 space-y-2.5">
                <div className="flex-1 bg-gray-200 rounded-md relative overflow-hidden min-h-[400px] bg-cover bg-center" 
                     style={{backgroundImage: "url('https://images.unsplash.com/photo-1565515636369-8806ba0b2139?w=800&h=600&fit=crop')"}}>
                  {/* Annotation Points */}
                  <div className="absolute top-6 left-16 w-[22px] h-[22px] bg-accent border-2 border-white rounded-full"></div>
                  <div className="absolute top-[207px] left-[528px] w-[22px] h-[22px] bg-accent-hover border-2 border-white rounded-full"></div>
                  <div className="absolute top-[178px] left-[115px] w-[22px] h-[22px] bg-accent border-2 border-white rounded-full"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
} 