import { useEffect, useState } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import Footer from '../footer/footer'
import Navbar from '../navbar/navbar'
import PageLoader from '../pageLoader/pageLoader'

// shortest time the loader stays up, so it never just flashes
const LOADER_MS = 1400

// Navbar + footer wrap every page; the page itself renders in <Outlet />
function Layout() {
  const { pathname, hash } = useLocation()
  const [loadedPath, setLoadedPath] = useState<string | null>(null)
  const loading = loadedPath !== pathname

  // Every page (first visit and each navigation) sits behind the loader for a moment
  useEffect(() => {
    const timer = window.setTimeout(() => setLoadedPath(pathname), LOADER_MS)
    return () => window.clearTimeout(timer)
  }, [pathname])

  // New page: back to the top. Link with #section: scroll to that section once the page has rendered.
  useEffect(() => {
    if (!hash) {
      window.scrollTo({ top: 0 })
      return
    }

    if (loading) return

    const frame = requestAnimationFrame(() => document.querySelector(hash)?.scrollIntoView())
    return () => cancelAnimationFrame(frame)
  }, [pathname, hash, loading])

  return (
    <>
      <PageLoader active={loading} />
      <Navbar />
      <main>
        {!loading && <Outlet />}
      </main>
      <Footer />
    </>
  )
}

export default Layout
