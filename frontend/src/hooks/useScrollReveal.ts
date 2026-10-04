import type { RefObject } from 'react'
import { gsap, ScrollTrigger, useGSAP } from '../lib/gsap'
import { drawScribble, hideScribble } from '../lib/scribble'

// Put data-reveal="<kind>" on any element inside `scope`:
//   up | fade | left | right | slide | zoom | pop | line | draw (svg scribble) | words (<SplitWords> children)
// Elements that enter the viewport together are staggered in DOM order, so a section
// builds itself part by part as it is scrolled to.
//   line: grows from its CSS transform-origin (set it to left or right)
//   pop:  spins and bounces in, for badges and dots

const STAGGER = 0.14

type Kind = 'up' | 'fade' | 'left' | 'right' | 'slide' | 'zoom' | 'pop' | 'line' | 'draw' | 'words'

const hidden: Record<Exclude<Kind, 'draw' | 'words'>, gsap.TweenVars> = {
  up: { opacity: 0, y: 48 },
  fade: { opacity: 0 },
  left: { opacity: 0, x: -80 },
  right: { opacity: 0, x: 80 },
  slide: { opacity: 0, x: -28 },
  zoom: { opacity: 0, scale: 0.92, y: 30 },
  pop: { opacity: 0, scale: 0.2, rotation: -140 },
  line: { scaleX: 0 },
}

const shown: gsap.TweenVars = {
  opacity: 1,
  x: 0,
  y: 0,
  scale: 1,
  scaleX: 1,
  rotation: 0,
  clearProps: 'transform',
}

const timing: Partial<Record<Kind, gsap.TweenVars>> = {
  pop: { duration: 1.1, ease: 'back.out(1.8)' },
  line: { duration: 1.2, ease: 'power2.inOut' },
  slide: { duration: 0.7, ease: 'power2.out' },
}

const wordsOf = (el: HTMLElement) => el.querySelectorAll('.dw-word > span')

const setHidden = (el: HTMLElement) => {
  const kind = el.dataset.reveal as Kind
  if (kind === 'draw') return hideScribble(el as unknown as SVGElement)

  if (kind === 'words') gsap.set(wordsOf(el), { yPercent: 115 })
  else gsap.set(el, hidden[kind])
}

const play = (el: HTMLElement, delay: number) => {
  const kind = el.dataset.reveal as Kind

  if (kind === 'draw') {
    drawScribble(el as unknown as SVGElement, { delay, duration: 1 })
  } else if (kind === 'words') {
    gsap.to(wordsOf(el), { yPercent: 0, duration: 0.9, ease: 'power4.out', stagger: 0.07, delay })
  } else {
    gsap.to(el, { ...shown, duration: 0.9, ease: 'power3.out', ...timing[kind], delay })
  }
}

export function useScrollReveal(scope: RefObject<HTMLElement | null>) {
  useGSAP(
    () => {
      const mm = gsap.matchMedia()

      mm.add('(prefers-reduced-motion: no-preference)', () => {
        const items = gsap.utils.toArray<HTMLElement>('[data-reveal]')
        items.forEach(setHidden)

        ScrollTrigger.batch(items, {
          start: 'top 88%',
          once: true,
          interval: 0.15,
          onEnter: (batch) => batch.forEach((el, i) => play(el as HTMLElement, i * STAGGER)),
        })
      })

      // StrictMode runs effects twice; without this the first run keeps live triggers
      return () => mm.revert()
    },
    { scope },
  )
}
