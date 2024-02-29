import './Home.css'
import { Nav } from './Nav'
const todo = 'nav bar, image, info'

export default function Home() {
    return (
       <div>
        <h1>Our first test</h1>
         <Nav />
         <p>{todo}</p>
       </div>
    )
}