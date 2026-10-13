import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import type { KeyboardEvent } from 'react'
import Button from '../button/button'
import { gsap, useGSAP } from '../../lib/gsap'
import { initialProject, projects } from '../../data/portfolio'
import './portfolioCarousel.scss'

// The stage is drawn on a fixed "design canvas" (px) that is scaled to fit the page, so the
// whole fan keeps its proportions. Two canvases: a wide fan, and a narrow one for phones.
type Slot = { x: number; y: number; w: number; h: number; z: number; opacity: number }
// edge = x of the tag's inner side: left tags end there, right tags start there
type TagSpot = { side: 'left' | 'right'; edge: number; y: number; maxWidth: number }
type Layout = {
  w: number
  h: number
  slots: Record<number, Slot>
  shadow: { x: number; y: number; w: number; h: number }
  tags: TagSpot[]
}

// slot 0 is the card in the middle, -1/+1 its neighbours, -2/+2 the outer cards
const layouts: Record<'wide' | 'compact', Layout> = {
  wide: {
    w: 1487,
    h: 1000,
    slots: {
      [-2]: { x: 0, y: 0, w: 330, h: 310, z: 1, opacity: 1 },
      [-1]: { x: 254, y: 136, w: 318, h: 312, z: 2, opacity: 1 },
      0: { x: 445, y: 236, w: 598, h: 712, z: 5, opacity: 1 },
      1: { x: 915, y: 136, w: 318, h: 312, z: 2, opacity: 1 },
      2: { x: 1157, y: 0, w: 330, h: 310, z: 1, opacity: 1 },
    },
    shadow: { x: 306, y: 894, w: 894, h: 100 },
    tags: [
      { side: 'left', edge: 425, y: 490, maxWidth: 400 },
      { side: 'right', edge: 1063, y: 510, maxWidth: 400 },
      { side: 'left', edge: 425, y: 730, maxWidth: 400 },
      { side: 'right', edge: 1063, y: 750, maxWidth: 400 },
    ],
  },
  compact: {
    w: 720,
    h: 860,
    slots: {
      [-2]: { x: 100, y: 70, w: 200, h: 200, z: 1, opacity: 0 },
      [-1]: { x: 0, y: 70, w: 230, h: 230, z: 2, opacity: 1 },
      0: { x: 160, y: 40, w: 400, h: 470, z: 5, opacity: 1 },
      1: { x: 490, y: 70, w: 230, h: 230, z: 2, opacity: 1 },
      2: { x: 420, y: 70, w: 200, h: 200, z: 1, opacity: 0 },
    },
    shadow: { x: 90, y: 440, w: 540, h: 90 },
    tags: [
      { side: 'left', edge: 345, y: 565, maxWidth: 330 },
      { side: 'right', edge: 375, y: 575, maxWidth: 330 },
      { side: 'left', edge: 410, y: 700, maxWidth: 400 },
      { side: 'right', edge: 440, y: 730, maxWidth: 260 },
    ],
  },
}

const COMPACT_BELOW = 760
const AUTOPLAY_MS = 4200
const UNLOCK_MS = 650
const GHOST = 0.1

// how far from the middle a card sits, wrapping around the ring: -2 … 2 for five projects
const slotOf = (index: number, active: number, count: number) => {
  const half = Math.floor(count / 2)
  return ((((index - active + half) % count) + count) % count) - half
}

const prefersReducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches

type PortfolioCarouselProps = {
  unlockedId: string | null
  onUnlock: (id: string) => void
  onRelock: () => void
}

