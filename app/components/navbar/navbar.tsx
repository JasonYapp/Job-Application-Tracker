import React from "react";
import { Link } from "react-router";
import './navbar.css';



const Navbar = () => {
    return (
        
        <nav className="nav">
            <Link to="/" className="MissionEmployment">Mission Employment</Link>
            <ul className="nav-center">
                <li>
                    <Link className="navLink" to="/features">Features</Link>
                </li>
                <li>
                    <Link className="navLink" to="/about">About</Link>
                </li> 
            </ul>

             <ul className="nav-right">
                <li>
                    <Link className="navLink" to="/login">Log In</Link>
                </li>
                <li>
                    <Link className="navLink" to="/signup">Sign Up For Free</Link>
                </li>
            </ul>
        </nav>
        
        
    );
};

export default Navbar;