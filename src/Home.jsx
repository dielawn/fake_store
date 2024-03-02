import { useContext, useState, useEffect } from 'react'
import './Home.css'
import { Nav } from './Nav'
import UserContext from './UserContext'
import axios from 'axios'


export default function Home() {
  const {userName, inventory, setInventory, setLoading,loading, error, setError} = useContext(UserContext)

  const  [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const ids = [...Array(20).keys()].map(i => i + 1)
    const fetchItems = async () => {
        try {
            const response = await Promise.all(
                ids.map(id => axios.get(`https://fakestoreapi.com/products/${id}`))
            ) 
            const newItem = response.map(res => ({
                ...res.data,
                qty: 1,
                isDescVis: false,
            }))

            setInventory(newItem)
        } catch (err) {
            setError(err.message)
        } finally {
            setLoading(false)
        }
    }

    fetchItems()
}, [])

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === inventory.length - 1 ? 0 : prevIndex + 1
        )
    }, 3000)

    return () => clearInterval(interval)
  }, [inventory.length])

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error: {error}</p>

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