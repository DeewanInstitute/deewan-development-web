import LottieGlobe from '../lottieGlobe/lottieGlobe'
import './pageLoader.scss'

function PageLoader({ active }: { active: boolean }) {
  return (
    <div className={`page-loader${active ? ' is-active' : ''}`} role="status" aria-label="Loading">
      {active && <LottieGlobe className="page-loader-animation" src="/assets/lottie/loader.json" />}
    </div>
  )
}

export default PageLoader
