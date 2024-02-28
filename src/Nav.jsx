import { Link } from 'react-router-dom'
import './Nav.css'
const todo =  `links to home, store, cart icon w/qty,`

export function Nav() {
    return (
        <>
            <p>{todo}</p>
            <Link to='/home'>Home</Link>
            <Link to="/store">Store</Link>
            <Link to='/cart'>Cart</Link>
        </>        
    )
}