'use client'

import { ChevronRight } from 'lucide-react'
import { Button } from '@spotai/design-system'
import Image from 'next/image'

interface PageHeaderProps {
  breadcrumbs?: Array<{
    label: string
    href?: string
    active?: boolean
  }>
  title: string
  subtitle?: string
  avatar?: {
    src: string
    alt: string
    size?: number
  }
  actions?: React.ReactNode
  className?: string
}

export default function PageHeader({
  breadcrumbs = [],
  title,
  subtitle,
  avatar,
  actions,
  className = ''
}: PageHeaderProps) {
  return (
    <div className={`bg-white border-b border-zinc-200 px-6 py-4 ${className}`}>
      {/* Breadcrumbs */}
      {breadcrumbs.length > 0 && (
        <div className="flex items-center gap-2 text-sm text-gray-600 mb-4">
          {breadcrumbs.map((crumb, index) => (
            <div key={index} className="flex items-center gap-2">
              {index > 0 && <ChevronRight className="w-4 h-4" />}
              <span className={crumb.active ? 'text-primary font-medium' : ''}>
                {crumb.label}
              </span>
            </div>
          ))}
        </div>
      )}

      {/* Header Content */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          {avatar && (
            <div className="w-12 h-12 bg-accent-light rounded-lg flex items-center justify-center">
              <Image 
                src={avatar.src} 
                alt={avatar.alt} 
                width={avatar.size || 48} 
                height={avatar.size || 48}
                className="w-full h-full object-cover rounded-lg"
              />
            </div>
          )}
          <div>
            <h1 className="text-xl font-semibold text-primary">{title}</h1>
            {subtitle && (
              <p className="text-sm text-gray-600">{subtitle}</p>
            )}
          </div>
        </div>
        {actions && (
          <div className="flex items-center gap-3">
            {actions}
          </div>
        )}
      </div>
    </div>
  )
}
