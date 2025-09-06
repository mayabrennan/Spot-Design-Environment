import React from 'react'
import { Search } from 'lucide-react'
import { cn } from '../utils/classNames'

export interface SearchInputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  size?: 'sm' | 'md' | 'lg'
  placeholder?: string
}

const SearchInput = React.forwardRef<HTMLInputElement, SearchInputProps>(
  ({ className, size = 'md', placeholder = 'Search', ...props }, ref) => {
    const baseClasses = 'bg-white border border-zinc-200 rounded-lg'
    
    return (
      <div className={cn(baseClasses, className)}>
        <div className="flex items-center justify-start w-full px-3 py-1.5 gap-2.5">
          {/* Search Icon - Left side with proper opacity */}
          <div className="flex items-center justify-end opacity-50 pl-0 pr-2 py-0">
            <div className="w-4 h-4 flex items-center justify-center">
              <Search className="w-4 h-4 text-[#6c7179]" />
            </div>
          </div>
          
          {/* Text Input */}
          <div className="flex-1 px-0 py-0">
            <input
              type="text"
              placeholder={placeholder}
              className="bg-transparent font-normal text-sm text-[#6c7179] placeholder-[#6c7179] opacity-50 focus:outline-none w-full leading-[20px]"
              ref={ref}
              {...props}
            />
          </div>
        </div>
      </div>
    )
  }
)

SearchInput.displayName = 'SearchInput'

export default SearchInput 