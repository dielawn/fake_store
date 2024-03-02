import { useContext, useState, useEffect } from 'react'
import './Home.css'
import { Nav } from './Nav'
import UserContext from './UserContext'


export default function Home() {
  const {userName} = useContext(UserContext)
  const {inventory} = useContext(UserContext)

  const  [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === inventory.length - 1 ? 0 : prevIndex + 1
        )
    }, 3000)

    return () => clearInterval(interval)
  }, [inventory.length])

    return (
       <div>
        
      <Nav userName={userName} />
        <div className='homeDiv'>
      <h1>Fakest of Stores</h1>

        <p>Welcome to the fake store! We have all the fakest products at a prices you wouldn't want to pay if you could!</p>
        <div className='carouselDiv'>
        {inventory && inventory.length > 0 && (
        <img
          key={inventory[currentIndex].title.slice(0, 4) + inventory[currentIndex].id}
          src={inventory[currentIndex].image}
          alt={inventory[currentIndex].title}
          className='carouselImg'
        />
      )}
        </div>
        </div>
       </div>
    )
}