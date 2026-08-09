import { Fragment } from "react/jsx-runtime";
import style from "./notFound.module.scss";

function NotFound() {
  return (
    <Fragment>
      <section className={style.notFound}>
        <p className={style.code}>404</p>
        <h1 className={style.heading}>Page Not Found</h1>
        <p className={style.description}>
          The page you're looking for doesn't exist or may have been moved.
          Let's get you back on track.
        </p>
        <a href="/" className={style.home}>
          Back to Home
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
          >
            <path
              d="M12.175 9H0V7H12.175L6.575 1.4L8 0L16 8L8 16L6.575 14.6L12.175 9Z"
              fill="white"
            />
          </svg>
        </a>
      </section>
    </Fragment>
  );
}

export default NotFound;
