import { useEffect, useRef, useState } from 'react'
import LottieGlobe from '../../components/lottieGlobe/lottieGlobe'
import PillLabel from '../../components/pillLabel/pillLabel'
import SplitWords from '../../components/splitWords/splitWords'
import PortfolioCarousel from '../../components/portfolioCarousel/portfolioCarousel'
import CaseStudy from '../../components/caseStudy/caseStudy'
import { useScrollReveal } from '../../hooks/useScrollReveal'
import { portfolioHero, projects } from '../../data/portfolio'
import './portfolio.scss'

function Portfolio() {
  const pageRef = useRef<HTMLDivElement>(null)
  const relockTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined)
  const [unlockedId, setUnlockedId] = useState<string | null>(null)
  useScrollReveal(pageRef)

  useEffect(() => {
    document.title = 'Our Portfolio | Deewan Development'
    return () => clearTimeout(relockTimer.current)
  }, [])

  const unlocked = projects.find(({ id }) => id === unlockedId)

  // scroll back up first, then lock the case study again so it does not vanish under the reader
  const relock = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
    relockTimer.current = setTimeout(() => setUnlockedId(null), 600)
  }

  return (
    <div ref={pageRef} className="pf">
      <section className="pf-hero">
        <div className="pf-shape pf-shape-left" data-reveal="fade">
          <LottieGlobe className="pf-shape-globe" />
        </div>
        <div className="pf-shape pf-shape-right" data-reveal="fade">
          <LottieGlobe className="pf-shape-globe" />
        </div>

        <div className="dw-container">
          <header className="pf-heading">
            <PillLabel data-reveal="zoom">{portfolioHero.label}</PillLabel>
            <h1 data-reveal="words">
              <SplitWords text={portfolioHero.title} />
            </h1>
          </header>

          <PortfolioCarousel unlockedId={unlockedId} onUnlock={setUnlockedId} onRelock={relock} />
        </div>
      </section>

      {unlocked && <CaseStudy key={unlocked.id} project={unlocked} />}
    </div>
  )
}

export default Portfolio
