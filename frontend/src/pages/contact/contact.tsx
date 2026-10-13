import { useEffect, useRef, useState } from 'react'
import type { FormEvent, ReactNode } from 'react'
import LottieGlobe from '../../components/lottieGlobe/lottieGlobe'
import SplitWords from '../../components/splitWords/splitWords'
import { useScrollReveal } from '../../hooks/useScrollReveal'
import { offers } from '../../data/offer'
import './contact.scss'

// empty in dev: requests go to /api on the Vite server, which proxies them to the backend
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? ''
const FALLBACK_ERROR = 'Something went wrong. Please try again later.'

type Status = 'idle' | 'sending' | 'sent' | 'error'

const icons: Record<string, ReactNode> = {
  email: (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M20 4H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2Zm0 4-8 5-8-5V6l8 5 8-5v2Z" />
    </svg>
  ),
  phone: (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M6.6 10.8a15.1 15.1 0 0 0 6.6 6.6l2.2-2.2a1 1 0 0 1 1-.25 11.4 11.4 0 0 0 3.6.57 1 1 0 0 1 1 1V20a1 1 0 0 1-1 1A17 17 0 0 1 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.25.2 2.45.57 3.57a1 1 0 0 1-.25 1L6.6 10.8Z" />
    </svg>
  ),
  location: (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 2a7 7 0 0 0-7 7c0 5.25 7 13 7 13s7-7.75 7-13a7 7 0 0 0-7-7Zm0 2a5 5 0 0 1 5 5c0 3.2-3.2 7.6-5 9.9-1.8-2.3-5-6.7-5-9.9a5 5 0 0 1 5-5Zm0 2.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5Z" />
    </svg>
  ),
}

const details = [
  { icon: 'email', label: 'Email', value: 'project@deewandevelopment.com', href: 'mailto:project@deewandevelopment.com' },
  { icon: 'phone', label: 'Phone Number', value: '(962) 7-7820-2081', href: 'tel:+962778202081' },
  { icon: 'location', label: 'Location', value: 'Amman, Jordan' },
]

function Contact() {
  const pageRef = useRef<HTMLDivElement>(null)
  const [status, setStatus] = useState<Status>('idle')
  const [errorMessage, setErrorMessage] = useState('')
  useScrollReveal(pageRef)

  useEffect(() => {
    document.title = 'Contact Us | Deewan Development'
  }, [])

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = e.currentTarget
    const data = new FormData(form)

    setStatus('sending')
    setErrorMessage('')

    try {
      const response = await fetch(`${API_BASE_URL}/api/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fullName: data.get('fullName'),
          email: data.get('email'),
          service: data.get('service'),
          message: data.get('message'),
        }),
      })
      const result = await response.json().catch(() => ({}))

      if (!response.ok) throw new Error(result.error ?? FALLBACK_ERROR)

      setStatus('sent')
      form.reset()
    } catch (err) {
      setStatus('error')
      // fetch itself throws a TypeError when the server can't be reached
      setErrorMessage(err instanceof Error && !(err instanceof TypeError) ? err.message : FALLBACK_ERROR)
    }
  }

  return (
    <div ref={pageRef} className="contact">
      <div className="contact-shape contact-shape-left" data-reveal="fade">
        <LottieGlobe className="contact-shape-globe" />
      </div>
      <div className="contact-shape contact-shape-right" data-reveal="fade">
        <LottieGlobe className="contact-shape-globe" />
      </div>

      <section className="dw-container contact-body">
        <div className="contact-info">
          <h1 className="contact-title" data-reveal="words">
            <SplitWords text="Initiate Project" />
          </h1>
          <p className="contact-text" data-reveal="up">
            Ready to accelerate your digital transformation? Our technology experts are ready to discuss your
            vision and develop a roadmap tailored to your business.
          </p>

          <ul className="contact-details">
            {details.map(({ icon, label, value, href }) => (
              <li key={label} className="contact-detail" data-reveal="slide">
                <span className="contact-detail-icon">{icons[icon]}</span>
                <span className="contact-detail-text">
                  <span className="contact-detail-label">{label}</span>
                  {href ? (
                    <a className="contact-detail-value" href={href}>
                      {value}
                    </a>
                  ) : (
                    <span className="contact-detail-value">{value}</span>
                  )}
                </span>
              </li>
            ))}
          </ul>
        </div>

        <div className="contact-card" data-reveal="right">
          <form className="contact-form" onSubmit={handleSubmit}>
            <div className="contact-row">
              <label className="contact-field">
                <span className="contact-label">Full Name</span>
                <input className="contact-input" type="text" name="fullName" placeholder="John Doe" autoComplete="name" required />
              </label>
              <label className="contact-field">
                <span className="contact-label">Work Email</span>
                <input
                  className="contact-input"
                  type="email"
                  name="email"
                  placeholder="john@company.com"
                  autoComplete="email"
                  required
                />
              </label>
            </div>

            <label className="contact-field">
              <span className="contact-label">Interested Service</span>
              <span className="contact-select">
                <select className="contact-input" name="service" defaultValue="">
                  <option value="" disabled>
                    Choose a service
                  </option>
                  {offers.map(({ id, title }) => (
                    <option key={id} value={title}>
                      {title}
                    </option>
                  ))}
                  <option value="Other">Other</option>
                </select>
              </span>
            </label>

            <label className="contact-field">
              <span className="contact-label">Message</span>
              <textarea
                className="contact-input contact-textarea"
                name="message"
                rows={4}
                placeholder="Tell us about your project requirements..."
                required
              />
            </label>

            <div className="contact-submit">
              <button type="submit" className="contact-button" disabled={status === 'sending'}>
                {status === 'sending' ? 'Sending...' : 'Send Inquiry'}
              </button>

              <p className={`contact-status contact-status-${status}`} role="status" aria-live="polite">
                {status === 'sent' && "Thanks! Your message has been sent. We'll be in touch soon."}
                {status === 'error' && errorMessage}
              </p>
            </div>
          </form>
        </div>
      </section>
    </div>
  )
}

export default Contact
