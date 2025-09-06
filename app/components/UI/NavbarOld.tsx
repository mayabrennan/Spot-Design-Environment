'use client'

import { useState } from 'react'
import { Sparkles } from 'lucide-react' // Import Sparkles icon

interface NavbarOldProps {
  currentPage?: string
  onPageClick?: (page: string) => void
  onIrisToggle?: () => void // Added for Iris button
}

export default function NavbarOld({ currentPage = 'operations', onPageClick, onIrisToggle }: NavbarOldProps) {
  const [mainNavActive, setMainNavActive] = useState('operations')
  const [subNavActive, setSubNavActive] = useState('operations')

  const handlePageClick = (page: string) => {
    if (onPageClick) {
      onPageClick(page)
    }
  }

  const handleMainNavClick = (page: string) => {
    setMainNavActive(page)
    if (page === 'ai-ops-assistants') {
      handleSubNavClick('operations') // Default to 'Assistants' when AI Ops Assistants is clicked
    } else {
      handlePageClick(page)
    }
  }

  const handleSubNavClick = (page: string) => {
    setSubNavActive(page)
    handlePageClick(page)
  }

  return (
    <div className="flex flex-col w-full bg-white">
      {/* Main Navigation */}
      <div className="backdrop-blur-[25px] backdrop-filter bg-white/80 border-b border-zinc-200 relative">
        <div className="flex items-center justify-between px-4 py-0 h-14">
          {/* Left Section - Logo and Main Nav */}
          <div className="flex items-center gap-[62px]">
            {/* SpotAI Logo */}
            <div className="h-6 w-[95px] flex items-center">
              <img 
                src="/images/spot ai logo black.png" 
                alt="SpotAI" 
                className="h-6 w-auto"
              />
            </div>
            
            {/* Main Navigation Items */}
            <div className="flex items-end">
              <button
                onClick={() => handleMainNavClick('monitor')}
                disabled
                className={`px-6 py-3.5 text-sm capitalize transition-colors ${
                  mainNavActive === 'monitor' 
                    ? 'text-primary font-semibold' 
                    : 'text-gray-400 cursor-not-allowed font-normal'
                }`}
              >
                Monitor
              </button>
              <button
                onClick={() => handleMainNavClick('investigate')}
                disabled
                className={`px-6 py-3.5 text-sm capitalize transition-colors ${
                  mainNavActive === 'investigate' 
                    ? 'text-primary font-semibold' 
                    : 'text-gray-400 cursor-not-allowed font-normal'
                }`}
              >
                Investigate
              </button>
              <button
                onClick={() => handleMainNavClick('ai-agents')}
                disabled
                className={`px-6 py-3.5 text-sm capitalize transition-colors ${
                  mainNavActive === 'ai-agents' 
                    ? 'text-primary font-semibold' 
                    : 'text-gray-400 cursor-not-allowed font-normal'
                }`}
              >
                AI Agents
              </button>
              <button
                onClick={() => handleMainNavClick('operations')}
                className={`px-6 py-3.5 text-sm capitalize transition-colors ${
                  mainNavActive === 'operations'
                    ? 'text-primary font-semibold' 
                    : 'text-primary hover:text-accent-hover font-normal'
                }`}
              >
                AI Ops Assistants
              </button>
              <button
                onClick={() => handleMainNavClick('admin')}
                disabled
                className={`px-6 py-3.5 text-sm capitalize transition-colors ${
                  mainNavActive === 'admin' 
                    ? 'text-primary font-semibold' 
                    : 'text-gray-400 cursor-not-allowed font-normal'
                }`}
              >
                Admin
              </button>
            </div>
          </div>

          {/* Right Section - Help, Feedback, What's New, Ask Iris, Avatar */}
          <div className="flex items-center gap-[13px]">
            <button className="text-xs font-normal text-primary capitalize hover:text-accent-hover transition-colors">
              Help
            </button>
            <div className="w-px h-1.5 bg-primary rotate-90"></div>
            <button className="text-xs font-normal text-primary capitalize hover:text-accent-hover transition-colors">
              Feedback
            </button>
            <div className="w-px h-1.5 bg-primary rotate-90"></div>
            <button className="text-xs font-normal text-primary capitalize hover:text-accent-hover transition-colors">
              What&apos;s new
            </button>
            <div className="w-8 h-8 border border-primary rounded-md flex items-center justify-center">
              <span className="text-xs font-normal text-primary">CN</span>
            </div>
            
            {/* Ask Iris AI Button */}
            <div 
              className="bg-accent-light flex items-center gap-2 px-5 py-2 rounded-lg cursor-pointer hover:bg-accent transition-colors group"
              onClick={onIrisToggle}
            >
              <Sparkles className="w-4 h-4 text-accent group-hover:text-white transition-colors" />
              <span className="capitalize font-medium text-sm text-accent group-hover:text-white transition-colors">
                ask Iris AI
              </span>
            </div>
          </div>
        </div>
        
        {/* Purple Line - Absolutely positioned at the bottom with no padding - All aligned consistently */}
        {mainNavActive === 'monitor' && (
          <div className="absolute bottom-[-1px] left-[181px] w-[76px] h-0.5 bg-accent-hover" />
        )}
        {mainNavActive === 'investigate' && (
          <div className="absolute bottom-[-1px] left-[257px] w-[90px] h-0.5 bg-accent-hover" />
        )}
        {mainNavActive === 'ai-agents' && (
          <div className="absolute bottom-[-1px] left-[347px] w-[88px] h-0.5 bg-accent-hover" />
        )}
        {mainNavActive === 'operations' && (
          <div className="absolute bottom-[-1px] left-[519px] w-[138px] h-0.5 bg-accent-hover" />
        )}
        {mainNavActive === 'admin' && (
          <div className="absolute bottom-[-1px] left-[677px] w-[64px] h-0.5 bg-accent-hover" />
        )}
      </div>

      {/* Sub Navigation - Always visible with toggle group design */}
      <div className="backdrop-blur-[25px] backdrop-filter bg-white/80 border-b border-zinc-200">
        <div className="flex items-center gap-3 pl-[430px] pr-0 py-1">
          <div className="flex items-center gap-3">
            {/* Assistants Button */}
            <button
              onClick={() => handleSubNavClick('operations')}
              className={`px-6 py-2.5 text-sm rounded capitalize transition-colors ${
                subNavActive === 'operations'
                  ? 'bg-neutral-100 text-primary font-medium'
                  : 'text-primary font-normal hover:bg-neutral-100'
              }`}
            >
              Assistants
            </button>
            
            {/* Analytics Button */}
            <button
              onClick={() => handleSubNavClick('analytics')}
              className={`px-6 py-2.5 text-sm rounded capitalize transition-colors ${
                subNavActive === 'analytics'
                  ? 'bg-neutral-100 text-primary font-medium'
                  : 'text-primary font-normal hover:bg-neutral-100'
              }`}
            >
              Analytics
            </button>
            
            {/* Iris Button */}
            <button
              onClick={() => handleSubNavClick('iris')}
              className={`px-6 py-2.5 text-sm rounded capitalize transition-colors ${
                subNavActive === 'iris'
                  ? 'bg-neutral-100 text-primary font-medium'
                  : 'text-primary font-normal hover:bg-neutral-100'
              }`}
            >
              Iris
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
