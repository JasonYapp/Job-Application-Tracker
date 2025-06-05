import React from "react";
import { Link } from "react-router";
import './navbar.css';
import Index from '../../routes/index';
import About from '../../routes/public/about';


const Navbar = () => {
    return (
        <nav className="nav">
            <a href="/" className="site-title">Site Name</a>
            <ul>
                <li>
                    <Link to="/about">About</Link>
                </li>
                <li>
                    <Link to="/index">Home</Link>
                </li>
            </ul>
        </nav>
    );
};

export default Navbar;