import type { HTMLAttributes } from 'react'
import './pillLabel.scss'

// The small teal pill above a heading ("OUR PORTFOLIO", "CASE STUDY")
function PillLabel({ children, className = '', ...props }: HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p className={`dw-pill ${className}`} {...props}>
      <span>{children}</span>
    </p>
  )
}

export default PillLabel
