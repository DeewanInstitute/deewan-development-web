import { Fragment } from "react/jsx-runtime";
import { useRef } from "react";
import style from "./competencies.module.scss";
import Subheader from "../subheader/subheader";
import { useScrollPin } from "../../hooks/useScrollPin";

const competencies = [
  {
    icon: "/assets/images/icons/webdesign.webp",
    title: "Web Design",
    tags: ["UI/UX", "Figma", "ProtoPie"],
  },
  {
    icon: "/assets/images/icons/mobileapp.webp",
    title: "Mobile App Design",
    tags: ["UI/UX", "Figma", "ProtoPie"],
  },
  {
    icon: "/assets/images/icons/webdev.webp",
    title: "Web Development",
    tags: ["React JS", "Node JS", "Tailwind"],
  },
  {
    icon: "/assets/images/icons/mobiledev.webp",
    title: "Mobile Application Development",
    tags: ["Flutter", "Firebase", "MongoDB"],
  },
  {
    icon: "/assets/images/icons/socialmedia.webp",
    title: "Social Media Management",
    tags: ["Strategy", "Planning", "Creation"],
  },
  {
    icon: "/assets/images/icons/digital.webp",
    title: "Digital Advertising",
    tags: ["Meta Ads", "Google Ads"],
  },
];

function Competencies() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  useScrollPin(sectionRef, contentRef);

  return (
    <Fragment>
      <section id="services" ref={sectionRef} className={style.competencies}>
        <div ref={contentRef}>
          <Subheader
            data={{
              title: "Our Services",
              color: "#ffffff",
              backgroundColor: "#0a5c61",
            }}
          />
          <h2 className={style.heading}>Our Core Competencies</h2>
          <p className={style.description}>
            We provide end-to-end digital solutions tailored to your
            organization's needs. From strategy and design to development,
            deployment, and ongoing support, we help businesses leverage
            technology to improve efficiency, enhance user experiences, and
            achieve lasting growth.
          </p>
          <div className="row">
            {competencies.map((item) => (
              <div className="col-lg-4 col-md-6" key={item.title}>
                <div className={style.card}>
                  <div className={style.iconWrapper}>
                    <img src={item.icon} alt={item.title} />
                  </div>
                  <div className="d-flex flex-column h-100 justify-content-end align-items-center">
                    <h3 className={style.cardTitle}>{item.title}</h3>
                    <div className={style.tags}>
                      {item.tags.map((tag) => (
                        <span className={style.tag} key={tag}>
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </Fragment>
  );
}

export default Competencies;
