import { useEffect, useState } from 'react'
import './Cart.css'
const todo = `drop down menu child of nav, cart icon, cart qty, adjust qty, remove item, checkout btn`

export function Cart() {
    const [cart, setCart] = useState([])
    const [item, setItem] = useState({name: '', price: 0, qty: 0, id: null, })

    function addToCart() {
       if (item.name != '') {
        setCart((prevItems) => [
            ...prevItems, 
            item
        ])
       }
    }

    function selectItem() {
        setItem({ name: 'Test Item', price: 10, qty: 1 })
    }

    function adjustQty() {
        
    }


    
    return (
        
        <div>
            <button onClick={selectItem}>Select Item</button>
            <button onClick={addToCart}>Add to Cart</button>
            
            {cart.map((item, index) => (
                <div key={item.id}>{item.name} - {item.qty}</div>
            ))}
        </div>
    )
}