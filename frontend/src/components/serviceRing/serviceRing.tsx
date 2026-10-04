import { useRef, useState, type CSSProperties } from 'react'
import { Link } from 'react-router-dom'
import { gsap, useGSAP } from '../../lib/gsap'
import './serviceRing.scss'

export type Service = {
  title: string
  image: string
  to: string
}

type ServiceRingProps = {
  services: Service[]
  // seconds each service rests at the front before the ring turns to the next one
  interval?: number
}

const mod = (value: number, size: number) => ((value % size) + size) % size

// Wide cards stand on a circle that turns forever. The ones behind fade out and show through,
// every card always faces the viewer. Hover pauses it; dots and arrows step it by hand.
function ServiceRing({ services, interval = 3.2 }: ServiceRingProps) {
  const count = services.length
  const step = 360 / count

  const scopeRef = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)
  const index = useRef(0) // ever-growing, so the ring keeps turning the same way
  const timer = useRef<gsap.core.Tween | null>(null)
  const goTo = useRef<((next: number) => void) | null>(null)
  const [active, setActive] = useState(0)

  // Keeps the cards facing front while the ring turns, and fades the ones at the back
  const update = () => {
    const ring = ringRef.current
    if (!ring) return
    const spin = Number(gsap.getProperty(ring, 'rotationY'))
    ring.style.setProperty('--spin', `${spin}deg`)
    ring.querySelectorAll<HTMLElement>('.dw-ring-card').forEach((card, i) => {
      const facing = (1 + Math.cos(((i * step + spin) * Math.PI) / 180)) / 2
      card.style.opacity = String(0.2 + 0.8 * facing ** 2)
      card.style.pointerEvents = facing > 0.9 ? 'auto' : 'none'
    })
  }

  useGSAP(
    (_context, contextSafe) => {
      const ring = ringRef.current
      if (!ring || !contextSafe) return

      // Radius: neighbours overlap a little, so the circle reads as a circle
      const layout = () => {
        const radius = Math.round(ring.offsetWidth * 0.95)
        ring.style.setProperty('--radius', `${radius}px`)
        gsap.set(ring, { z: -radius, rotationY: -index.current * step })
        update()
      }

      const turnTo = (next: number) => {
        index.current = next
        setActive(mod(next, count))
        gsap.to(ring, {
          rotationY: -next * step,
          duration: 1.3,
          ease: 'power3.inOut',
          overwrite: true,
          onUpdate: update,
        })
      }
      goTo.current = contextSafe(turnTo)

      layout()
      window.addEventListener('resize', layout)

      const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
      if (!reduce) {
        const tick = () => {
          turnTo(index.current + 1)
          timer.current?.restart(true)
        }
        timer.current = gsap.delayedCall(interval, tick)
      }

      return () => {
        window.removeEventListener('resize', layout)
        timer.current?.kill()
      }
    },
    { scope: scopeRef, dependencies: [count] },
  )

  // Shortest way round to a given service
  const goToService = (target: number) => {
    let delta = target - mod(index.current, count)
    if (delta > count / 2) delta -= count
    if (delta < -count / 2) delta += count
    goTo.current?.(index.current + delta)
    timer.current?.restart(true)
  }

  const pause = () => timer.current?.pause()
  const resume = () => timer.current?.restart(true)

  return (
    <div
      ref={scopeRef}
      className="dw-ring"
      onPointerEnter={pause}
      onPointerLeave={resume}
      onFocus={pause}
      onBlur={resume}
      role="region"
      aria-roledescription="carousel"
      aria-label="Our services"
    >
      <div className="dw-ring-stage">
        <div className="dw-ring-tilt">
          <div ref={ringRef} className="dw-ring-wheel">
            {services.map(({ title, image, to }, i) => (
              <article
                key={title}
                className="dw-ring-card"
                style={{ '--a': `${i * step}deg` } as CSSProperties}
                aria-hidden={i !== active}
              >
                <img src={image} alt="" loading="lazy" />
                <div className="dw-ring-card-text">
                  <h3>{title}</h3>
                  <Link to={to} className="dw-ring-more" tabIndex={i === active ? 0 : -1}>
                    <span>View More</span>
                    <span className="dw-ring-arrow" aria-hidden="true">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="12" cy="12" r="9" />
                        <path d="M8.5 12h7M12.5 8.5 16 12l-3.5 3.5" />
                      </svg>
                    </span>
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>

      <div className="dw-ring-controls">
        <button type="button" className="dw-ring-nav" aria-label="Previous service" onClick={() => goToService(mod(active - 1, count))}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
            <path d="m15 5-7 7 7 7" />
          </svg>
        </button>
        <div className="dw-ring-dots">
          {services.map(({ title }, i) => (
            <button
              key={title}
              type="button"
              className={i === active ? 'is-active' : undefined}
              aria-label={`Show ${title}`}
              aria-current={i === active}
              onClick={() => goToService(i)}
            />
          ))}
        </div>
        <button type="button" className="dw-ring-nav" aria-label="Next service" onClick={() => goToService(mod(active + 1, count))}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
            <path d="m9 5 7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>
  )
}

export default ServiceRing
