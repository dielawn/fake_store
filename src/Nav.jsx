import { Link } from 'react-router-dom'
import User from './User'
import './Nav.css'
import { useState } from 'react'



export function Nav() {
    const [userName, setUserName] = useState('')
    const [inputName, setInputName] = useState('')


    return (
        <div className='flex navBar'>
            <div>
                <Link className='navLink' to='/home'>Home</Link>
                <Link className='navLink' to="/store">Store</Link>
            </div>
            <Link to='/cart'>Cart</Link>
            {userName !== '' ? 
                <User  userName={userName} />
                :
                <>
                    <label htmlFor='userNameInput'>User Name:
                    <input 
                        id='userNameInput'
                        value={inputName}
                        onChange={(e) => setInputName(e.target.value)}
                    />                    
                    </label>
                    <button onClick={() => setUserName(inputName)}>Login</button>
                </>
                    }
                    
            
        </div>        
    )
}