function PortfolioCarousel({ unlockedId, onUnlock, onRelock }: PortfolioCarouselProps) {
  const count = projects.length
  const stageRef = useRef<HTMLDivElement>(null)
  const introDone = useRef(false)
  const lastLayout = useRef<string | null>(null)
  const previousSlots = useRef<number[]>([])

  const [active, setActive] = useState(() =>
    Math.max(0, projects.findIndex(({ id }) => id === initialProject)),
  )
  const [width, setWidth] = useState(0)
  const [isHovering, setIsHovering] = useState(false)
  const [isPaused, setIsPaused] = useState(false)
  const [isUnlocking, setIsUnlocking] = useState(false)

  const layoutKey = width > 0 && width < COMPACT_BELOW ? 'compact' : 'wide'
  const layout = layouts[layoutKey]
  const scale = width ? Math.min(1, width / layout.w) : 0
  const isUnlocked = unlockedId !== null

  useLayoutEffect(() => {
    const stage = stageRef.current
    if (!stage) return
    setWidth(stage.clientWidth)
    const observer = new ResizeObserver(([entry]) => setWidth(entry.contentRect.width))
    observer.observe(stage)
    return () => observer.disconnect()
  }, [])

  // Cards glide to their slot. The first run is the intro: everything starts stacked behind the
  // middle card and fans out.
  useGSAP(
    () => {
      if (!scale) return
      const cards = gsap.utils.toArray<HTMLElement>('.pf-card')
      const middle = layout.slots[0]
      const instant = prefersReducedMotion() || lastLayout.current !== layoutKey
      const opacityFor = (slot: number) =>
        isUnlocked && slot !== 0 ? GHOST : layout.slots[slot].opacity

      if (!introDone.current && !prefersReducedMotion()) {
        const intro = gsap.timeline({
          delay: 0.25,
          onComplete: () => {
            introDone.current = true
          },
        })

        cards.forEach((card, index) => {
          const slot = slotOf(index, active, count)
          const s = layout.slots[slot]
          previousSlots.current[index] = slot

          gsap.set(card, {
            x: middle.x,
            y: middle.y + 70,
            width: middle.w,
            height: middle.h,
            zIndex: s.z,
            opacity: 0,
            scale: 0.8,
          })
          intro.to(
            card,
            {
              x: s.x,
              y: s.y,
              width: s.w,
              height: s.h,
              opacity: opacityFor(slot),
              scale: 1,
              duration: 1.15,
              ease: 'power3.out',
            },
            slot === 0 ? 0 : 0.45 + Math.abs(slot) * 0.12,
          )
        })

        intro.from('.pf-shadow', { opacity: 0, scaleX: 0.2, duration: 1, ease: 'power3.out' }, 0.9)
        intro.from('.pf-hint', { opacity: 0, y: 14, duration: 0.7, ease: 'power3.out' }, 1.3)
      } else {
        cards.forEach((card, index) => {
          const slot = slotOf(index, active, count)
          const s = layout.slots[slot]
          const wrapped = Math.abs(slot - (previousSlots.current[index] ?? slot)) > 2
          const place = { x: s.x, y: s.y, width: s.w, height: s.h, zIndex: s.z }
          previousSlots.current[index] = slot

          if (instant) {
            gsap.set(card, { ...place, opacity: opacityFor(slot) })
          } else if (wrapped) {
            // the card leaving one end of the ring fades out and returns at the other end
            gsap
              .timeline()
              .to(card, { opacity: 0, duration: 0.3, overwrite: 'auto' })
              .set(card, place)
              .to(card, { opacity: opacityFor(slot), duration: 0.5 }, '+=0.15')
          } else {
            gsap.to(card, {
              ...place,
              opacity: opacityFor(slot),
              duration: 0.95,
              ease: 'power3.inOut',
              overwrite: 'auto',
            })
          }
        })
      }

      lastLayout.current = layoutKey
    },
    { scope: stageRef, dependencies: [active, layoutKey, scale > 0, isUnlocked] },
  )

  // slow auto-rotation; stops while the visitor is looking, interacting or reading a case study
  useEffect(() => {
    if (isPaused || isUnlocked || isUnlocking || prefersReducedMotion()) return
    const timer = setInterval(() => setActive((current) => (current + 1) % count), AUTOPLAY_MS)
    return () => clearInterval(timer)
  }, [isPaused, isUnlocked, isUnlocking, count])

  const unlockTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined)
  useEffect(() => () => clearTimeout(unlockTimer.current), [])

  const handleCard = (index: number) => {
    if (isUnlocked || isUnlocking) return
    if (slotOf(index, active, count) !== 0) return setActive(index)

    // the padlock opens first, then the case study appears
    setIsUnlocking(true)
    unlockTimer.current = setTimeout(
      () => {
        setIsUnlocking(false)
        setIsHovering(false)
        onUnlock(projects[index].id)
      },
      prefersReducedMotion() ? 0 : UNLOCK_MS,
    )
  }

  const handleKeys = (event: KeyboardEvent) => {
    if (isUnlocked || isUnlocking) return
    if (event.key === 'ArrowRight') setActive((current) => (current + 1) % count)
    if (event.key === 'ArrowLeft') setActive((current) => (current - 1 + count) % count)
  }

  const current = projects[active]
  const showTags = isHovering || isUnlocked

  return (
    <div className="pf-carousel">
      <div
        ref={stageRef}
        className={`pf-stage${isUnlocked ? ' is-unlocked' : ''}${scale ? '' : ' is-measuring'}`}
        style={{ height: layout.h * scale }}
        onPointerEnter={() => setIsPaused(true)}
        onPointerLeave={() => setIsPaused(false)}
        onFocus={() => setIsPaused(true)}
        onBlur={() => setIsPaused(false)}
        onKeyDown={handleKeys}
      >
        <div
          className={`pf-canvas pf-canvas-${layoutKey}`}
          style={{ width: layout.w, height: layout.h, transform: `scale(${scale})` }}
        >
          {/* the hand-brushed yellow patch the middle card stands on */}
          <svg
            className="pf-shadow"
            style={{
              left: layout.shadow.x,
              top: layout.shadow.y,
              width: layout.shadow.w,
              height: layout.shadow.h,
            }}
            viewBox="0 0 894 100"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <filter id="pf-rough" x="-5%" y="-30%" width="110%" height="160%">
              <feTurbulence type="fractalNoise" baseFrequency="0.05 0.22" numOctaves="3" seed="7" />
              <feDisplacementMap in="SourceGraphic" scale="26" />
            </filter>
            <ellipse cx="447" cy="52" rx="420" ry="34" filter="url(#pf-rough)" />
          </svg>

          {projects.map(({ id, name, logo }, index) => {
            const slot = slotOf(index, active, count)
            const isMiddle = slot === 0

            return (
              <button
                key={id}
                type="button"
                className="pf-card"
                data-slot={slot}
                aria-label={isMiddle ? `Unlock the ${name} case study` : `Show ${name}`}
                tabIndex={isUnlocked && !isMiddle ? -1 : 0}
                onClick={() => handleCard(index)}
                onPointerEnter={() => isMiddle && setIsHovering(true)}
                onPointerLeave={() => setIsHovering(false)}
                onFocus={() => isMiddle && setIsHovering(true)}
                onBlur={() => setIsHovering(false)}
              >
                <span className="pf-card-back" />
                <span className="pf-card-front">
                  <img src={logo} alt="" draggable={false} />
                </span>

                {isMiddle && (
                  <span
                    className={`pf-lock${isUnlocking ? ' is-opening' : ''}${isUnlocked ? ' is-open' : ''}`}
                    aria-hidden="true"
                  >
                    <svg viewBox="0 0 24 24" fill="none" strokeLinecap="round">
                      <path className="pf-lock-shackle" d="M7.5 11V8a4.5 4.5 0 0 1 9 0v3" strokeWidth="2.2" />
                      <rect x="4.5" y="11" width="15" height="10.5" rx="2.6" className="pf-lock-body" />
                      <circle cx="12" cy="16.2" r="1.5" className="pf-lock-key" />
                    </svg>
                  </span>
                )}
              </button>
            )
          })}

          {/* hand-written notes around the card, each with an arrow pointing at it */}
          <ul
            key={current.id}
            className={`pf-tags${showTags ? ' is-visible' : ''}${isUnlocked ? ' is-unlocked' : ''}`}
            aria-hidden="true"
          >
            {current.tags.map((tag, index) => {
              const spot = layout.tags[index]
              const isLeft = spot.side === 'left'

              return (
                <li
                  key={tag}
                  className={`pf-tag pf-tag-${spot.side}`}
                  style={{
                    top: spot.y,
                    maxWidth: spot.maxWidth,
                    [isLeft ? 'right' : 'left']: isLeft ? layout.w - spot.edge : spot.edge,
                    ['--i' as string]: index,
                    ['--tilt' as string]: `${[-3, 2.5, -2, 3][index]}deg`,
                  }}
                >
                  <span className="pf-tag-text">{tag}</span>
                  <img
                    className="pf-tag-arrow"
                    src="/assets/images/portfolio/arrow.webp"
                    alt=""
                    draggable={false}
                  />
                </li>
              )
            })}
          </ul>
        </div>
      </div>

      <div className="pf-hint">
        {isUnlocked ? (
          <Button variant="soft" onClick={onRelock}>
            Back to all projects
          </Button>
        ) : (
          <p>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
              <path d="M7.5 11V8a4.5 4.5 0 0 1 9 0v3" />
              <rect x="4.5" y="11" width="15" height="10.5" rx="2.6" />
            </svg>
            Click the card in the middle to unlock its case study
          </p>
        )}
      </div>
    </div>
  )
}

export default PortfolioCarousel
