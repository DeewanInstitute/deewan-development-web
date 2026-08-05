import { Fragment } from "react/jsx-runtime";
import { useEffect, useRef, useState } from "react";
import style from "./competencies.module.scss";
import Subheader from "../subheader/subheader";
import { USALProvider } from "@usal/react";

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

const PAGE_COUNT = 3;
const PAGE_SIZE = Math.ceil(competencies.length / PAGE_COUNT);

function Competencies() {
  const viewportRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [page, setPage] = useState(0);
  const [translateX, setTranslateX] = useState(0);

  useEffect(() => {
    const viewport = viewportRef.current;
    const track = trackRef.current;
    if (!viewport || !track) return;

    const applyTranslate = (p: number) => {
      const cardIndex = Math.min(p * PAGE_SIZE, competencies.length - 1);
      const card = track.children[cardIndex] as HTMLElement | undefined;
      if (!card) return;
      const maxScroll = Math.max(track.scrollWidth - viewport.clientWidth, 0);
      setTranslateX(Math.min(card.offsetLeft, maxScroll));
    };

    applyTranslate(page);

    const handleResize = () => applyTranslate(page);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [page]);

  const goTo = (p: number) => {
    setPage(Math.max(0, Math.min(p, PAGE_COUNT - 1)));
  };

  return (
    <Fragment>
      <USALProvider>
        <section id="services" className={style.competencies}>
          <Subheader
            data={{
              title: "Our Services",
              color: "#ffffff",
              backgroundColor: "#0a5c61",
            }}
          />
          <h2 data-usal="fade-u delay-100 backwards" className={style.heading}>Our Core Competencies</h2>
          <p data-usal="fade-u delay-200" className={style.description}>
            We provide end-to-end digital solutions tailored to your
            organization's needs. From strategy and design to development,
            deployment, and ongoing support, we help businesses leverage
            technology to improve efficiency, enhance user experiences, and
            achieve lasting growth.
          </p>
          <div className={style.viewport} ref={viewportRef}>
            <div
              className={style.cardsTrack}
              ref={trackRef}
              style={{ transform: `translateX(-${translateX}px)` }}
            >
              {competencies.map((item) => (
                <div data-usal="fade-u delay-300" className={style.card} key={item.title}>
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
              {Array.from({ length: PAGE_COUNT }).map((_, p) => (
                <span
                  key={p}
                  className={p === page ? style.dotActive : style.dot}
                  onClick={() => goTo(p)}
                ></span>
              ))}
            </div>
            <button
              type="button"
              className={style.arrow}
              onClick={() => goTo(page + 1)}
              disabled={page === PAGE_COUNT - 1}
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

export default Competencies;
