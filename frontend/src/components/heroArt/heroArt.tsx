import { useEffect, useRef, useState } from 'react'
import lottie from 'lottie-web/build/player/lottie_light'

// Frames of /assets/lottie/hero-art.json: 0-45 is the intro (shapes pop in and draw on),
// 45-225 is a seamless idle loop. After the intro only the loop is played.
const INTRO_END = 45
const LOOP_END = 225

// The banner shapes: they pop in, draw themselves on, then keep spinning and floating.
// While the file loads, and for visitors who prefer less motion, the still image is shown instead.
// Renders two layers inside the hero card: the still mesh, and the animation on top of it.
function HeroArt() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [canAnimate, setCanAnimate] = useState(
    () => !window.matchMedia('(prefers-reduced-motion: reduce)').matches,
  )
  const [ready, setReady] = useState(false)

  useEffect(() => {
    const container = containerRef.current
    if (!canAnimate || !container) return

    const animation = lottie.loadAnimation({
      container,
      renderer: 'svg',
      loop: true,
      autoplay: false,
      path: '/assets/lottie/hero-art.json',
      rendererSettings: { preserveAspectRatio: 'xMidYMid meet' },
    })

    let introPlayed = false
    animation.addEventListener('DOMLoaded', () => {
      setReady(true)
      animation.playSegments([0, LOOP_END], true)
    })
    animation.addEventListener('loopComplete', () => {
      if (introPlayed) return
      introPlayed = true
      animation.playSegments([INTRO_END, LOOP_END], true)
    })
    animation.addEventListener('data_failed', () => setCanAnimate(false))

    // no work while the hero is off screen
    const observer = new IntersectionObserver(([entry]) =>
      entry.isIntersecting ? animation.play() : animation.pause(),
    )
    observer.observe(container)

    return () => {
      observer.disconnect()
      animation.destroy()
    }
  }, [canAnimate])

  return (
    <>
      <div className={`home-hero-art${ready ? ' is-animated' : ''}`} aria-hidden="true" />
      {canAnimate && <div ref={containerRef} className="home-hero-lottie" aria-hidden="true" />}
    </>
  )
}

export default HeroArt
