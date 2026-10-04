import { useEffect, useRef } from 'react'
import Button from '../../components/button/button'
import SplitWords from '../../components/splitWords/splitWords'
import { useScrollReveal } from '../../hooks/useScrollReveal'
import { offerHero, offers } from '../../data/offer'
import './offer.scss'

function Offer() {
  const pageRef = useRef<HTMLDivElement>(null)
  useScrollReveal(pageRef)

  useEffect(() => {
    document.title = 'What We Offer | Deewan Development'
  }, [])

  return (
    <div ref={pageRef} className="offer">
      <section className="offer-hero">
        <div className="offer-shape offer-shape-left offer-hero-shape dw-float" data-reveal="fade" />
        <div className="offer-shape offer-shape-right offer-hero-shape dw-float" data-reveal="fade" />

        <div className="dw-container">
          <div className="offer-hero-card" data-reveal="zoom">
            <p className="offer-hero-label" data-reveal="up">
              {offerHero.label}
            </p>
            <h1 className="offer-hero-title" data-reveal="words">
              <SplitWords text={offerHero.title} />
            </h1>
            <p className="offer-hero-text" data-reveal="up">
              {offerHero.text}
            </p>
          </div>
        </div>
      </section>

      {offers.map(({ id, eyebrow, title, intro, capabilities, image, decor }, index) => (
        <section key={id} id={id} className={`offer-item${index % 2 ? ' offer-item-flip' : ''}`}>
          {decor && (
            <div
              className={`offer-shape offer-shape-${decor} offer-item-shape dw-float`}
              data-reveal="fade"
            />
          )}

          <div className="dw-container">
            {/* number badge, a line that draws itself, and a dot at the end */}
            <div className="offer-item-top">
              <div className="offer-badge" data-reveal="pop">
                <span className="offer-badge-ring" />
                <span className="offer-badge-number">{String(index + 1).padStart(2, '0')}</span>
              </div>
              <span className="offer-item-line" data-reveal="line" />
              <span className="offer-item-dot" data-reveal="pop" />
            </div>

            <p className="offer-item-eyebrow" data-reveal="up">
              {eyebrow}
            </p>
            <h2 className="offer-item-title" data-reveal="words">
              <SplitWords text={title} />
            </h2>

            <div className="offer-item-body">
              <div className="offer-item-text">
                {intro.map((paragraph) => (
                  <p key={paragraph} data-reveal="up">
                    {paragraph}
                  </p>
                ))}

                <h3 data-reveal="up">Our capabilities include:</h3>
                <ul>
                  {capabilities.map((capability) => (
                    <li key={capability} data-reveal="slide">
                      {capability}
                    </li>
                  ))}
                </ul>

                <div data-reveal="up">
                  <Button to="/contact" variant="amber" className="offer-contact">
                    Contact Us
                  </Button>
                </div>
              </div>

              <div className="offer-item-art" data-reveal={index % 2 ? 'left' : 'right'}>
                <img className="dw-float" src={image} alt="" loading="lazy" />
              </div>
            </div>
          </div>
        </section>
      ))}
    </div>
  )
}

export default Offer
