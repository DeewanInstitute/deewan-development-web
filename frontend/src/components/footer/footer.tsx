import { Link } from 'react-router-dom'
import './footer.scss'

const socials = [
  {
    label: 'Instagram',
    href: 'https://www.instagram.com/deewan_for_digital_learning/',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
        <rect x="3" y="3" width="18" height="18" rx="5" />
        <circle cx="12" cy="12" r="4.2" />
        <circle cx="17.4" cy="6.6" r="1" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/company/deewan-for-digital-learning-development/',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor">
        <rect x="3" y="9" width="4" height="12" />
        <circle cx="5" cy="5" r="2.2" />
        <path d="M10 9h3.8v1.8c.7-1.2 2.1-2.1 4-2.1 3.3 0 4.2 2.1 4.2 5.3V21h-4v-6.1c0-1.5-.4-2.5-1.9-2.5-1.6 0-2.1 1.1-2.1 2.6V21h-4z" />
      </svg>
    ),
  },
  {
    label: 'Facebook',
    href: 'https://www.facebook.com/people/Deewan-for-Digital-Learning-Developmen/61589663083228/',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor">
        <path d="M13.5 21v-8h2.7l.5-3.3h-3.2V7.6c0-1 .4-1.7 1.8-1.7h1.5V3.1C16.1 3 15.2 3 14.3 3c-2.6 0-4.1 1.5-4.1 4.2v2.5H7.5V13h2.7v8z" />
      </svg>
    ),
  },
]

function Footer() {
  return (
    <footer className="dw-footer">
      <div className="dw-footer-bar dw-container">
        <Link to="/" className="dw-footer-logo" aria-label="Deewan – home">
          <img src="/assets/images/logos/logoWhite.webp" alt="Deewan for Digital Learning Development" />
        </Link>

        <p className="dw-footer-copyright">© 2026 Deewan for Digital Learning Development</p>

        <ul className="dw-footer-socials">
          {socials.map(({ label, href, icon }) => (
            <li key={label}>
              <a href={href} target="_blank" rel="noreferrer" aria-label={label}>
                {icon}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  )
}

export default Footer
