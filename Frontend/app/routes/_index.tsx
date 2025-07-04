import '../css/index.css';
import KanBanView from '../images/KanBanView.png';
import UpcomingTasks from '../images/UpcomingTasks.png';


const Home = () => {


    const signUp = async () => {
        
    }

    return(
        
        <>
        <div className='landing-container'>
        <div className="bg-element"></div>
        <div className="bg-element"></div>
        <div className="bg-element"></div>
        <div className="pulse-element"></div>
        <div className="pulse-element"></div>
        <div className="pulse-element"></div>

            
                <div className="box-container">

                    <section className="first-box">
                        <header> From application to offer - every step in one place.</header>

                            <div className="tagline">
                                <p>With details and reminders on interviews, deadlines and those pesky questionnaires, Mission Employment is job tracking made simple.</p>
                            </div>

                        <button className="sign-up">Start Your Journey</button>
                    </section>

                    <section className='second-box'>
                        <div className='second-box-content'>
                            <h3>Stay Organized, <br></br>Stay Ahead </h3>
                            <p>A tool to keep you organized throughout your job search journey. Manage interview schedules, and monitor your progress all in one place. Stay on top of deadlines and never miss an important follow-up again."</p>
                        </div>

                        <div className="second-box-task">
                            <img src={UpcomingTasks} alt="Task Image" />
                        </div>
                    </section>

                    <section className='third-box'>
                        <div className='third-box-content'>
                            <h3>Visual Progress Tracking</h3>
                            <p>See your entire job search journey at a glance with our intuitive Kanban-style board. 
                                Track applications from submission to offer, 
                                with clear visual indicators of your progress at each stage.
                            </p>
                        </div>

                        <div className="third-box-kanban">
                            <img src={KanBanView} alt="Kanban Board" />
                        </div>
                    </section>

                </div>
            </div>
        
        
        

        </>
       
    );
}


export default Home;