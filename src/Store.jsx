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

    const expandIcon = 'expand_more'
    const colapseIcon = 'expand_less' 
   

    function setQty(e, itemId) {
        setInventory(prevInv => prevInv.map(item => 
            item.id === itemId ? {...item, qty: Number(e.target.value)} : item
        ))
    }

    function handleDiscVis(itemId) {
        setInventory(prevInv => prevInv.map(item => 
            item.id === itemId ? {...item, isDescVis: !item.isDescVis} : item))
    }

 
    
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
    console.log(inventory)


    
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
                    {item.isDescVis && <p>{item.description}</p>}
                    <button onClick={() => handleDiscVis(item.id)}>
                    {item.isDescVis ? 
                        <span className="material-symbols-outlined" >expand_less</span> 
                        : 
                        <>{item.description.slice(0, 20) + '...'}<span className="material-symbols-outlined" > expand_more</span></>}
                    </button>
                 
                  
                        
                   
                    <p>${item.price.toFixed(2)}</p>
                    <label htmlFor={'qtyInput' + item.id}>Qty 
                    <input 
                        type="number"
                        id={'qtyInput' + item.id}
                        className='qtyInput'
                        value={item.qty}
                        onChange={(e) => setQty(e, item.id)}
                         />
                    </label>
                    <button>Add to Cart</button>
                </div>
            ))}
        </div>
       </div>
    )
    
}