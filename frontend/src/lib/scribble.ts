import { gsap } from './gsap'

// pathLength is 1, so 1.02 is "fully undrawn" (a hair over so round caps leave no dot)
export const HIDDEN = 1.02

const pathsOf = (svg: SVGElement) => Array.from(svg.querySelectorAll('path'))
const boils = new WeakMap<SVGElement, gsap.core.Timeline>()

export const hideScribble = (svg: SVGElement) => {
  stopBoil(svg)
  gsap.set(pathsOf(svg), { strokeDashoffset: HIDDEN, x: 0, y: 0, rotation: 0 })
}

// The pen never rests: every fraction of a second each pass jumps a hair, like a hand-drawn "boiling" line
const startBoil = (svg: SVGElement) => {
  stopBoil(svg)
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

  const tl = gsap.timeline({ repeat: -1 })
  pathsOf(svg).forEach((path, i) => {
    for (let frame = 0; frame < 4; frame++) {
      tl.set(
        path,
        {
          x: gsap.utils.random(-1.4, 1.4),
          y: gsap.utils.random(-0.9, 0.9),
          rotation: gsap.utils.random(-1.2, 1.2),
        },
        frame * 0.16 + i * 0.05,
      )
    }
  })
  tl.to({}, { duration: 0.64 })
  boils.set(svg, tl)
}

const stopBoil = (svg: SVGElement) => {
  boils.get(svg)?.kill()
  boils.delete(svg)
}

// Draw both passes one after the other, with a little overshoot wobble on the whole shape
export const drawScribble = (svg: SVGElement, { delay = 0, duration = 0.8 } = {}) => {
  const paths = pathsOf(svg)
  stopBoil(svg)

  return gsap
    .timeline({ delay, onComplete: () => startBoil(svg) })
    .set(paths, { strokeDashoffset: HIDDEN })
    .to(paths[0], { strokeDashoffset: 0, duration, ease: 'power2.out' })
    .to(paths[1], { strokeDashoffset: 0, duration: duration * 0.8, ease: 'power3.out' }, '-=0.5')
}

// Quick scratch-out in the drawing direction
export const eraseScribble = (svg: SVGElement, duration = 0.28) => {
  stopBoil(svg)
  return gsap.to(pathsOf(svg), {
    strokeDashoffset: -HIDDEN,
    duration,
    ease: 'power2.in',
    stagger: 0.05,
  })
}
