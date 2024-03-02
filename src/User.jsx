import React, { Component } from "react";
import './User.css'

export default class User extends Component {
    constructor(props) {
        super(props)

        this.state = {
            name: props.userName || 'Dude',
            cart: props.cart || [],
            isCartVis: false,
            total: 0,
            setFunc: props.removeFromAppCart
        }
    }

    componentDidUpdate(prevProps) {
        //update the cart when App cart is updated
        if (prevProps.cart !== this.props.cart) {
            this.setState({cart: this.props.cart })
        }
        //hide cart div if cart is empty
        if (this.props.cart.length <= 0 && this.state.isCartVis) {
            this.setState({ isCartVis: false })
        }
    }
    

    adjustItemQty(item, newQty) {
        //adjust qty of cart item
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
                this.props.removeFromAppCart(item)
                return { cart: newCart }
            }
        })
    }
    
     setName(name) {
        this.setState(prevState => ({...prevState, name: name}))
     }

     //multiplies qty by price of each item then sums totals
     getCartTotal() {
        let total = 0
        for (const item of this.state.cart) {
            total += item.price * item.qty
        }
        return total.toFixed(2)
     }

     //toggles cart contents visibility
     setCartVis() {
        this.setState(prevState => ({...prevState, isCartVis: !prevState.isCartVis}))
    }

    //sums total number of items in cart accounting for qty of duplicate items
    getCartQty() {
        let itemTotal = 0
        for (const item of this.state.cart) {
            itemTotal += item.qty
        }
        return itemTotal
    }
    
    render() {
        return (
            <div className="userContainer">
                {this.state.name && (
                    <div className="flex userDiv">
                       <h3 className="userNameHeader">Welcome {this.state.name},</h3>     
                       <button
                            onClick={() => this.setCartVis()}
                            className="material-symbols-outlined white cartBtn" >shopping_cart
                         </button>    
                {/*if the cart is not empty display qty  */}
                {this.state.cart.length >= 1 && <p className="qtyTxt">{this.getCartQty()}</p>}
                    </div>
                )}
                <div className="cartDiv">
                    {this.state.isCartVis && (<h3 className="totalTxt">Total ${this.getCartTotal()}</h3>)}
                    {this.state.isCartVis && this.state.cart.map((item) => (
                        <div key={item.id} className="cartItemDiv">                         
                            <img className="cartImage" src={item.image} alt={item.title} />
                            <div className="cartInfo">
                                <p>{item.title.slice(0, 9)}...  ${(item.price * item.qty).toFixed(2)} </p>                            
                                <input 
                                    type="number"
                                    value={item.qty}
                                    className="qtyInput"
                                    onChange={(e) => this.adjustItemQty(item, parseInt(e.target.value, 10))}
                                />
                                <button className="removeBtn" onClick={() => this.removeFromCart(item)}> ❌ </button>
                            </div>
                    </div>
                ))}
               
                </div>
            </div>
        )
    }
}