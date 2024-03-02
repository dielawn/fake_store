import { useContext } from 'react'
import './Home.css'
import { Nav } from './Nav'
import UserContext from './UserContext'


export default function Home() {
  const {userName} = useContext(UserContext)
    return (
       <div>
        
      <Nav userName={userName} />
        <div className='homeDiv'>
      <h1>Fakest of Stores</h1>

        <p>Welcome to the fake store! We have all the fakest products at a prices you wouldn't want to pay if you could!</p>
        </div>
       </div>
    )
}