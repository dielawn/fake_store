import { Link } from 'react-router-dom'
import './Nav.css'


export function Nav() {
    return (
        <div className='flex navBar'>
            <div>
                <Link className='navLink' to='/home'>Home</Link>
                <Link className='navLink' to="/store">Store</Link>
            </div>
            <Link to='/cart'>Cart</Link>
        </div>        
    )
}