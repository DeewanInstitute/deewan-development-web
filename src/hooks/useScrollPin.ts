import { useEffect } from "react";
import type { RefObject } from "react";

/**
 * Returns the element's stable document-relative top position. Neither
 * offsetTop nor getBoundingClientRect() can be trusted directly for this:
 * once a position:sticky element is actively stuck, both browsers observed
 * report values that track the current scroll position instead of the
 * static flow position. Summing preceding siblings' heights sidesteps this
 * entirely, since position:sticky never changes an element's own height,
 * only its position.
 */
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

/**
 * Pairs with a `position: sticky; top: 0;` section in CSS. Sticky alone
 * freezes the section as a static frame for the scroll distance of its own
 * height: if its content is taller than the viewport, the bottom portion
 * never becomes visible before the next section covers it up. This reveals
 * `contentRef` (a wrapper around that content, nested inside `sectionRef`)
 * by translating it upward over that same scroll distance, so the full
 * section is shown exactly by the time the next section arrives to cover it.
 */
export function useScrollPin(
  sectionRef: RefObject<HTMLElement | null>,
  contentRef?: RefObject<HTMLElement | null>
) {
  useEffect(() => {
    const section = sectionRef.current;
    const content = contentRef?.current ?? null;
    if (!section || !content) return;

    const applyReveal = () => {
      const sectionHeight = section.getBoundingClientRect().height;
      const overflow = Math.max(0, sectionHeight - window.innerHeight);
      if (overflow <= 0) {
        content.style.transform = "";
        return;
      }
      const docTop = getDocumentTop(section);
      const scrolledPast = window.scrollY - docTop;
      const progress = Math.min(1, Math.max(0, scrolledPast / sectionHeight));
      content.style.transform = progress > 0 ? `translateY(${-progress * overflow}px)` : "";
    };

    applyReveal();
    window.addEventListener("scroll", applyReveal, { passive: true });
    window.addEventListener("resize", applyReveal);
    return () => {
      window.removeEventListener("scroll", applyReveal);
      window.removeEventListener("resize", applyReveal);
    };
  }, [sectionRef, contentRef]);
}
