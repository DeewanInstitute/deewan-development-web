import { useEffect, useRef } from 'react'
import lottie from 'lottie-web/build/player/lottie_light'

type Props = { className?: string; src?: string }

// The looping globe animation, drawn into a square box; the parent decides how much of it shows.
function LottieGlobe({ className, src = '/assets/lottie/globe.json' }: Props) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!ref.current) return
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const animation = lottie.loadAnimation({
      container: ref.current,
      renderer: 'svg',
      loop: true,
      autoplay: !reduced,
      path: src,
    })
    return () => animation.destroy()
  }, [src])

  return <div ref={ref} className={className} aria-hidden="true" />
}

export default LottieGlobe
