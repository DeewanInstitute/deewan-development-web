import type { HTMLAttributes, Ref } from 'react'
import './numberBadge.scss'

type NumberBadgeProps = HTMLAttributes<HTMLDivElement> & {
  number: number
  numberRef?: Ref<HTMLSpanElement>
}

function NumberBadge({ number, numberRef, className = '', ...props }: NumberBadgeProps) {
  return (
    <div className={`dw-badge ${className}`} {...props}>
      <span className="dw-badge-ring" />
      <span ref={numberRef} className="dw-badge-number">
        {String(number).padStart(2, '0')}
      </span>
    </div>
  )
}

export default NumberBadge
