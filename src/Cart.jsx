import { useEffect, useState } from 'react'
import './Cart.css'
const todo = `drop down menu child of nav, cart icon, cart qty, adjust qty, remove item, checkout btn`

export function Cart() {
    const [cart, setCart] = useState([])
    const [item, setItem] = useState({name: '', price: 0, qty: 0, id: null, })

    function addToCart() {
       if (item.name != '') {
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
    }

    function selectItem() {
        setItem({ name: 'Test Item', price: 10, qty: 1 })
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
        
        <div>
            <button onClick={selectItem}>Select Item</button>
            <button onClick={addToCart}>Add to Cart</button>
            
            {cart.map((item, index) => (
                <div key={item.id}>
                    <p>{item.name}</p>
                    <label>Qty: 
                        <input 
                            type="number"
                            value={item.qty}
                            onChange={(e) => adjustQty(item.id, e.target.value)} />
                    </label>
                </div>
            ))}
        </div>
    )
}