import { Link } from "react-router-dom"
import { FaLinkedin } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";

const Footer = () => {

    return (
        <footer class="footer">
            <div class="footer-links">
                <ul>
                    <li><Link to="/MazaFlix">Home</Link></li>
                    <li><Link to="/Random">Random-Movies</Link></li>
                    <li><Link to="/Search-For-Movies">Search</Link></li>
                </ul>
            </div>
            <div class="social-media">
                <ul>
                    <li><a href="www.linkedin.com/in/muhammad-zohaib-a42923316" target="_blank"><FaLinkedin /></a></li>
                    <li><a href="https://github.com/zohaibxJackie" target="_blank"><FaGithub /></a></li>
                </ul>
            </div>
            <div class="description">
                <p>This app is a personal project which is totally non-profit.</p>
            </div>

            <div class="copyright">
                <p>&copy; 2024 Muhammad Zohaib. All rights reserved.</p>
            </div>
        </footer>

    )
}

export default Footer