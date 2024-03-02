import { Link } from 'react-router-dom'
import User from './User'
import './Nav.css'
import { useContext, useState } from 'react'
import UserContext from './UserContext'



export function Nav() {
    const {userName, setUserName, cart, removeFromAppCart } = useContext(UserContext)
    const [inputName, setInputName] = useState('')


    return (
        <div className='flex navBar'>
            <div className='linkDiv'>
                <Link className='navLink' to='/home'>Home</Link>
                <Link className='navLink' to="/store">Store</Link>
            </div>
            
            {userName !== '' ? 
                <User userName={userName} cart={cart} removeFromAppCart={removeFromAppCart} />
                :
                <div className='flexColumn'>
                    <label className='userNameInput' htmlFor='userNameInput'>User Name:{' '} 
                    <input 
                        type='text'
                        className='userNameInput'
                        id='userNameInput'
                        value={inputName}
                        onChange={(e) => setInputName(e.target.value)}
                    />                    
                    </label>
                    <button className='loginBtn' onClick={() => setUserName(inputName)}>Login</button>
                </div>
                    }
                    
            
        </div>        
    )
}