import { useEffect } from 'react'
import './home.scss'

function Home() {
  useEffect(() => {
    document.title = 'Deewan Development'
  }, [])

}

export default Home
