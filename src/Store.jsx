import './Store.css'
import React, {  useContext } from "react";
import { Nav } from './Nav';
import UserContext from './UserContext';


export function Store() {
  
    const {inventory, setInventory, userName, loading, error, addToCart, adjustQty} = useContext(UserContext)
   
     
    function setQty(e, itemId) {
        setInventory(prevInv => prevInv.map(item => 
            item.id === itemId ? {...item, qty: Number(e.target.value)} : item
        ))
    }

    function handleDiscVis(itemId) {
        setInventory(prevInv => prevInv.map(item => 
            item.id === itemId ? {...item, isDescVis: !item.isDescVis} : item))
    }

    function pushToUserCart() {
        //push item object from inventory to User.cart, maintain prev cart items
    }
   
    if (loading) return <p>Loading...</p>
    if (error) return <p>Error: {error}</p>
 
    return (
       <div>
        <Nav userName={userName}/>
        <h1 className='headerTxt'>Fakest of Stores</h1>
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
                    <button
                        onClick={() => addToCart(item)}
                    >Add to Cart</button>
                </div>
            ))}
        </div>
       </div>
    )
    
}