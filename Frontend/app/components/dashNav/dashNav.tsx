import React from "react";
import { Link } from "react-router";
import './dashNav.css';



const DashNav = () => {
    return (
        
        <nav className="nav">
            <Link to="/dashboard" className="MissionEmployment">Mission Employment</Link>
            <ul className="nav-center">
                <li>
                    <Link className="navLink" to="/dashboard">Dashboard</Link>
                </li>
                <li>
                    <Link className="navLink" to="/progressLine">Job Progress Line</Link>
                </li> 
            </ul>

             <ul className="nav-right">
                <li>
                    <Link className="navLink" to="/settings">Settings</Link>
                </li>
                <li>
                    <Link className="navLink" to="/">Log Out</Link>
                </li>
            </ul>
        </nav>
        
        
    );
};

export default DashNav;