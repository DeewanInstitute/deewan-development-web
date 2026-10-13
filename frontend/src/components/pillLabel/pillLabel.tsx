import type { HTMLAttributes } from 'react'
import './pillLabel.scss'

type PillLabelProps = HTMLAttributes<HTMLParagraphElement> & {
  // teal: filled teal (portfolio page) | amber: filled amber + teal border | outline: white + amber border
  variant?: 'teal' | 'amber' | 'outline'
}

// The small pill above a heading ("OUR PORTFOLIO", "CASE STUDY", "WHO WE ARE")
function PillLabel({ children, variant = 'teal', className = '', ...props }: PillLabelProps) {
  return (
    <p className={`dw-pill dw-pill-${variant} ${className}`} {...props}>
      <span>{children}</span>
    </p>
  )
}

export default PillLabel
