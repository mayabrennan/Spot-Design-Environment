import React from 'react'
import Image from 'next/image'
import Card from './Card'
import Button from './Button'
import { User } from 'lucide-react'

export interface AssistantCardProps {
  id: number
  name: string
  description: string
  image?: string
  isClickable?: boolean
  onClick?: () => void
  className?: string
}

export default function AssistantCard({
  id,
  name,
  description,
  image,
  isClickable = false,
  onClick,
  className = ''
}: AssistantCardProps) {
  return (
    <Card 
      className={`p-4 flex flex-col ${
        isClickable ? 'cursor-pointer hover:border-accent hover:border-2 transition-colors' : ''
      } ${className}`}
      onClick={onClick}
    >
      {/* Assistant Image */}
      <div className="aspect-square bg-accent-light rounded-lg mb-4 flex items-center justify-center">
        {image ? (
          <Image 
            src={image} 
            alt={name}
            width={200}
            height={200}
            className="w-full h-full object-cover rounded-lg"
          />
        ) : (
          <div className="w-full h-full bg-accent-light rounded-lg flex items-center justify-center">
            {/* Light purple square with icon button */}
            <Button 
              variant="primary" 
              size="sm"
              className="w-8 h-8 p-0 rounded-lg"
            >
              <User className="w-4 h-4" />
            </Button>
          </div>
        )}
      </div>
      
      {/* Assistant Info */}
      <div className="flex flex-col gap-2">
        <h3 className="capitalize font-medium text-primary text-base">
          {name}
        </h3>
        <p className="font-normal text-primary text-xs leading-normal">
          {description}
        </p>
      </div>
    </Card>
  )
} 