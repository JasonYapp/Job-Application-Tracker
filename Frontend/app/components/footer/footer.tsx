import './footer.css';
import { Link } from "react-router";

const Footer = () => {
    return (
        <footer className='footer'>
            

            <div className='columns'>
                <div className='mission-column'>
                    <div className='mission-title'> Mission Employment </div>
                        <div className='mission-text'> Connecting talented individuals with meaningful career opportunities. 
                        
                        </div>
                </div>


                <div className='column-section'>
                    <h3> Company</h3>
                        <ul>
                            <li> <Link to="/about">About Us</Link> </li>
                            <li> Privacy Policy </li>
                            <li> Terms Of Service </li>
                        </ul>
                </div>


                <div className='column-section'>
                    <h3> Product</h3>
                        <ul>
                            <li> <Link to="/login">Log In</Link></li>
                            <li> <Link to="/features">Features</Link></li>
                            
                        </ul>
                </div>


                <div className='column-section'>
                    <h3> Help </h3>
                        <ul>
                            <li> FAQS </li>
                            <li> <Link to="/signup">Get Started</Link> </li>
                            <li> Contact Us </li>
                        </ul>
                </div>
            </div>

        </footer>

    );
};

export default Footer;