import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import Button from '../../components/button/button'
import HeroArt from '../../components/heroArt/heroArt'
import PillLabel from '../../components/pillLabel/pillLabel'
import RoughArrow from '../../components/roughArrow/roughArrow'
import ServiceSlider from '../../components/serviceSlider/serviceSlider'
import SplitWords from '../../components/splitWords/splitWords'
import { homeHero, homePortfolio, homeServices, homeWho } from '../../data/home'
import { useScrollReveal } from '../../hooks/useScrollReveal'
import './home.scss'

function Home() {
  const pageRef = useRef<HTMLDivElement>(null)
  useScrollReveal(pageRef)

  useEffect(() => {
    document.title = 'Deewan Development'
  }, [])

  const { project } = homePortfolio

  return (
    <div ref={pageRef} className="home">
      {/* the faint pink network: one copy behind the page, one laid over the hero and portfolio cards */}
      <div className="home-bg home-bg-back" aria-hidden="true">
        <span className="home-bg-layer" />
      </div>
      <div className="home-bg home-bg-front" aria-hidden="true">
        <span className="home-bg-layer" />
      </div>

      <section className="home-hero">
        <div className="home-hero-card home-wide" data-reveal="zoom">
          <HeroArt />

          <div className="home-hero-body">
            <h1 className="home-hero-title" data-reveal="words">
              {homeHero.lines.map(({ text, highlight }) => (
                <span key={text} className="home-hero-line">
                  <SplitWords text={text} highlight={highlight} />
                </span>
              ))}
            </h1>
            <p className="home-hero-text" data-reveal="up">
              {homeHero.text}
            </p>
            <div className="home-hero-actions" data-reveal="up">
              <Button to={homeHero.primary.to} variant="solid-amber">
                {homeHero.primary.label}
              </Button>
              <Button to={homeHero.secondary.to} variant="solid-soft">
                {homeHero.secondary.label}
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="home-who" aria-labelledby="home-who-title">
        <PillLabel variant="amber" data-reveal="zoom">
          {homeWho.label}
        </PillLabel>
        <h2 id="home-who-title" className="home-title" data-reveal="words">
          {homeWho.title.map((line) => (
            <span key={line} className="home-title-line">
              <SplitWords text={line} />
            </span>
          ))}
        </h2>
        <div className="home-who-text">
          {homeWho.paragraphs.map((paragraph) => (
            <p key={paragraph} data-reveal="up">
              {paragraph}
            </p>
          ))}
        </div>
      </section>

      <section className="home-services" aria-labelledby="home-services-title">
        <PillLabel variant="amber" data-reveal="zoom">
          {homeServices.label}
        </PillLabel>
        <h2 id="home-services-title" className="home-title home-title-services" data-reveal="words">
          <SplitWords text={homeServices.title} />
        </h2>
        <p className="home-services-text" data-reveal="up">
          {homeServices.description}
        </p>
        <div className="home-services-slider" data-reveal="zoom">
          <ServiceSlider cards={homeServices.cards} />
        </div>
      </section>

      <section className="home-portfolio home-wide" aria-labelledby="home-portfolio-title">
        <div className="home-portfolio-card">
          <PillLabel variant="outline" data-reveal="zoom">
            {homePortfolio.label}
          </PillLabel>
          <h2 id="home-portfolio-title" className="home-title home-portfolio-title" data-reveal="words">
            <SplitWords text={homePortfolio.title} />
          </h2>
          <p className="home-portfolio-text" data-reveal="up">
            {homePortfolio.description}
          </p>

          <Link to={project.to} className="home-portfolio-project" data-reveal="zoom">
            <span className="home-laptop">
              <img className="home-laptop-frame" src={project.laptop} alt="" loading="lazy" />
              <img
                className="home-laptop-screen"
                src={project.screen}
                alt={`${project.name} website`}
                loading="lazy"
              />
            </span>
            <span className="home-portfolio-row">
              <span className="home-portfolio-name">{project.name}</span>
              <RoughArrow size="large" />
            </span>
          </Link>
        </div>
      </section>
    </div>
  )
}

export default Home
