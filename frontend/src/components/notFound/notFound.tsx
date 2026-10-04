import Button from '../button/button'
import './notFound.scss'

function NotFound() {
  return (
    <section className="dw-not-found dw-container">
      <p className="dw-not-found-code">404</p>
      <h1 className="dw-not-found-heading">Page Not Found</h1>
      <p className="dw-not-found-description">
        The page you're looking for doesn't exist or may have been moved. Let's get you back on
        track.
      </p>
      <Button to="/" variant="teal">
        Back to Home
      </Button>
    </section>
  )
}

export default NotFound
