import type { MouseEventHandler, ReactNode } from 'react'
import { Link } from 'react-router-dom'
import './button.scss'

type ButtonProps = {
  children: ReactNode
  variant?: 'amber' | 'teal' | 'soft'
  to?: string
  href?: string
  onClick?: MouseEventHandler<HTMLElement>
  type?: 'button' | 'submit'
  className?: string
}

function Button({
  children,
  variant = 'amber',
  to,
  href,
  onClick,
  type = 'button',
  className = '',
}: ButtonProps) {
  const classes = `dw-button dw-button-${variant} ${className}`
  const label = <span>{children}</span>

  if (to) {
    return (
      <Link to={to} className={classes} onClick={onClick}>
        {label}
      </Link>
    )
  }

  if (href) {
    return (
      <a href={href} className={classes} onClick={onClick}>
        {label}
      </a>
    )
  }

  return (
    <button type={type} className={classes} onClick={onClick}>
      {label}
    </button>
  )
}

export default Button
