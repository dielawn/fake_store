import './Store.css'
import axios from 'axios'
import { useState, useEffect } from "react";


// const todo =  `nav bar, item cards- title, qty(input), price, add to cart btn`

export function Store() {
    const [inventory, setInventory] = useState([])
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
            {inventory && inventory.map((item) => (
                (
                <div key={item.id} className='itemCard'>
                    <img src={item.image} alt={item.title} />
                    <p>{item.title}</p>
                    <p>${item.price.toFixed(2)}</p>
                </div>)
            ))}
        </div>
    )
    
}