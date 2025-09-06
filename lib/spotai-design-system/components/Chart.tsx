import React from 'react'
import { cn } from '../utils/classNames'

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

const Chart: React.FC<ChartProps> = ({
  data,
  title,
  type = 'bar',
  height = 200,
  showLegend = true,
  className
}) => {
  const maxValue = Math.max(...data.map(d => d.value))
  const total = data.reduce((sum, d) => sum + d.value, 0)

  const renderBarChart = () => (
    <div className="h-full flex items-end justify-between gap-2">
      {data.map((item, index) => (
        <div key={index} className="flex-1 flex flex-col items-center">
          <div
            className="w-full bg-accent rounded-t transition-all duration-300"
            style={{
              height: `${(item.value / maxValue) * 100}%`,
              backgroundColor: item.color || 'var(--accent-color, #5857e8)'
            }}
          />
          <span className="text-xs text-gray-600 mt-2">{item.label}</span>
        </div>
      ))}
    </div>
  )

  const renderLineChart = () => (
    <div className="h-full relative">
      <svg className="w-full h-full" viewBox={`0 0 100 ${height}`}>
        <polyline
          fill="none"
          stroke="var(--accent-color, #5857e8)"
          strokeWidth="2"
          points={data.map((item, index) => 
            `${(index / (data.length - 1)) * 100},${100 - (item.value / maxValue) * 100}`
          ).join(' ')}
        />
        {data.map((item, index) => (
          <circle
            key={index}
            cx={`${(index / (data.length - 1)) * 100}`}
            cy={`${100 - (item.value / maxValue) * 100}`}
            r="3"
            fill="var(--accent-color, #5857e8)"
          />
        ))}
      </svg>
    </div>
  )

  const renderPieChart = () => {
    const radius = 40
    const centerX = 50
    const centerY = 50
    
    let currentAngle = 0
    const paths = data.map((item, index) => {
      const percentage = item.value / total
      const angle = percentage * 360
      const startAngle = currentAngle
      currentAngle += angle
      
      const x1 = centerX + radius * Math.cos((startAngle - 90) * Math.PI / 180)
      const y1 = centerY + radius * Math.sin((startAngle - 90) * Math.PI / 180)
      const x2 = centerX + radius * Math.cos((currentAngle - 90) * Math.PI / 180)
      const y2 = centerY + radius * Math.sin((currentAngle - 90) * Math.PI / 180)
      
      const largeArcFlag = angle > 180 ? 1 : 0
      
      return {
        path: `M ${centerX} ${centerY} L ${x1} ${y1} A ${radius} ${radius} 0 ${largeArcFlag} 1 ${x2} ${y2} Z`,
        color: item.color || 'var(--accent-color, #5857e8)',
        label: item.label,
        percentage
      }
    })

    return (
      <div className="h-full flex items-center justify-center">
        <svg className="w-full h-full" viewBox="0 0 100 100">
          {paths.map((path, index) => (
            <g key={index}>
              <path
                d={path.path}
                fill={path.color}
                stroke="white"
                strokeWidth="1"
              />
            </g>
          ))}
        </svg>
      </div>
    )
  }

  const renderChart = () => {
    switch (type) {
      case 'line':
        return renderLineChart()
      case 'pie':
        return renderPieChart()
      default:
        return renderBarChart()
    }
  }

  return (
    <div className={cn('bg-white rounded-lg border border-gray-200 p-4', className)}>
      {title && (
        <h3 className="text-base font-medium text-accent mb-4">{title}</h3>
      )}
      
      <div style={{ height: `${height}px` }}>
        {renderChart()}
      </div>
      
      {showLegend && type === 'pie' && (
        <div className="mt-4 flex flex-wrap gap-2">
          {data.map((item, index) => (
            <div key={index} className="flex items-center gap-2">
              <div
                className="w-3 h-3 rounded-sm"
                style={{ backgroundColor: item.color || 'var(--accent-color, #5857e8)' }}
              />
              <span className="text-xs text-gray-600">{item.label}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default Chart 