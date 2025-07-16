import { Link } from 'react-router';
import '../css/inprogress.css';


const InProgress = () => {

    return(
        
        <>
            <section className='progress-background'>
                
                <div className="bg-element2"></div>
                <div className="bg-element2"></div>
                <div className="bg-element2"></div>
                <div className="bg-element2"></div>
                <div className="bg-element2"></div>
                <div className="bg-element2"></div>
                <div className="pulse-element2"></div>
                <div className="pulse-element2"></div>
                <div className="pulse-element2"></div>
                <div className="pulse-element2"></div>
                <div className="pulse-element2"></div>
                <div className="pulse-element2"></div>
                
                <div style={{ paddingTop: '6rem' }}>
                    <div className='progressContainer'>
                        <h1>In Progress</h1>
                        <p>This part of the site is currently in progress. Coming soon!</p>


                        <Link to="/" className="backButton">
                            <button>Back to the main page</button>
                        </Link>
                    </div>
                </div>
            </section>
        </>
       
    );
}


export default InProgress;