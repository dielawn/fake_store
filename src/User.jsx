import React, { Component } from "react";
import './User.css'

export default class User extends Component {
    constructor(props) {
        super(props)

        this.state = {
            name: props.userName || 'Please Login',
            cart: [],
            isCartVis: false,
            total: 0,
        }
    }

    addToCart(item) {
        if (item.name !== '') {
            this.setState(prevState => {
                const itemIndex = prevState.cart.findIndex(i => i.id === item.id)
                if (itemIndex > -1) {
                    //item exists, update its quantity
                    const newCart = [...prevState.cart]
                    newCart[itemIndex].qty += item.qty
                    return { ...prevState, cart: newCart }
                } else {
                    //item doesn't exist, add it to the cart
                    return { ...prevState, cart: [...prevState.cart, item] }
                }
            })
        }
    }

    adjustItemQty(item, newQty) {
        
        this.setState(prevState => {

            const itemIndex = prevState.cart.findIndex(i => i.id === item.id)
            if (itemIndex !== -1) {
                const newCart = [...prevState.cart]
                newCart[itemIndex].qty = newQty

                if (newCart[itemIndex].qty <= 0) {
                    newCart.splice(itemIndex, 1)
                }
                return { cart: newCart }
            }
        })
    }

    removeFromCart(item) {
        this.setState(prevState => {
            const itemIndex = prevState.cart.findIndex(i => i.id === item.id)
            if (item.id === itemIndex) {
                //remove item object from cart array
                const newCart = [...prevState.cart]
                newCart.splice(itemIndex, 1)
                //replace old cart with new
                return{ cart: newCart}
            }
        })
    }
    
     setName(name) {
        this.setState(prevState => ({...prevState, name: name}))
     }

     getCartTotal() {
        let total = 0
        for (const item of this.state.cart) {
            total += item.price * item.qty
        }
        return total
     }

     setCartVis() {
        console.log('cart vis changed')
        this.setState(prevState => ({...prevState, isCartVis: !prevState.isCartVis}))
    }
    
     render() {
        return (
            <div>
                {this.state.name && (
                    <div className="flex userDiv">
                       <h3 className="userNameHeader">{this.state.name}</h3>     
                       <button
                        onClick={() => this.setCartVis()}
                        className="material-symbols-outlined white">shopping_cart
                         </button>                   
                    </div>
                )}
                <div  className="cartDiv">
                {this.isCartVis && this.cart.map((item) => (
                    <div>
                        <p>{item.title.slice(0, 11)} {item.price * item.qty}</p>
                        <input 
                            type="number"
                            value={item.qty}
                            onChange={(e) => this.adjustItemQty(item, e.target.value)}
                        />
                        <button
                            onClick={this.removeFromCart(item)}> ❌ </button>
                        
                    </div>
                ))}
                {/* if there is stuff in the cart display the qty */}
                {this.state.cart.length >= 1 && <p>{this.state.cart.length}</p>}
                </div>
            </div>
        )
     }
}