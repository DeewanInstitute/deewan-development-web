import { useEffect, useRef, useState } from 'react'
import type { PointerEvent } from 'react'
import NumberBadge from '../../components/numberBadge/numberBadge'
import PillLabel from '../../components/pillLabel/pillLabel'
import SplitWords from '../../components/splitWords/splitWords'
import { useScrollReveal } from '../../hooks/useScrollReveal'
import { gsap, useGSAP } from '../../lib/gsap'
import { platformIcons, socialHero, socialProjects } from '../../data/social'
import './socialMedia.scss'

const labelSpots = ['below-left', 'above-right', 'below-right', 'above-right'] as const

const SWIPE_PX = 50
const prefersReducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches

function SocialMedia() {
  const pageRef = useRef<HTMLDivElement>(null)
  const slideRef = useRef<HTMLDivElement>(null)
  const moreRef = useRef<HTMLDivElement>(null)
  const numberRef = useRef<HTMLSpanElement>(null)
  const isBusy = useRef(false)
  const direction = useRef(1)
  const shownIndex = useRef(0)
  const swipeStart = useRef<number | null>(null)

  const [index, setIndex] = useState(0)
  const count = socialProjects.length
  const project = socialProjects[index]
  useScrollReveal(pageRef)

  useEffect(() => {
    document.title = 'Social Media Portfolio | Deewan Development'
  }, [])

  const goTo = (next: number, dir: 1 | -1) => {
    if (isBusy.current || next === index) return
    direction.current = dir

    if (prefersReducedMotion()) return setIndex(next)
    isBusy.current = true
    gsap.to([slideRef.current, moreRef.current], {
      autoAlpha: 0,
      x: -60 * dir,
      duration: 0.35,
      ease: 'power2.in',
      onComplete: () => setIndex(next),
    })
  }

  const step = (dir: 1 | -1) => goTo((index + dir + count) % count, dir)

  useGSAP(
    () => {
      if (shownIndex.current === index) return
      shownIndex.current = index
      const dir = direction.current

      gsap.fromTo(
        [slideRef.current, moreRef.current],
        { autoAlpha: 0, x: 60 * dir },
        {
          autoAlpha: 1,
          x: 0,
          duration: 0.6,
          ease: 'power3.out',
          clearProps: 'transform',
          onComplete: () => {
            isBusy.current = false
          },
        },
      )
      gsap.fromTo(
        numberRef.current,
        { yPercent: 70, rotation: -25, opacity: 0 },
        { yPercent: 0, rotation: 0, opacity: 1, duration: 0.7, ease: 'back.out(1.8)', delay: 0.15 },
      )
    },
    { dependencies: [index] },
  )

  // swipe left / right on the mock-ups
  const onPointerDown = (event: PointerEvent) => {
    swipeStart.current = event.clientX
  }

  const onPointerUp = (event: PointerEvent) => {
    if (swipeStart.current === null) return
    const delta = event.clientX - swipeStart.current
    swipeStart.current = null
    if (Math.abs(delta) > SWIPE_PX) step(delta < 0 ? 1 : -1)
  }

  return (
    <div ref={pageRef} className="sm">
      <section className="sm-hero dw-container">
        <header className="sm-heading">
          <PillLabel data-reveal="zoom">{socialHero.label}</PillLabel>
          <h1 data-reveal="words">
            <SplitWords text={socialHero.title} />
          </h1>
        </header>

        <div
          className="sm-carousel"
          role="region"
          aria-roledescription="carousel"
          aria-label="Social media projects"
        >
          <div
            ref={slideRef}
            className="sm-slide"
            role="group"
            aria-roledescription="slide"
            aria-label={`${index + 1} of ${count}: ${project.name}`}
          >
            <div className="sm-title">
              <NumberBadge number={index + 1} numberRef={numberRef} data-reveal="pop" />
              <div>
                <p className="sm-category" data-reveal="up">
                  {project.category}
                </p>
                <h2 className="sm-name" data-reveal="up">
                  {project.name}
                </h2>
              </div>
            </div>

            <p className="sm-description" data-reveal="up">
              {project.description}
            </p>

            <figure
              className="sm-mockup"
              data-reveal="zoom"
              onPointerDown={onPointerDown}
              onPointerUp={onPointerUp}
              onPointerCancel={() => (swipeStart.current = null)}
            >
              <img
                className="dw-float"
                src={project.image}
                alt={`${project.name} social media posts, profile and stories`}
                draggable={false}
              />
            </figure>
          </div>

          <div className="sm-controls">
            <button type="button" className="sm-arrow" aria-label="Previous project" onClick={() => step(-1)}>
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M15 5 8 12l7 7" />
              </svg>
            </button>

            <div className="sm-dots">
              {socialProjects.map(({ id, name }, dot) => (
                <button
                  key={id}
                  type="button"
                  className={`sm-dot${dot === index ? ' is-active' : ''}`}
                  aria-label={`Show ${name}`}
                  aria-current={dot === index ? 'true' : undefined}
                  onClick={() => goTo(dot, dot > index ? 1 : -1)}
                />
              ))}
            </div>

            <button type="button" className="sm-arrow" aria-label="Next project" onClick={() => step(1)}>
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="m9 5 7 7-7 7" />
              </svg>
            </button>
          </div>

          <div ref={moreRef} className="sm-slide-more">
            <h3 className="sm-subtitle" data-reveal="up">
              What We Do
            </h3>
            <ul className="sm-services">
              {project.services.map((service) => (
                <li key={service} data-reveal="up">
                  {service}
                </li>
              ))}
            </ul>

            <h3 className="sm-subtitle" data-reveal="up">
              Explore Our Platforms
            </h3>
            <ul className="sm-platforms">
              {project.platforms.map(({ name, href }, spot) => {
                const icon = <img src={platformIcons[name]} alt="" />
                return (
                  <li key={name} className={`sm-platform sm-platform-${labelSpots[spot]}`} data-reveal="pop">
                    {href ? (
                      <a href={href} target="_blank" rel="noreferrer" aria-label={`${project.name} on ${name}`}>
                        {icon}
                      </a>
                    ) : (
                      <span className="sm-platform-icon" aria-label={name} role="img">
                        {icon}
                      </span>
                    )}
                    <img className="sm-platform-arrow" src="/assets/images/portfolio/arrow.webp" alt="" />
                    <span className="sm-platform-name" aria-hidden="true">
                      {name}
                    </span>
                  </li>
                )
              })}
            </ul>
          </div>
        </div>
      </section>
    </div>
  )
}

export default SocialMedia
