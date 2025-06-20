import './footer.css';

const Footer = () => {
    return (
        <footer className='footer'>
            

            <div className='columns'>
                <div className='mission-column'>
                    <div className='mission-title'> Mission Employment </div>
                        <div className='mission-text'> Connecting talented individuals with meaningful career opportunities. 
                        We're dedicated to helping you find your next role and advance your career.
                        </div>
                </div>


                <div className='column-section'>
                    <h3> Company</h3>
                        <ul>
                            <li> About Us </li>
                            <li> Privacy Policy </li>
                            <li> Terms Of Service </li>
                        </ul>
                </div>


                <div className='column-section'>
                    <h3> Product</h3>
                        <ul>
                            <li> About Us </li>
                            <li> The Team </li>
                            <li> Contact Us </li>
                        </ul>
                </div>


                <div className='column-section'>
                    <h3> Help </h3>
                        <ul>
                            <li> Get Started </li>
                            <li> FAQS </li>
                            <li> Contact Us </li>
                        </ul>
                </div>
            </div>

        </footer>

    );
};

export default Footer;