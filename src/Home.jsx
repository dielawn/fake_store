import './Home.css'
import { Nav } from './Nav'
const todo = 'nav bar, image, info'

export default function Home() {
    return (
       <div>
         <Nav />
         <p>{todo}</p>
       </div>
    )
}