import './App.css'
import React, { useEffect, useState } from 'react';
import Router from './Router'; // Make sure to import Router
import UserContext from './UserContext';

function App() {
  const [userName, setUserName] = useState('');
  const [inventory, setInventory] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] =  useState(null)
  const [cart, setCart] = useState([])

    function addToCart(item) {
            
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

    function removeFromAppCart(itemToRemove) {
      setCart((prevState) => {
        const itemIndex = prevState.findIndex(i => i.id === itemToRemove.id)
        if (itemIndex === -1) {
          //item not found do nothing
          return prevState
        }
        const newCart = [...prevState]
        newCart.splice(itemIndex, 1)//remove the item
        return newCart
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
      removeFromAppCart,

      }}>
      <Router /> 
    </UserContext.Provider>
  )
}

export default App;
