import { Fragment } from "react/jsx-runtime";
import { useEffect, useRef, useState } from "react";
import style from "./portfolio.module.scss";
import Subheader from "../subheader/subheader";
import { USALProvider } from "@usal/react";

const slides = [
  {
    title: "Deewan Institute — Web Platform",
    description:
      "A complete digital learning experience for Deewan Institute, redesigned from the ground up with a focus on clarity, performance, and a modern visual identity across every screen.",
    image: "/assets/images/portfolio/DIDesktop.webp",
    alt: "Deewan Institute desktop view",
  },
  {
    title: "Deewan Institute — Mobile Experience",
    description:
      "The same platform, reimagined for mobile: a streamlined navigation system and touch-first interactions that keep learners engaged on any device.",
    image: "/assets/images/portfolio/DIMobile.webp",
    alt: "Deewan Institute mobile view",
  },
  {
    title: "Deewan Tourism — Web Platform",
    description:
      "An immersive booking and discovery experience for Deewan Tourism, blending rich imagery with a fast, intuitive interface to help travelers plan with confidence.",
    image: "/assets/images/portfolio/DTDesktop.webp",
    alt: "Deewan Tourism desktop view",
  },
  {
    title: "Deewan Tourism — Mobile Experience",
    description:
      "A mobile-first companion to the Deewan Tourism platform, designed for on-the-go browsing, quick bookings, and seamless access to travel itineraries.",
    image: "/assets/images/portfolio/DTMobile.webp",
    alt: "Deewan Tourism mobile view",
  },
];

// How long (in viewport-heights) the section stays pinned while the
// carousel scrubs through the remaining slides — a fixed constant, not a
// measurement, so it's expressed directly as a spacer height in the JSX
// below (see hero.module.scss for why a fixed budget matters).
const EXTRA_SCROLL_VH = (slides.length - 1) * 100;

// Neither offsetTop nor getBoundingClientRect() can be trusted directly here:
// once a position:sticky element is actively stuck, both are observed to
// track the current scroll position instead of the static flow position.
// Summing preceding siblings' heights sidesteps this entirely, since
// position:sticky never changes an element's own height, only its position.
function getDocumentTop(el: HTMLElement) {
  let top = 0;
  let node: HTMLElement | null = el;
  while (node && node !== document.body) {
    let sibling = node.previousElementSibling as HTMLElement | null;
    while (sibling) {
      top += sibling.getBoundingClientRect().height;
      sibling = sibling.previousElementSibling as HTMLElement | null;
    }
    node = node.parentElement;
  }
  return top;
}

function Portfolio() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);

  const [viewportWidth, setViewportWidth] = useState(0);
  const [carouselProgress, setCarouselProgress] = useState(0);

  useEffect(() => {
    const updateViewportWidth = () => {
      if (viewportRef.current)
        setViewportWidth(viewportRef.current.clientWidth);
    };
    updateViewportWidth();
    const resizeObserver = new ResizeObserver(updateViewportWidth);
    if (viewportRef.current) resizeObserver.observe(viewportRef.current);

    // The sticky section stays pinned for exactly the spacer's height of
    // scroll (see the spacer div in the JSX below), and that whole window
    // drives the carousel scrub.
    const applyProgress = () => {
      const wrapperEl = wrapperRef.current;
      if (!wrapperEl) return;
      const extraScroll = (EXTRA_SCROLL_VH / 100) * window.innerHeight;
      const wrapperDocTop = getDocumentTop(wrapperEl);
      const scrolledPx = Math.min(
        Math.max(0, window.scrollY - wrapperDocTop),
        extraScroll,
      );
      setCarouselProgress(extraScroll > 0 ? scrolledPx / extraScroll : 0);
    };

    applyProgress();
    window.addEventListener("scroll", applyProgress, { passive: true });
    window.addEventListener("resize", applyProgress);

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener("scroll", applyProgress);
      window.removeEventListener("resize", applyProgress);
    };
  }, []);

  const activeIndex = Math.round(carouselProgress * (slides.length - 1));
  const trackOffset = carouselProgress * (slides.length - 1) * viewportWidth;

  return (
    <Fragment>
      <USALProvider>
        <div id="portfolio" ref={wrapperRef}>
          <section className={style.portfolio}>
            <Subheader
              data={{
                title: "PORTFOLIO",
                color: "#0a5c61",
                backgroundColor: "#ffffff",
              }}
            />
            <h2 data-usal="fade-l delay-200" className={style.heading}>Deewan Institute</h2>
            <p data-usal="fade-l delay-400" className={style.description}>
              Explore our recent projects and see how we've helped organizations
              transform their digital presence. Each case study highlights our
              approach to solving real-world challenges through thoughtful
              design and robust technology.
            </p>
            <div className={style.carouselViewport} ref={viewportRef}>
              <div
                className={style.track}
                style={{ transform: `translateX(-${trackOffset}px)` }}
              >
                {slides.map((slide, i) => (
                  <div
                    className={style.slide}
                    style={{ width: viewportWidth || "100%" }}
                    key={i}
                  >
                    <div className={style.slideText}>
                      <h3 className={style.slideTitle}>{slide.title}</h3>
                      <p className={style.slideDescription}>
                        {slide.description}
                      </p>
                    </div>
                    <div className={style.slideImage}>
                      <img src={slide.image} alt={slide.alt} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className={style.dots}>
              {slides.map((_, i) => (
                <span
                  key={i}
                  className={i === activeIndex ? style.dotActive : style.dot}
                ></span>
              ))}
            </div>
          </section>
          <div style={{ height: `${EXTRA_SCROLL_VH}vh` }}></div>
        </div>
      </USALProvider>
    </Fragment>
  );
}

export default Portfolio;
