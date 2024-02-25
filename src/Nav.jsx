import { Link } from 'react-router-dom'
import './Nav.css'
const todo =  `links to home, shop, cart icon w/qty,`

export function Nav() {
    return (
        <>
            <p>{todo}</p>
            <Link to='home'>Home</Link>
            <Link to="shop">Store</Link>
            <Link to='cart'>Cart</Link>
        </>        
    )
}