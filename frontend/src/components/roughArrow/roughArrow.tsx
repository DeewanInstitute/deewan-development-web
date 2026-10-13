import './roughArrow.scss'

type RoughArrowProps = {
  // small: 50px circle on the service cards | large: 106px circle on the portfolio card
  size?: 'small' | 'large'
  className?: string
}

// The hand-painted amber circle with a ring-arrow in it. The disc is a mask so its edge stays rough.
function RoughArrow({ size = 'small', className = '' }: RoughArrowProps) {
  return (
    <span className={`dw-rough dw-rough-${size} ${className}`} aria-hidden="true">
      <span className="dw-rough-disc" />
      <img className="dw-rough-arrow" src={`/assets/images/home/arrow-${size}.svg`} alt="" draggable={false} />
    </span>
  )
}

export default RoughArrow
