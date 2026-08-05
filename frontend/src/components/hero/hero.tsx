import { Fragment } from "react/jsx-runtime";
import style from "./hero.module.scss";
import Subheader from "../subheader/subheader";
import { USALProvider } from "@usal/react";
function Hero() {
  return (
    <Fragment>
      <USALProvider>
        <div className={style.hero}>
          <div className="row p-4 pb-0 pe-lg-0 pt-lg-3 align-items-end rounded-3">
            <div className="col-12 col-lg-7 p-3 p-lg-5 pt-lg-5">
              <Subheader
                data={{
                  title: "ENGINEERING MODERNITY",
                  color: "#0a5c61",
                  backgroundColor: "#ffffff",
                }}
              />

              <h1
                data-usal="fade-l delay-200"
                className="display-4 fw-bold lh-1"
                id={style.white}
              >
                Empowering Your
              </h1>
              <h1
                data-usal="fade-l delay-400"
                className="display-4 fw-bold lh-1"
                id={style.lightWhite}
              >
                Digital Future
              </h1>
              <p data-usal="fade-l delay-400" className="lead py-4">
                Innovative web and mobile solutions tailored for your business.
                We bridge the gap between technical mastery and business
                precision.
              </p>
              <div className="d-grid gap-2 d-md-flex justify-content-md-start mb-4 mb-lg-3">
                <button
                  data-usal="fade-l delay-200"
                  type="button"
                  className="btn btn-lg px-4 me-md-2 fw-bold"
                  id={style.started}
                >
                  Get Started
                  <svg
                    style={{ marginInline: "10px" }}
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
                </button>
                <button
                  data-usal="fade-l delay-400"
                  type="button"
                  className="btn btn-lg px-4"
                  id={style.stack}
                >
                  View Our Tech Stack
                </button>
              </div>
            </div>
            <div className="col-12 col-lg-4" data-usal="fade-r delay-400">
              <img src="/assets/images/others/image 14.png" alt="" className={style.heroImage} />
            </div>
          </div>
        </div>
      </USALProvider>
    </Fragment>
  );
}

export default Hero;
