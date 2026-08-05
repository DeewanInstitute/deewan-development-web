import { Fragment } from "react/jsx-runtime";
import { useEffect, useState } from "react";
import "bootstrap";
import style from "./navbar.module.scss";

const navItems = [
  { href: "#about", label: "About" },
  { href: "#portfolio", label: "Portfolio" },
  { href: "#services", label: "Services" },
  { href: "#contact", label: "Contact" },
];

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <Fragment>
      <header
        className="d-flex flex-wrap align-items-center justify-content-center justify-content-md-between py-3 mb-4 border-bottom"
        id={style.navbar}
      >
        <div className="col-md-3 mb-2 mb-md-0">
          <a
            href="/"
            className="d-inline-flex link-body-emphasis text-decoration-none"
            id={style.logo}
          >
            <img src="/assets/images/logos/logo.png" />
          </a>
        </div>
        <ul
          className={`nav col-12 col-md-auto mb-2 justify-content-center mb-md-0 ${style.navList}`}
        >
          {navItems.map((item) => (
            <li className="px-2" id={style.navLink} key={item.href}>
              <a href={item.href} className="nav-link px-2 link-secondary">
                {item.label}
              </a>
            </li>
          ))}
        </ul>
        <div className={`col-md-3 text-end ${style.ctaDesktop}`}>
          <a href="#contact">
            <button type="button" className="btn btn-primary" id={style.button}>
              Get Started
            </button>
          </a>
        </div>
        <button
          type="button"
          className={`${style.menuToggle} ${isMenuOpen ? style.menuToggleOpen : ""}`}
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          aria-expanded={isMenuOpen}
          onClick={() => setIsMenuOpen((v) => !v)}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </header>

      <div className={`${style.overlay} ${isMenuOpen ? style.overlayOpen : ""}`}>
        <ul className={style.overlayNav}>
          {navItems.map((item) => (
            <li key={item.href}>
              <a href={item.href} onClick={closeMenu}>
                {item.label}
              </a>
            </li>
          ))}
        </ul>
        <a href="#contact" onClick={closeMenu}>
          <button type="button" className={style.overlayButton}>
            Get Started
          </button>
        </a>
      </div>
    </Fragment>
  );
}

export default Navbar;
