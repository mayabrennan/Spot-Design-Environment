// Spot AI Design System Type Definitions

import React from 'react'

// Button Component
export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'destructive'
  size?: 'sm' | 'md' | 'lg'
  children: React.ReactNode
}

export declare const Button: React.ForwardRefExoticComponent<ButtonProps & React.RefAttributes<HTMLButtonElement>>

// Card Component
export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
  variant?: 'default' | 'elevated' | 'outlined'
}

export declare const Card: React.ForwardRefExoticComponent<CardProps & React.RefAttributes<HTMLDivElement>>

// Input Component
export interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  variant?: 'default' | 'search' | 'error'
  size?: 'sm' | 'md' | 'lg'
}

export declare const Input: React.ForwardRefExoticComponent<InputProps & React.RefAttributes<HTMLInputElement>>

// SearchInput Component
export interface SearchInputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  size?: 'sm' | 'md' | 'lg'
  placeholder?: string
}

export declare const SearchInput: React.ForwardRefExoticComponent<SearchInputProps & React.RefAttributes<HTMLInputElement>>

export interface ToggleGroupItem {
  value: string
  label: string
  disabled?: boolean
}

export interface ToggleGroupProps {
  items: ToggleGroupItem[]
  value?: string
  onValueChange?: (value: string) => void
  className?: string
  size?: 'sm' | 'md' | 'lg'
}

export declare const ToggleGroup: React.ForwardRefExoticComponent<ToggleGroupProps & React.RefAttributes<HTMLDivElement>>

// Badge Component
export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'success' | 'warning' | 'error' | 'info'
  size?: 'sm' | 'md'
  children: React.ReactNode
}

export declare const Badge: React.ForwardRefExoticComponent<BadgeProps & React.RefAttributes<HTMLDivElement>>

// Avatar Component
export interface AvatarProps extends React.HTMLAttributes<HTMLDivElement> {
  src?: string
  alt?: string
  fallback?: string
  size?: 'sm' | 'md' | 'lg' | 'xl'
  variant?: 'default' | 'rounded' | 'square'
}

export declare const Avatar: React.ForwardRefExoticComponent<AvatarProps & React.RefAttributes<HTMLDivElement>>

// Modal Component
export interface ModalProps {
  isOpen: boolean
  onClose: () => void
  title?: string
  size?: 'sm' | 'md' | 'lg' | 'xl'
  children: React.ReactNode
}

export declare const Modal: React.FC<ModalProps>

// Dropdown Component
export interface DropdownItem {
  label: string
  value: string
  disabled?: boolean
  icon?: React.ReactNode
}

export interface DropdownProps {
  trigger: React.ReactNode
  items: DropdownItem[]
  onSelect: (item: DropdownItem) => void
  placeholder?: string
  disabled?: boolean
  size?: 'sm' | 'md' | 'lg'
}

export declare const Dropdown: React.FC<DropdownProps>

// Tabs Component
export interface TabItem {
  id: string
  label: string
}

export interface TabsProps {
  items: TabItem[]
  activeTab: string
  onTabChange: (tabId: string) => void
  variant?: 'default' | 'pills' | 'underline'
  children: React.ReactNode
}

export declare const Tabs: React.FC<TabsProps>

// Progress Component
export interface ProgressProps {
  value: number
  max?: number
  variant?: 'default' | 'success' | 'warning' | 'error'
  size?: 'sm' | 'md' | 'lg'
  showLabel?: boolean
  label?: string
  className?: string
}

export declare const Progress: React.FC<ProgressProps>

// Alert Component
export interface AlertProps {
  variant?: 'default' | 'success' | 'warning' | 'error' | 'info'
  title?: string
  onClose?: () => void
  children: React.ReactNode
}

export declare const Alert: React.FC<AlertProps>

// DataTable Component
export interface DataTableColumn {
  key: string
  label: string
  sortable?: boolean
}

export interface DataTableProps {
  columns: DataTableColumn[]
  data: Record<string, any>[]
  searchable?: boolean
  filterable?: boolean
  sortable?: boolean
  onSort?: (column: string, direction: 'asc' | 'desc') => void
  onSearch?: (query: string) => void
  className?: string
}

export declare const DataTable: React.FC<DataTableProps>

// Chart Component
export interface ChartData {
  label: string
  value: number
  color?: string
}

export interface ChartProps {
  data: ChartData[]
  title?: string
  type?: 'bar' | 'line' | 'pie'
  height?: number
  showLegend?: boolean
  className?: string
}

export declare const Chart: React.FC<ChartProps>

// MetricsCard Component
export interface MetricsCardProps {
  title: string
  value: string
  subtitle?: string
  variant?: 'default' | 'success' | 'warning' | 'error'
  size?: 'sm' | 'md' | 'lg'
  trend?: {
    value: number
    isPositive: boolean
  }
  className?: string
}

export declare const MetricsCard: React.FC<MetricsCardProps>

// Utility functions
export declare function cn(...inputs: any[]): string 