import './App.css'
import React, { useState } from 'react';
import Router from './Router'; // Make sure to import Router
import UserContext from './UserContext';

function App() {
  const [userName, setUserName] = useState('');
  const [inventory, setInventory] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] =  useState(null)
  const [cart, setCart] = useState([])


    function addToCart(item) {
      console.log(`${item.id} added to cart`)
       
        setCart((prevItems) => {
            const itemIndex = prevItems.findIndex(i => i.id === item.id)
            if (itemIndex > -1) {
                const newItems = [...prevItems]
                newItems[itemIndex].qty += item.qty
                return newItems
            } else {
                return [...prevItems, item]
            }
        })
       
    }




    function adjustQty(id, newQty) {
        setCart((prevItems) => {
            return prevItems.map(item => {
                if (item.id === id) {
                    return {...item, qty: parseInt(newQty, 10)}
                }
                return item
            })
        })
    }

  return (
    <UserContext.Provider value={{ 
      userName, 
      setUserName, 
      inventory, 
      setInventory, 
      loading, 
      setLoading, 
      error, 
      setError, 
      cart,
      addToCart, 
      adjustQty,

      }}>
      <Router /> {/* Router is now inside UserContext.Provider */}
    </UserContext.Provider>
  )
}

export default App;
