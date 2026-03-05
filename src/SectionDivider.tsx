import React from 'react'
import './SectionDivider.css'

interface SectionDividerProps {
  number: string
  title: string
  subtitle?: string
  color: 'teal' | 'coral' | 'sage'
}

export function SectionDivider({ number, title, subtitle, color }: SectionDividerProps) {
  return (
    <div className={`section-divider section-divider-${color}`}>
      <div className="divider-content">
        <div className="divider-number">{number}</div>
        <div className="divider-text">
          <h2 className="divider-title">{title}</h2>
          {subtitle && <p className="divider-subtitle">{subtitle}</p>}
        </div>
      </div>
      <div className="divider-visual"></div>
    </div>
  )
}
