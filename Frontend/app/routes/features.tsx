import '../css/features.css';
import DragDropView from '../images/DragDropView.png';
import KanBanView from '../images/KanBanView.png';
import BarStatsView from '../images/BarStatsView.png'
import UpcomingTasks from '../images/UpcomingTasks.png';

const Features = () => {
    return(
        
        <>
        <div className='features-landing-container'>
        <div className="bg-element"></div>
        <div className="bg-element"></div>
        <div className="bg-element"></div>
        <div className="pulse-element"></div>
        <div className="pulse-element"></div>
        <div className="pulse-element"></div>

            
                <div className="box-container">

                    <section className="first-box">
                        <h1> The ultimate organization tool for job applications </h1> 
                        <p>Everything you need to manage your job search in one powerful, intuitive platform.</p>
                    </section>

                    <section className='second-box'>
                        <div className='second-box-content'>
                            <h3>Complete Application Management </h3>
                            <p>Track every application from submission to offer. 
                                With an easy drag and drop kanban style tracker, never lose track of where you applied or what stage you're at.</p>
                        </div>

                        <div className="second-box-task">
                            <img src={DragDropView} alt="Application Image" />
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

                    <section className='fourth-box'>
                        <div className="fourth-box-task">
                            <img src={BarStatsView} alt="Bar Image" />
                        </div>

                        <div className='fourth-box-content'>
                            <h3>Know Your Success Pipeline </h3>
                            <p>Track your conversion rates from application to offer. 
                                See what's working and where you're losing momentum, so you can optimize your approach and land that perfect role faster.</p>
                        </div>

                        
                    </section>

                    <section className='second-box'>
                        <div className='second-box-content'>
                            <h3> Stay Sharp, <br></br> Stay Scheduled </h3>
                            <p> From interview prep reminders to follow-up deadlines, keep everything organized and ensure you're always one step ahead.</p>
                        </div>

                        <div className="second-box-task">
                            <img src={UpcomingTasks} alt="Task Image" />
                        </div>
                    </section>

                </div>
            </div>
        
        
        

        </>
       
    );
}


export default Features;