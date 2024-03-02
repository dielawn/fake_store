import React, { Component } from "react";
import './User.css'

export default class User extends Component {
    constructor(props) {
        super(props)

        this.state = {
            name: props.userName || 'Please Login',
            cart: props.cart || [],
            isCartVis: false,
            total: 0,
        }
    }

    componentDidUpdate(prevProps) {
        if (prevProps.cart !== this.props.cart) {
            this.setState({cart: this.props.cart })
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
            if (itemIndex !== -1) { 
                const newCart = [...prevState.cart];
                newCart.splice(itemIndex, 1)
                return { cart: newCart }
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
            <div className="userContainer">
                {this.state.name && (
                    <div className="flex userDiv">
                       <h3 className="userNameHeader">Welcome {this.state.name},</h3>     
                       <button
                        onClick={() => this.setCartVis()}
                        className="material-symbols-outlined white">shopping_cart
                         </button>      
                {this.state.cart.length >= 1 && <p className="qtyTxt">{this.state.cart.length}</p>}             
                
                    </div>
                )}
                <div className="cartDiv">
                {this.state.isCartVis && this.state.cart.map((item) => (
                    <div key={item.id} className="cartItemDiv"> 
                        
                        <img className="cartImage" src={item.image} alt={item.title} />
                        <p>{item.title.slice(0, 11)} {item.price * item.qty}</p>
                        <input 
                            type="number"
                            value={item.qty}
                            className="qtyInput"
                            onChange={(e) => this.adjustItemQty(item, parseInt(e.target.value, 10))}
                        />
                        <button className="removeBtn" onClick={() => this.removeFromCart(item)}> ❌ </button>
                    </div>
                ))}
               {this.state.isCartVis && (<div>Total ${this.getCartTotal()}</div>)}
                </div>
            </div>
        )
    }
}