import { Fragment } from "react/jsx-runtime";
import "bootstrap";
import style from "./navbar.module.scss";

function Navbar() {
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
        <ul className="nav col-12 col-md-auto mb-2 justify-content-center mb-md-0">
          <li className="px-2" id={style.navLink}>
            <a href="#about" className="nav-link px-2 link-secondary">
              About
            </a>
          </li>
          <li className="px-2" id={style.navLink}>
            <a href="#portfolio" className="nav-link px-2">
              Portfolio
            </a>
          </li>
          <li className="px-2" id={style.navLink}>
            <a href="#services" className="nav-link px-2">
              Services
            </a>
          </li>
          <li className="px-2" id={style.navLink}>
            <a href="#contact" className="nav-link px-2">
              Contact
            </a>
          </li>
        </ul>
        <div className="col-md-3 text-end">
          <button type="button" className="btn btn-primary" id={style.button}>
            Get Started
          </button>
        </div>
      </header>
    </Fragment>
  );
}

export default Navbar;
