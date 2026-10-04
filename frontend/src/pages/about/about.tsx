import { useEffect, useRef } from 'react'
import Button from '../../components/button/button'
import SectionHeading from '../../components/sectionHeading/sectionHeading'
import ServiceRing from '../../components/serviceRing/serviceRing'
import SplitWords from '../../components/splitWords/splitWords'
import { aboutHero, aboutServices, aboutTeam, aboutWho } from '../../data/about'
import { useScrollReveal } from '../../hooks/useScrollReveal'
import './about.scss'

function About() {
  const pageRef = useRef<HTMLDivElement>(null)
  useScrollReveal(pageRef)

  useEffect(() => {
    document.title = 'About Us | Deewan Development'
  }, [])

  return (
    <div ref={pageRef} className="about">
      <section className="about-hero dw-container">
        <div className="about-hero-card" data-reveal="zoom">
          <div className="about-hero-shape about-hero-shape-left dw-float" data-reveal="fade" />
          <div className="about-hero-shape about-hero-shape-right dw-float" data-reveal="fade" />
          <p className="about-hero-label" data-reveal="up">
            {aboutHero.label}
          </p>
          <h1 className="about-hero-title" data-reveal="words">
            <SplitWords text={aboutHero.title} highlight={aboutHero.highlight} />
          </h1>
        </div>
      </section>

      <section className="about-who dw-container dw-section">
        <SectionHeading label={aboutWho.label} title={aboutWho.title} />

        <div className="about-who-body">
          <div className="about-who-text">
            {aboutWho.paragraphs.map((paragraph) => (
              <p key={paragraph} data-reveal="up">
                {paragraph}
              </p>
            ))}
            <div className="about-who-actions" data-reveal="up">
              <Button href="#services" variant="amber">
                Check our Services
              </Button>
              <Button to="/contact" variant="teal">
                Contact Us
              </Button>
            </div>
          </div>

          <div className="about-who-card" data-reveal="right">
            <p className="about-who-card-title dw-hand">
              Website
              <br />
              Plan
            </p>
            <div className="about-who-plan dw-float" role="img" aria-label="Website wireframe" />
          </div>
        </div>
      </section>

      <section id="services" className="about-services dw-section">
        <div className="dw-container">
          <SectionHeading label={aboutServices.label} title={aboutServices.title} />
        </div>
        <div className="about-services-ring dw-container" data-reveal="zoom">
          <ServiceRing services={aboutServices.services} />
        </div>
      </section>

      <section className="about-team dw-container dw-section">
        <SectionHeading
          label={aboutTeam.label}
          title={aboutTeam.title}
          description={aboutTeam.description}
        />

        <div className="about-team-grid">
          {aboutTeam.members.map((member) => (
            <article key={member.name} className="about-team-card" data-reveal="up">
              <div className="about-team-photo">
                {member.photo ? (
                  <img src={member.photo} alt={member.name} loading="lazy" />
                ) : (
                  <svg viewBox="0 0 24 24" fill="currentColor" role="img" aria-label="Photo coming soon">
                    <circle cx="12" cy="8" r="4.2" />
                    <path d="M3.5 21c0-4.7 3.8-7.5 8.5-7.5s8.5 2.8 8.5 7.5z" />
                  </svg>
                )}
              </div>
              <h3>{member.role}</h3>
              <p>{member.name}</p>
            </article>
          ))}
        </div>
      </section>
    </div>
  )
}

export default About
