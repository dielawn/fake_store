import './Store.css'
import axios from 'axios'
import { useState, useEffect } from "react";
import { Nav } from './Nav';


// const todo =  `nav bar, item cards- title, qty(input), price, add to cart btn`

export function Store() {
    const [inventory, setInventory] = useState([])
    const [cart, setCart] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] =  useState(null)
    
    useEffect(() => {
        const ids = [...Array(20).keys()].map(i => i + 1)
        const fetchItems = async () => {
            try {
                const response = await Promise.all(
                    ids.map(id => axios.get(`https://fakestoreapi.com/products/${id}`))
                ) 
                const newItem = response.map(res => res.data);

                setInventory(newItem)
            } catch (err) {
                setError(err.message)
            } finally {
                setLoading(false)
            }
        }

        fetchItems()
    }, [])

    if (loading) return <p>Loading...</p>
    if (error) return <p>Error: {error}</p>
 
    return (

       <div>
        <Nav />
         <div className='productsDiv'>
            {inventory && inventory.map((item) => (                
                <div key={item.title.slice(0, 4) + item.id} className='itemCard'>
                    <img src={item.image} alt={item.title} className='productImg' />
                    <p>{item.title}</p>
                    <p>${item.price.toFixed(2)}</p>
                    <button>Add to Cart</button>
                </div>
            ))}
        </div>
       </div>
    )
    
}