import { Fragment } from "react/jsx-runtime";
import { useEffect, useRef, useState } from "react";
import style from "./team.module.scss";
import Subheader from "../subheader/subheader";
import { USALProvider } from "@usal/react";

const teamMembers = [
  { role: "Full Stack Developer and Trainer", name: "Team Member Name" },
  { role: "Full Stack Developer and Trainer", name: "Team Member Name" },
  { role: "Full Stack Developer and Trainer", name: "Team Member Name" },
];

function Team() {
  const viewportRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);
  const [translateX, setTranslateX] = useState(0);

  useEffect(() => {
    const viewport = viewportRef.current;
    const track = trackRef.current;
    if (!viewport || !track) return;

    const applyTranslate = (i: number) => {
      const card = track.children[i] as HTMLElement | undefined;
      if (!card) return;
      const maxScroll = Math.max(track.scrollWidth - viewport.clientWidth, 0);
      setTranslateX(Math.min(card.offsetLeft, maxScroll));
    };

    applyTranslate(index);

    const handleResize = () => applyTranslate(index);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [index]);

  const goTo = (i: number) => {
    setIndex(Math.max(0, Math.min(i, teamMembers.length - 1)));
  };

  return (
    <Fragment>
      <USALProvider>
        <section className={style.team}>
          <Subheader
            data={{
              title: "OUR TEAM",
              color: "#0a5c61",
              backgroundColor: "#ffffff",
            }}
          />
          <h2 data-usal="fade-l delay-200" className={style.heading}>
            The Minds Behind the Solutions
          </h2>
          <div className={style.viewport} ref={viewportRef}>
            <div
              className={style.cardsTrack}
              ref={trackRef}
              style={{ transform: `translateX(-${translateX}px)` }}
            >
              {teamMembers.map((member, i) => (
                <div data-usal="fade-l delay-400" className={style.card} key={i}>
                  <div className={style.photo}></div>
                  <div className={style.info}>
                    <p className={style.role}>{member.role}</p>
                    <p className={style.name}>{member.name}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className={style.controls}>
            <button
              type="button"
              className={style.arrow}
              onClick={() => goTo(index - 1)}
              disabled={index === 0}
              aria-label="Previous"
            >
              ‹
            </button>
            <div className={style.dots}>
              {teamMembers.map((_, i) => (
                <span
                  key={i}
                  className={i === index ? style.dotActive : style.dot}
                  onClick={() => goTo(i)}
                ></span>
              ))}
            </div>
            <button
              type="button"
              className={style.arrow}
              onClick={() => goTo(index + 1)}
              disabled={index === teamMembers.length - 1}
              aria-label="Next"
            >
              ›
            </button>
          </div>
        </section>
      </USALProvider>
    </Fragment>
  );
}

export default Team;
