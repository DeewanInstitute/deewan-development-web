import { Fragment } from "react/jsx-runtime";
import { useEffect, useRef, useState } from "react";
import style from "./team.module.scss";
import Subheader from "../subheader/subheader";
import { USALProvider } from "@usal/react";

const teamMembers = [
  {
    role: "Head of Product Design and IT",
    name: "Saba Saeed",
    img: "/assets/images/team/saba.webp",
  },
  {
    role: "Full Stack Developer and Trainer",
    name: "Qutaibh Subuh",
    img: "/assets/images/team/qutaibh.webp",
  },

  {
    role: "Media and Digital Marketing Sp.",
    name: "Rula Tbakhi",
    img: "/assets/images/team/rula.webp",
  },
  {
    role: "Media and Digital Coordinator",
    name: "Aya Al Saie",
    img: "/assets/images/team/aya.webp",
  },
];

const MOBILE_BREAKPOINT = 768;
const getPerPage = () =>
  typeof window !== "undefined" && window.innerWidth <= MOBILE_BREAKPOINT
    ? 1
    : 2;

function Team() {
  const viewportRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [page, setPage] = useState(0);
  const [translateX, setTranslateX] = useState(0);
  const [perPage, setPerPage] = useState(getPerPage);
  const pageCount = Math.ceil(teamMembers.length / perPage);

  useEffect(() => {
    const viewport = viewportRef.current;
    const track = trackRef.current;
    if (!viewport || !track) return;

    const applyTranslate = (p: number) => {
      const card = track.children[p * perPage] as HTMLElement | undefined;
      if (!card) return;
      const maxScroll = Math.max(track.scrollWidth - viewport.clientWidth, 0);
      setTranslateX(Math.min(card.offsetLeft, maxScroll));
    };

    applyTranslate(page);

    const handleResize = () => {
      const nextPerPage = getPerPage();
      setPerPage((prev) => (prev === nextPerPage ? prev : nextPerPage));
      applyTranslate(page);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [page, perPage]);

  useEffect(() => {
    setPage((p) => Math.max(0, Math.min(p, pageCount - 1)));
  }, [pageCount]);

  const goTo = (p: number) => {
    setPage(Math.max(0, Math.min(p, pageCount - 1)));
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
              style={{ transform: `translateX(${-translateX}px)` }}
            >
              {teamMembers.map((member, i) => (
                <div
                  data-usal="fade-l delay-400"
                  className={style.card}
                  key={i}
                >
                  <img
                    className={style.photo}
                    src={member.img}
                    alt={member.name}
                  />
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
              onClick={() => goTo(page - 1)}
              disabled={page === 0}
              aria-label="Previous"
            >
              ‹
            </button>
            <div className={style.dots}>
              {Array.from({ length: pageCount }).map((_, i) => (
                <span
                  key={i}
                  className={i === page ? style.dotActive : style.dot}
                  onClick={() => goTo(i)}
                ></span>
              ))}
            </div>
            <button
              type="button"
              className={style.arrow}
              onClick={() => goTo(page + 1)}
              disabled={page === pageCount - 1}
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
