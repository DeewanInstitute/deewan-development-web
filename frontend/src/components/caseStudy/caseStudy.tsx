import { useEffect, useRef } from 'react'
import type { ReactNode } from 'react'
import PillLabel from '../pillLabel/pillLabel'
import SplitWords from '../splitWords/splitWords'
import { useScrollReveal } from '../../hooks/useScrollReveal'
import { caseStudyHeading } from '../../data/portfolio'
import type { Project, TechName } from '../../data/portfolio'
import './caseStudy.scss'

const assets = '/assets/images/portfolio'

// Logos for the technology stack, one file per tool in the portfolio folder
const techIcons: Record<TechName, string> = {
  Figma: `${assets}/figma.webp`,
  React: `${assets}/react.webp`,
  Firebase: `${assets}/firebase.webp`,
  JavaScript: `${assets}/js.webp`,
  Flutter: `${assets}/flutter.webp`,
  Dart: `${assets}/dart.webp`,
}

type StepProps = {
  side: 'left' | 'right'
  title: string
  children: ReactNode
}

// One text card plus the hand-drawn arrow that leads to the next one
function Step({ side, title, children }: StepProps) {
  return (
    <div className={`cs-step cs-step-${side}`}>
      <article className="cs-card" data-reveal={side === 'left' ? 'right' : 'left'}>
        <h3>{title}</h3>
        <p>{children}</p>
      </article>
      {/* arrow2 points down-right; after a right-hand card it is mirrored to lead down-left */}
      <span className={`cs-arrow${side === 'right' ? ' cs-arrow-flip' : ''}`}>
        <img src={`${assets}/arrow2.webp`} alt="" />
      </span>
    </div>
  )
}

function CaseStudy({ project }: { project: Project }) {
  const ref = useRef<HTMLElement>(null)
  const { caseStudy } = project
  useScrollReveal(ref)

  // each arrow draws itself (then keeps nudging) once it scrolls into view; see .cs-arrow.is-drawn
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach(({ isIntersecting, target }) => {
          if (!isIntersecting) return
          target.classList.add('is-drawn')
          observer.unobserve(target)
        }),
      { threshold: 0.6 },
    )
    ref.current?.querySelectorAll('.cs-arrow').forEach((arrow) => observer.observe(arrow))
    return () => observer.disconnect()
  }, [])

  // the section only exists once the project is unlocked, so bring it into view
  useEffect(() => {
    const frame = requestAnimationFrame(() => ref.current?.scrollIntoView({ behavior: 'smooth' }))
    return () => cancelAnimationFrame(frame)
  }, [])

  return (
    <section ref={ref} id="case-study" className="cs" aria-labelledby="cs-title">
      <div className="dw-container">
        <header className="cs-heading">
          <PillLabel data-reveal="zoom">{caseStudyHeading.label}</PillLabel>
          <h2 id="cs-title" data-reveal="words">
            <SplitWords text={caseStudyHeading.title} />
          </h2>
          <p className="cs-name" data-reveal="up">
            {project.name}
          </p>
        </header>

        <dl className="cs-meta" data-reveal="zoom">
          <div>
            <dt>Duration</dt>
            <dd>{caseStudy.duration}</dd>
          </div>
          <div>
            <dt>Service</dt>
            <dd>{caseStudy.service}</dd>
          </div>
          <div>
            <dt>Industry</dt>
            <dd>{caseStudy.industry}</dd>
          </div>
        </dl>

        <div className="cs-steps">
          <Step side="left" title="What is it?">
            {caseStudy.what}
          </Step>
          <Step side="right" title="The Challenge">
            {caseStudy.challenge}
          </Step>
          <Step side="left" title="The Solution">
            {caseStudy.solution}
          </Step>
        </div>

        <div className="cs-laptop" data-reveal="up">
          <div className="cs-laptop-lid">
            <div className="cs-laptop-screen">
              {/* native controls include the full-screen button */}
              {caseStudy.video ? (
                <video
                  src={caseStudy.video}
                  controls
                  playsInline
                  preload="metadata"
                  aria-label={`${project.name} walkthrough video`}
                />
              ) : (
                <img className="cs-laptop-fallback" src={project.logo} alt="" />
              )}
            </div>
          </div>
          <div className="cs-laptop-base" />
        </div>

        {caseStudy.link && (
          <p className="cs-link" data-reveal="up">
            <a href={caseStudy.link.href} target="_blank" rel="noreferrer">
              {caseStudy.link.label}
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <path d="M7 17 17 7M9 7h8v8" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
          </p>
        )}

        <div className="cs-step cs-step-right cs-stack-step">
          <article className="cs-card cs-stack" data-reveal="left">
            <h3>Technology Stack</h3>
            <ul>
              {caseStudy.stack.map((tech) => (
                <li key={tech}>
                  <img className="cs-stack-icon" src={techIcons[tech]} alt="" loading="lazy" />
                  {tech}
                </li>
              ))}
            </ul>
          </article>
          <span className="cs-arrow cs-stack-arrow">
            <img src={`${assets}/arrow2.webp`} alt="" />
          </span>
        </div>
      </div>
    </section>
  )
}

export default CaseStudy
