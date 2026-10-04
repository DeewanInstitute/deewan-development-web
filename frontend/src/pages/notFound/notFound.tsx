import { useEffect } from 'react'
import NotFound from '../../components/notFound/notFound'

// Rendered by the router for every route that does not exist
function NotFoundPage() {
  useEffect(() => {
    document.title = 'Page Not Found | Deewan Development'
  }, [])

  return <NotFound />
}

export default NotFoundPage
