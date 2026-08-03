import { Fragment } from "react/jsx-runtime";
import { useRef } from "react";
import style from "./team.module.scss";
import Subheader from "../subheader/subheader";
import { useScrollPin } from "../../hooks/useScrollPin";

const teamMembers = [
  { role: "Full Stack Developer and Trainer", name: "Team Member Name" },
  { role: "Full Stack Developer and Trainer", name: "Team Member Name" },
  { role: "Full Stack Developer and Trainer", name: "Team Member Name" },
];

function Team() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  useScrollPin(sectionRef, contentRef);

  return (
    <Fragment>
      <section ref={sectionRef} className={style.team}>
        <div ref={contentRef}>
          <Subheader
            data={{
              title: "OUR TEAM",
              color: "#0a5c61",
              backgroundColor: "#ffffff",
            }}
          />
          <h2 className={style.heading}>The Minds Behind the Solutions</h2>
          <div className="row">
            {teamMembers.map((member, index) => (
              <div className="col-lg-4" key={index}>
                <div className={style.card}>
                  <div className={style.photo}></div>
                  <div className={style.info}>
                    <p className={style.role}>{member.role}</p>
                    <p className={style.name}>{member.name}</p>
                  </div>
                </div>
              </div>
            ))}
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

export default Team;
