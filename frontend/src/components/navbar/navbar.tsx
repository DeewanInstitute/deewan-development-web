import { useEffect, useRef, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import Button from '../button/button'
import Scribble from '../scribble/scribble'
import { drawScribble, eraseScribble } from '../../lib/scribble'
import { gsap } from '../../lib/gsap'
import './navbar.scss'

const navItems = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About Us' },
  { to: '/portfolio', label: 'Our Portfolio' },
  { to: '/offer', label: 'What We Offer' },
  { to: '/contact', label: 'Contact Us' },
]

function Navbar() {
  const { pathname } = useLocation()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

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

  const closeMenu = () => setIsMenuOpen(false)

  return (
    <>
      <header className={`dw-header${isScrolled ? ' is-scrolled' : ''}`}>
        <div className="dw-header-bar dw-container">
          <Link to="/" className="dw-header-logo" onClick={closeMenu}>
            <img src="/assets/images/logos/logo.png" alt="Deewan for Digital Learning Development" />
          </Link>

          <nav className="dw-header-nav" aria-label="Main">
            <ul className="dw-header-list">
              {navItems.map(({ to, label }, index) => (
                <li key={to}>
                  <Link
                    to={to}
                    className={`dw-header-link${index === activeIndex ? ' is-active' : ''}`}
                    aria-current={index === activeIndex ? 'page' : undefined}
                  >
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
                  </Link>
                </li>
              ))}
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
          {navItems.map(({ to, label }, index) => (
            <li key={to}>
              <Link
                to={to}
                className={index === activeIndex ? 'is-active' : undefined}
                onClick={closeMenu}
                tabIndex={isMenuOpen ? 0 : -1}
              >
                {label}
              </Link>
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
