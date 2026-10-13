import { useEffect, useRef, useState, type CSSProperties } from 'react'
import { Link } from 'react-router-dom'
import RoughArrow from '../roughArrow/roughArrow'
import './serviceSlider.scss'

export type ServiceCard = {
  // one string per line, so the big title breaks exactly where the design does
  title: string[]
  to: string
}

type ServiceSliderProps = {
  cards: ServiceCard[]
}

// same breakpoint as $tablet in the stylesheet
const COMPACT = '(max-width: 820px)'
const SWIPE = 40

// Numbered tiles, two to a page on desktop and one on phones. The dots (or a swipe) turn the page.
function ServiceSlider({ cards }: ServiceSliderProps) {
  const [perPage, setPerPage] = useState(() => (window.matchMedia(COMPACT).matches ? 1 : 2))
  const [page, setPage] = useState(0)
  const touchStart = useRef<number | null>(null)

  const pages = Math.ceil(cards.length / perPage)

  useEffect(() => {
    const query = window.matchMedia(COMPACT)
    const update = () => {
      setPerPage(query.matches ? 1 : 2)
      setPage(0)
    }
    query.addEventListener('change', update)
    return () => query.removeEventListener('change', update)
  }, [])

  const goTo = (next: number) => setPage(Math.min(pages - 1, Math.max(0, next)))

  return (
    <div
      className="dw-slider"
      role="region"
      aria-roledescription="carousel"
      aria-label="Our core competencies"
      onKeyDown={(event) => {
        if (event.key === 'ArrowRight') goTo(page + 1)
        if (event.key === 'ArrowLeft') goTo(page - 1)
      }}
      onTouchStart={(event) => {
        touchStart.current = event.touches[0].clientX
      }}
      onTouchEnd={(event) => {
        if (touchStart.current === null) return
        const delta = event.changedTouches[0].clientX - touchStart.current
        touchStart.current = null
        if (Math.abs(delta) > SWIPE) goTo(page + (delta < 0 ? 1 : -1))
      }}
    >
      <div className="dw-slider-viewport">
        <ul className="dw-slider-track" style={{ '--page': page } as CSSProperties}>
          {cards.map(({ title, to }, index) => {
            const onPage = Math.floor(index / perPage) === page

            return (
              <li key={title.join(' ')} className="dw-slider-slide" inert={!onPage}>
                <Link to={to} className="dw-slider-card">
                  {/* the amber outline-only twin sits behind the filled face */}
                  <span className="dw-slider-outline" aria-hidden="true" />
                  <span className="dw-slider-face">
                    <span className="dw-slider-number">{String(index + 1).padStart(2, '0')}</span>
                    <h3 className="dw-slider-title">
                      {title.map((line) => (
                        <span key={line}>{line}</span>
                      ))}
                    </h3>
                    <span className="dw-slider-more">
                      <span>View More</span>
                      <RoughArrow />
                    </span>
                  </span>
                </Link>
              </li>
            )
          })}
        </ul>
      </div>

      <div className="dw-slider-dots">
        {Array.from({ length: pages }, (_, index) => (
          <button
            key={index}
            type="button"
            className={index === page ? 'is-active' : undefined}
            aria-label={`Show services page ${index + 1}`}
            aria-current={index === page}
            onClick={() => goTo(index)}
          />
        ))}
      </div>
    </div>
  )
}

export default ServiceSlider
