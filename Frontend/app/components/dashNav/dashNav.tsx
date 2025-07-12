import React from "react";
import { Link, useNavigate } from "react-router";
import './dashNav.css';



const DashNav = () => {

    const navigate = useNavigate()

    const handleLogout = () => {
        
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        navigate('/');
    };


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
                    <button 
                        className="logout"
                        onClick={handleLogout}
                    >
                        Log Out
                    </button>
                </li>
            </ul>
        </nav>
        
        
    );
};

export default DashNav;