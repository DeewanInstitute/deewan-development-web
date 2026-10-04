import { useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import Footer from '../footer/footer'
import Navbar from '../navbar/navbar'

// Navbar + footer wrap every page; the page itself renders in <Outlet />
function Layout() {
  const { pathname, hash } = useLocation()

  // New page: back to the top. Link with #section: scroll to that section once the page has rendered.
  useEffect(() => {
    if (!hash) {
      window.scrollTo({ top: 0 })
      return
    }

    const frame = requestAnimationFrame(() => document.querySelector(hash)?.scrollIntoView())
    return () => cancelAnimationFrame(frame)
  }, [pathname, hash])

  return (
    <>
      <Navbar />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  )
}

export default Layout
