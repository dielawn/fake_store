import './Store.css'
import axios from 'axios'
import { useState, useEffect, useContext } from "react";
import { Nav } from './Nav';
import UserContext from './UserContext';


// const todo =  `nav bar, item cards- title, qty(input), price, add to cart btn`

export function Store() {
    // const [inventory, setInventory] = useState([])
    const {inventory} = useContext(UserContext)
    const {setInventory} = useContext(UserContext)
    const {userName} = useContext(UserContext)
    const [loading, setLoading] = useState(true)
    const [error, setError] =  useState(null)
     

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
    
    
    if (loading) return <p>Loading...</p>
    if (error) return <p>Error: {error}</p>
 
    return (

       <div>
        <Nav userName={userName}/>
         <div className='productsDiv'>
            {inventory && inventory.map((item) => (                
                <div key={item.title.slice(0, 4) + item.id} className='itemCard'>
                    <img src={item.image} alt={item.title} className='productImg' />
                    <p>{item.title}</p>
                    {item.isDescVis && <p>{item.description}</p>}
                    <button className='descShowHideBtn' onClick={() => handleDiscVis(item.id)}>
                    {item.isDescVis ? 
                        <span className="material-symbols-outlined" >expand_less</span> 
                        : 
                        <>{item.description.slice(0, 20) + '...'}<span className="material-symbols-outlined" >expand_more</span></>}
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