import { Fragment } from "react/jsx-runtime";
import style from "./about.module.scss";
import Subheader from "../subheader/subheader";

function About() {
  return (
    <Fragment>
      <section className={style.about}>
        <div className="row mx-auto">
          <div
            className="col-lg-6 align-items-start align-content-center"
            id={style.right}
          >
            <Subheader
              data={{
                title: "WHO WE ARE",
                color: "#0a5c61",
                backgroundColor: "#ffffff",
              }}
            />
            <h1 className={style.heading}>
              Technology <br></br>That Solves <br></br> Real Problems
            </h1>
          </div>
          <div className="col-lg-6" id={style.left}>
            <div className="py-2">
              <h2 className={style.subheading}>About Us</h2>
              <p className={style.description}>
                Deewan for Digital Learning Development is a technology company
                specializing in digital transformation, software development,
                and innovative learning solutions. We partner with businesses,
                educational institutions, NGOs, and government organizations to
                design, develop, and implement technology that improves
                productivity, enhances user experiences, and drives measurable
                results.
              </p>
              <p className={style.description}>
                From custom software and mobile applications to learning
                management systems and digital training platforms, we deliver
                solutions that combine creativity, technology, and strategy.
              </p>
            </div>
            <div className="py-2">
              <h2 className={style.subheading}>Our Mission</h2>
              <p className={style.description}>
                To become a trusted global partner in digital learning, helping
                organizations embrace technology to create meaningful learning
                experiences that inspire growth and lifelong development.
              </p>
            </div>
          </div>
        </div>
      </section>
    </Fragment>
  );
}

export default About;
