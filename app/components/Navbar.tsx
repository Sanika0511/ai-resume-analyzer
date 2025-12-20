import {Link} from "react-router";

const Navbar = () => {
    return (
        <nav className="navbar">
            <Link to="/">
                <p className="text-3xl font-display font-bold text-gradient tracking-wide">RESUMIND</p>
            </Link>
            <Link to="/upload" className="primary-button w-fit">
                Upload Resume
            </Link>
        </nav>
    )
}
export default Navbar
