import React from "react";
import { Link } from "react-router";
import './navbar.css';

import About from '../../routes/about';


const Navbar = () => {
    return (
        
        <nav className="nav">
            <Link to="/" className="MissionEmployment">Mission Employment</Link>
            <ul className="nav-center">
                <li>
                    <Link className="navLink" to="/about">About</Link>
                </li>
                <li>
                    <Link className="navLink" to="/">Home</Link>
                </li> 
            </ul>

             <ul className="nav-right">
                <li>
                    <Link className="navLink" to="/">Log In</Link>
                </li>
                <li>
                    <Link className="navLink" to="/">Sign Up For Free</Link>
                </li>
            </ul>
        </nav>
        
        
    );
};

export default Navbar;