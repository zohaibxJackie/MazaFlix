import { Link } from "react-router-dom"
import { FaGithub } from "react-icons/fa";

const Header = () => {
  return (
    <header>
        <div className='logo'><Link to={'/MazaFlix'}>Mazaflix</Link></div>
        <nav>
            <menu>
                <li><Link to={'/Random'}>Random</Link></li>
                <li><Link to={'/Search-For-Movies'}>Search</Link></li>
                <li><a href="https://github.com/zohaibxJackie" target="blank"><FaGithub className="git-icon" /></a></li>
            </menu>
        </nav>
    </header>
  )
}

export default Header