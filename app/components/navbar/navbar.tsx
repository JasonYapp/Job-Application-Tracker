import React from "react";
import { Link } from "react-router";
import './navbar.css';

import About from '../../routes/about';


const Navbar = () => {
    return (
        
        <nav className="nav">
            <Link to="/" className="site-title">Site Name</Link>
            <ul>
                <li>
                    <Link to="/about">About</Link>
                </li>
                <li>
                    <Link to="/">Home</Link>
                </li>
            </ul>
        </nav>
        
        
    );
};

export default Navbar;