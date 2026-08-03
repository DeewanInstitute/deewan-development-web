import { Fragment } from "react/jsx-runtime";
import { useEffect, useRef, useState } from "react";
import style from "./portfolio.module.scss";
import Subheader from "../subheader/subheader";

const slides = [
  {
    image: "../../assets/images/portfolio/DIDesktop.webp",
    alt: "Deewan Institute Desktop",
  },
  {
    image: "/assets/images/portfolio/DIMobile.webp",
    alt: "Deewan Institute Mobile",
  },
  {
    image: "/assets/images/portfolio/DTDesktop.webp",
    alt: "Deewan Toursim Desktop",
  },
  {
    image: "/assets/images/portfolio/DTMobile.webp",
    alt: "Deewan Toursim Mobile",
  },
];

const SCROLL_PER_SLIDE_VH = 100;

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
  const portfolioRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const overflowRef = useRef(0);
  const extraScrollRef = useRef(0);

  const [wrapperHeight, setWrapperHeight] = useState(0);
  const [viewportWidth, setViewportWidth] = useState(0);
  const [carouselProgress, setCarouselProgress] = useState(0);

  useEffect(() => {
    // Both the wrapper's scroll-scrub height AND the vertical-reveal
    // overflow are derived from the SAME measurement here, so they can
    // never drift out of sync with each other.
    const updateMeasurements = () => {
      if (!portfolioRef.current) return;
      const ownHeight = portfolioRef.current.getBoundingClientRect().height;
      overflowRef.current = Math.max(0, ownHeight - window.innerHeight);
      const extraScroll =
        (slides.length - 1) *
        (window.innerHeight * (SCROLL_PER_SLIDE_VH / 100));
      extraScrollRef.current = extraScroll;
      setWrapperHeight(ownHeight + extraScroll);
      if (viewportRef.current)
        setViewportWidth(viewportRef.current.clientWidth);
    };

    updateMeasurements();

    const resizeObserver = new ResizeObserver(updateMeasurements);
    if (portfolioRef.current) resizeObserver.observe(portfolioRef.current);
    if (viewportRef.current) resizeObserver.observe(viewportRef.current);

    // The sticky section stays pinned for exactly `extraScroll` px of scroll
    // (the outer wrapper is that much taller than the section itself). That
    // window covers two phases: first reveal the section's own content if
    // it's taller than the viewport (translating contentRef upward, same
    // technique as useScrollPin), then spend the remaining distance
    // scrubbing through the carousel slides.
    const applyProgress = () => {
      const wrapperEl = wrapperRef.current;
      const contentEl = contentRef.current;
      if (!wrapperEl) return;

      const extraScroll = extraScrollRef.current;
      const overflow = overflowRef.current;
      const wrapperDocTop = getDocumentTop(wrapperEl);
      const scrolledPx = Math.min(
        Math.max(0, window.scrollY - wrapperDocTop),
        extraScroll
      );

      if (contentEl) {
        const revealProgress =
          overflow > 0 ? Math.min(1, scrolledPx / overflow) : 1;
        contentEl.style.transform =
          overflow > 0 && revealProgress > 0
            ? `translateY(${-revealProgress * overflow}px)`
            : "";
      }

      const remainingPx = Math.max(0, scrolledPx - overflow);
      const remainingTotal = Math.max(1, extraScroll - overflow);
      setCarouselProgress(Math.min(1, remainingPx / remainingTotal));
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
      <div
        id="portfolio"
        ref={wrapperRef}
        style={{ height: wrapperHeight || undefined }}
      >
        <section ref={portfolioRef} className={style.portfolio}>
          <div ref={contentRef}>
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
              approach to solving real-world challenges through thoughtful
              design and robust technology.
            </p>
            <div className={style.showcase}>
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
                      {slide.image ? (
                        <img src={slide.image} alt={slide.alt} />
                      ) : (
                        <div className={style.placeholder}>{slide.alt}</div>
                      )}
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
            </div>
          </div>
        </section>
      </div>
    </Fragment>
  );
}

export default Portfolio;
