import { Fragment } from "react/jsx-runtime";
import style from "./team.module.scss";
import Subheader from "../subheader/subheader";

const teamMembers = [
  { role: "Full Stack Developer and Trainer", name: "Team Member Name" },
  { role: "Full Stack Developer and Trainer", name: "Team Member Name" },
  { role: "Full Stack Developer and Trainer", name: "Team Member Name" },
];

function Team() {
  return (
    <Fragment>
      <section className={style.team}>
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
      </section>
    </Fragment>
  );
}

export default Team;
