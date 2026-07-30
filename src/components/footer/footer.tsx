import "bootstrap";
import style from "./footer.module.scss";

function Footer() {
  return (
    <footer
      className="d-flex flex-wrap justify-content-between align-items-center py-3 my-4 border-top"
      id={style.footer}
    >
      <div className="col-md-4 d-flex align-items-center">
        <a
          href="/"
          className="mb-3 me-2 mb-md-0 text-decoration-none lh-1"
          aria-label="Bootstrap"
        >
          <img
            className={style.logo}
            src="/assets/images/logos/logoWhite.webp"
          />
        </a>
      </div>
      <div className="col-md-4" id={style.copyright}>
        <span className="mb-3 mb-md-0">
          © 2026 Deewan for Digital Learning Development
        </span>
      </div>
      <ul className="nav col-sm-4 justify-content-center list-unstyled d-flex flex-row flex-nowrap">
        <li className="mx-1">
          <a className="text-decoration-none" href="#" aria-label="Instagram">
            <img
              className={style.icon}
              src="/assets/images/icons/instagram.webp"
              alt="instagram"
            />
          </a>
        </li>
        <li className="mx-1">
          <a className="text-decoration-none" href="#" aria-label="LinkedIn">
            <img
              className={style.icon}
              src="/assets/images/icons/linkedin.webp"
              alt="linkedin"
            />
          </a>
        </li>
        <li className="mx-1">
          <a className="text-decoration-none" href="#" aria-label="Facebook">
            <img
              className={style.icon}
              src="/assets/images/icons/facebook.webp"
              alt="facebook"
            />
          </a>
        </li>
      </ul>
    </footer>
  );
}

export default Footer;
