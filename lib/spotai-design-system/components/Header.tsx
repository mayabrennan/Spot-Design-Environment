'use client'

import { Sparkles, Menu } from 'lucide-react'
import { Button, SearchInput, Avatar } from '@spotai/design-system'

interface HeaderProps {
  onSidebarToggle?: () => void
  onIrisToggle?: () => void
}

export default function Header({ onSidebarToggle, onIrisToggle }: HeaderProps) {
  return (
    <header className="bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between">
      {/* Left Section */}
      <div className="flex items-center gap-4">
        {/* Logo/Brand */}
        <div className="flex items-center">
          <span className="font-semibold text-lg text-primary">SpotAI</span>
        </div>
      </div>

      {/* Center Section - Search Bar */}
      <div className="flex-1 max-w-2xl mx-8">
        <SearchInput
          placeholder="Search"
          size="md"
        />
      </div>

      {/* Right Section - Navigation Components */}
      <div className="flex items-center gap-[13px]">
        {/* Help Link */}
        <a 
          href="#" 
          className="capitalize font-normal text-xs text-primary hover:text-gray-600 transition-colors"
        >
          Help
        </a>

        {/* Vertical Separator */}
        <div className="w-0 h-0 flex items-center justify-center">
          <div className="w-1.5 h-0 border-l border-primary rotate-90"></div>
        </div>

        {/* Feedback Link */}
        <a 
          href="#" 
          className="capitalize font-normal text-xs text-primary hover:text-gray-600 transition-colors"
        >
          feedback
        </a>

        {/* Vertical Separator */}
        <div className="w-0 h-0 flex items-center justify-center">
          <div className="w-1.5 h-0 border-l border-primary rotate-90"></div>
        </div>

        {/* What's New Link */}
        <a 
          href="#" 
          className="capitalize font-normal text-xs text-primary hover:text-gray-600 transition-colors"
        >
                          What&apos;s new
        </a>

        {/* Avatar */}
        <div className="w-8 h-8 border border-primary rounded-md flex items-center justify-center bg-white">
          <span className="font-semibold text-xs text-primary">
            CN
          </span>
        </div>

        {/* AI Assistant Button - Updated to match Figma hover state */}
        <div 
          className="bg-accent-light flex items-center gap-2 px-5 py-3 rounded-lg cursor-pointer hover:bg-accent transition-colors group"
          onClick={onIrisToggle}
        >
          <Sparkles className="w-4 h-4 text-accent group-hover:text-white transition-colors" />
          <span className="capitalize font-medium text-sm text-accent group-hover:text-white transition-colors">
            ask Iris AI
          </span>
        </div>
      </div>
    </header>
  )
} 