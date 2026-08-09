import './App.css'
import Home from './pages/home'
import NotFoundPage from './pages/notFound'

function App() {
  const isHome = window.location.pathname === '/'
  return isHome ? <Home/> : <NotFoundPage/>
}

export default App
