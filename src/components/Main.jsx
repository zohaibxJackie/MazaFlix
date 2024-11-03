import { Link } from "react-router-dom"
const Main = () => {
  return (
    <main>
        <h1>Explore the world of movies</h1>
        <p>Search for movies you like or pick a random movie.</p>
        <div><button className='btn'><Link to={'/Search-For-Movies'} className="explore-btn">Explore Now</Link></button></div>
    </main>
  )
}

export default Main