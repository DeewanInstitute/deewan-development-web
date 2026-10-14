import { useEffect, useRef, useState } from 'react'
import type { KeyboardEvent } from 'react'
import { Link, useLocation } from 'react-router-dom'
import Button from '../button/button'
import Scribble from '../scribble/scribble'
import { drawScribble, eraseScribble } from '../../lib/scribble'
import { gsap } from '../../lib/gsap'
import './navbar.scss'

type SubItem = { to?: string; label: string }
type NavItem = { to: string; label: string; children?: SubItem[] }

// a sub-item without `to` is shown as "Soon" until its page exists
const navItems: NavItem[] = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About Us' },
  {
    to: '/portfolio',
    label: 'Our Portfolio',
    children: [
      { to: '/portfolio', label: 'Projects' },
      { to: '/portfolio/social-media', label: 'Social Media' },
      { label: 'UI/UX' },
    ],
  },
  { to: '/offer', label: 'What We Offer' },
  { to: '/contact', label: 'Contact Us' },
]

const DROP_CLOSE_DELAY = 180

function Navbar() {
  const { pathname } = useLocation()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [isDropOpen, setIsDropOpen] = useState(false)
  const dropRef = useRef<HTMLLIElement>(null)
  const dropButtonRef = useRef<HTMLButtonElement>(null)
  const closeTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined)

  // every link carries its own scribble, so it can never drift away from the text
  const scribbleRefs = useRef<(SVGSVGElement | null)[]>([])

  const activeIndex = navItems.findIndex(({ to }) =>
    to === '/' ? pathname === '/' : pathname.startsWith(to),
  )

  // Selected link: the old circle is scratched out, then a new one is sketched around the new link.
  // data-drawn remembers which scribbles are on screen, which also keeps StrictMode's double run harmless.
  useEffect(() => {
    const speed = window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 0 : 1

    scribbleRefs.current.forEach((svg, index) => {
      if (!svg) return
      const isDrawn = svg.dataset.drawn === 'true'

      if (index !== activeIndex && isDrawn) {
        svg.dataset.drawn = 'false'
        eraseScribble(svg, 0.28 * speed)
      }

      if (index === activeIndex && !isDrawn) {
        svg.dataset.drawn = 'true'
        gsap
          .timeline({ delay: 0.15 * speed })
          .set(svg, { rotation: gsap.utils.random(-5, 5) })
          .add(drawScribble(svg, { duration: 0.8 * speed }))
          .to(svg, { rotation: 0, duration: 1.1 * speed, ease: 'elastic.out(1, 0.5)' }, '<')
      }
    })
  }, [activeIndex])

  // Sticky bar tightens up once the page is scrolled
  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [isMenuOpen])

  // a click anywhere outside the dropdown closes it
  useEffect(() => {
    if (!isDropOpen) return
    const onPointerDown = (event: PointerEvent) => {
      if (!dropRef.current?.contains(event.target as Node)) setIsDropOpen(false)
    }
    document.addEventListener('pointerdown', onPointerDown)
    return () => document.removeEventListener('pointerdown', onPointerDown)
  }, [isDropOpen])

  useEffect(() => () => clearTimeout(closeTimer.current), [])

  const closeMenu = () => setIsMenuOpen(false)

  // hover opens it; leaving waits a moment so the pointer can travel down to the list
  const openDrop = () => {
    clearTimeout(closeTimer.current)
    setIsDropOpen(true)
  }

  const closeDropSoon = () => {
    clearTimeout(closeTimer.current)
    closeTimer.current = setTimeout(() => setIsDropOpen(false), DROP_CLOSE_DELAY)
  }

  const onDropKeyDown = (event: KeyboardEvent) => {
    if (event.key !== 'Escape' || !isDropOpen) return
    setIsDropOpen(false)
    dropButtonRef.current?.focus()
  }

  const faces = (label: string, index: number) => (
    <>
      {/* Both faces share one grid cell so switching font never shifts the layout */}
      <span className="dw-header-face">{label}</span>
      <span className="dw-header-face dw-header-face-hand" aria-hidden="true">
        {label}
      </span>
      <Scribble
        ref={(el) => {
          scribbleRefs.current[index] = el
        }}
        className="dw-header-scribble"
      />
    </>
  )

  return (
    <>
      <header className={`dw-header${isScrolled ? ' is-scrolled' : ''}`}>
        <div className="dw-header-bar dw-container">
          <Link to="/" className="dw-header-logo" onClick={closeMenu}>
            <img src="/assets/images/logos/logo.png" alt="Deewan for Digital Learning Development" />
          </Link>

          <nav className="dw-header-nav" aria-label="Main">
            <ul className="dw-header-list">
              {navItems.map(({ to, label, children }, index) => {
                const isActive = index === activeIndex

                if (!children) {
                  return (
                    <li key={to}>
                      <Link
                        to={to}
                        className={`dw-header-link${isActive ? ' is-active' : ''}`}
                        aria-current={isActive ? 'page' : undefined}
                      >
                        {faces(label, index)}
                      </Link>
                    </li>
                  )
                }

                return (
                  <li
                    key={to}
                    ref={dropRef}
                    className={`dw-header-drop${isDropOpen ? ' is-open' : ''}`}
                    onPointerEnter={(event) => event.pointerType === 'mouse' && openDrop()}
                    onPointerLeave={(event) => event.pointerType === 'mouse' && closeDropSoon()}
                    onKeyDown={onDropKeyDown}
                  >
                    <button
                      ref={dropButtonRef}
                      type="button"
                      className={`dw-header-link${isActive ? ' is-active' : ''}`}
                      aria-expanded={isDropOpen}
                      aria-controls="dw-drop-portfolio"
                      onClick={() => setIsDropOpen((open) => !open)}
                    >
                      {faces(label, index)}
                      <svg className="dw-header-caret" viewBox="0 0 12 8" aria-hidden="true">
                        <path d="m1 1.5 5 5 5-5" />
                      </svg>
                    </button>

                    <ul id="dw-drop-portfolio" className="dw-drop">
                      {children.map((child, childIndex) => (
                        <li key={child.label} style={{ ['--i' as string]: childIndex }}>
                          {child.to ? (
                            <Link
                              to={child.to}
                              className={`dw-drop-link${pathname === child.to ? ' is-current' : ''}`}
                              aria-current={pathname === child.to ? 'page' : undefined}
                              tabIndex={isDropOpen ? 0 : -1}
                              onClick={() => setIsDropOpen(false)}
                            >
                              <span className="dw-drop-dot" aria-hidden="true" />
                              {child.label}
                            </Link>
                          ) : (
                            <span className="dw-drop-link is-soon" aria-disabled="true">
                              <span className="dw-drop-dot" aria-hidden="true" />
                              {child.label}
                              <span className="dw-drop-soon">Soon</span>
                            </span>
                          )}
                        </li>
                      ))}
                    </ul>
                  </li>
                )
              })}
            </ul>
          </nav>

          <Button to="/contact" variant="soft" className="dw-header-cta">
            Get Started
          </Button>

          <button
            type="button"
            className={`dw-header-toggle${isMenuOpen ? ' is-open' : ''}`}
            aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={isMenuOpen}
            onClick={() => setIsMenuOpen((open) => !open)}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </header>

      <div className={`dw-overlay${isMenuOpen ? ' is-open' : ''}`} aria-hidden={!isMenuOpen}>
        <ul className="dw-overlay-list">
          {navItems.map(({ to, label, children }, index) => (
            <li key={to}>
              {children ? (
                <>
                  <span className={`dw-overlay-group${index === activeIndex ? ' is-active' : ''}`}>
                    {label}
                  </span>
                  <ul className="dw-overlay-sub">
                    {children.map((child, childIndex) => (
                      <li key={child.label} style={{ ['--i' as string]: childIndex }}>
                        {child.to ? (
                          <Link
                            to={child.to}
                            className={pathname === child.to ? 'is-active' : undefined}
                            onClick={closeMenu}
                            tabIndex={isMenuOpen ? 0 : -1}
                          >
                            <span className="dw-drop-dot" aria-hidden="true" />
                            {child.label}
                          </Link>
                        ) : (
                          <span className="is-soon" aria-disabled="true">
                            <span className="dw-drop-dot" aria-hidden="true" />
                            {child.label}
                            <span className="dw-drop-soon">Soon</span>
                          </span>
                        )}
                      </li>
                    ))}
                  </ul>
                </>
              ) : (
                <Link
                  to={to}
                  className={index === activeIndex ? 'is-active' : undefined}
                  onClick={closeMenu}
                  tabIndex={isMenuOpen ? 0 : -1}
                >
                  {label}
                </Link>
              )}
            </li>
          ))}
        </ul>
        <Button to="/contact" variant="amber" onClick={closeMenu}>
          Get Started
        </Button>
      </div>
    </>
  )
}

export default Navbar
