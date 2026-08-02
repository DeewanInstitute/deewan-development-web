import { Fragment } from "react/jsx-runtime";
import style from "./portfolio.module.scss";
import Subheader from "../subheader/subheader";

function Portfolio() {
  return (
    <Fragment>
      <section className={style.portfolio}>
        <Subheader
          data={{
            title: "PORTFOLIO",
            color: "#0a5c61",
            backgroundColor: "#ffffff",
          }}
        />
        <h2 className={style.heading}>Deewan Institute</h2>
        <p className={style.description}>
          Explore our recent projects and see how we've helped organizations
          transform their digital presence. Each case study highlights our
          approach to solving real-world challenges through thoughtful design
          and robust technology.
        </p>
        <div className={style.showcase}>
          <div className={style.laptop}>
            <div className={style.screen}>
              {/* Swap in the Deewan Institute project screenshot once available */}
              <div className={style.placeholder}>Project Preview</div>
            </div>
            <div className={style.base}></div>
          </div>
          <div className={style.dots}>
            <span className={style.dotActive}></span>
            <span className={style.dot}></span>
            <span className={style.dot}></span>
          </div>
        </div>
      </section>
    </Fragment>
  );
}

export default Portfolio;
