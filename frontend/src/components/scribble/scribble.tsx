import type { Ref, SVGProps } from 'react'
import './scribble.scss'

// Two hand-drawn passes around the same spot, like a pen circling a word twice.
// Each path uses pathLength={1}, so GSAP draws it with strokeDashoffset between 1.02 and 0
// (see lib/scribble.ts).
const PASSES = [
  // first pass: up the left, over the top, round the right, back along the bottom, and a loop past the start
  'M 20 46 C 12 20 58 5 104 5 C 158 5 196 17 193 38 C 190 59 150 67 100 67 C 50 67 10 59 8 37 C 7 21 34 9 70 7',
  // second pass: quicker, a little wider and tilted the other way
  'M 184 13 C 200 31 186 57 130 65 C 78 72 18 63 6 41 C -4 20 40 1 100 2 C 152 3 190 13 192 27',
]

type ScribbleProps = SVGProps<SVGSVGElement> & { ref?: Ref<SVGSVGElement> }

function Scribble({ className = '', ...props }: ScribbleProps) {
  return (
    <svg
      className={`dw-scribble ${className}`}
      viewBox="0 0 200 70"
      preserveAspectRatio="none"
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      {PASSES.map((d) => (
        <path key={d} d={d} pathLength={1} />
      ))}
    </svg>
  )
}

export default Scribble
