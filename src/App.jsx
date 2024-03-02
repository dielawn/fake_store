import './App.css'
import Home from './Home'
import { Store } from './Store'
import Cart from './Cart'
import { Nav } from './Nav'
import User from './User'
import { useState } from 'react'


function App() {
  const [userName, setUserName] = useState('')

  return (
    <>
   <Nav userName={userName} setUserName={setUserName} />
    {/* <Home /> */}
    {/* <Store />
    <Cart /> */}
    
    </>           
  )
}

export default App
