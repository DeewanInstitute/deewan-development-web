import { Route, Routes } from 'react-router-dom'
import Layout from './components/layout/layout'
import About from './pages/about/about'
import Home from './pages/home/home'
import Offer from './pages/offer/offer'
import Portfolio from './pages/portfolio/portfolio'
import SocialMedia from './pages/socialMedia/socialMedia'
import Contact from './pages/contact/contact'
import NotFoundPage from './pages/notFound/notFound'

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/portfolio" element={<Portfolio />} />
        <Route path="/portfolio/social-media" element={<SocialMedia />} />
        <Route path="/offer" element={<Offer />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  )
}

export default App
