import { Link } from 'react-router';
import '../css/about.css';


const About = () => {
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
                        <h1> Built by Someone Who's Been There </h1> 
                        <p>The modern job application process is broken. As someone who navigated the demanding world of tech hiring, I experienced firsthand how overwhelming it can become. 
                            That's why I built Mission Employment - to bring sanity back to job searching.</p>
                    </section>

                    <section className='story-box'>
                            <h3> The Hidden Complexity of Modern Hiring </h3>
                            <p>What many don't realize is that applying for jobs has become a full-time endeavor. 
                                In software engineering, a single application can involve 6-8 distinct stages: 
                                resume screening, cognitive assessments, digital interviews, coding challenges, assessment centers, panel interviews, and final rounds.
                            </p>

                            <p>
                                Each stage comes with aggressive timelines - typically 48-72 hours. Cognitive tests can consume 2 hours. Coding assessments demand another 2 hours. 
                                Digital interviews add more complexity. Apply to multiple companies simultaneously, and you're suddenly managing a maze of overlapping deadlines and requirements.
                            </p>
                    </section>

                    <section className='story-box'>
                            <h3> When Process Becomes Chaos </h3>
                            <p>I found myself juggling cognitive tests due tomorrow, coding challenges due the next day, multiple digital interviews throughout the week 
                                - all while trying to remember which company required which specific assessment format. The mental overhead was staggering.
                            </p>

                            <p>
                                It wasn't just challenging - it was unsustainable. 
                            </p>
                    </section>

                    <section className='story-box'>
                            <h3> From Personal Pain Point to Purpose </h3>
                            <p> Mission Employment emerged from necessity. I needed to track every stage of every application, monitor live deadlines, and maintain organized records of each opportunity. 
                                What began as a personal solution became something I realized the entire job-seeking community needed.
                            </p>

                            <p>
                                Every feature addresses a real friction point I encountered during my own search. 
                                The Kanban boards, the deadline tracking, the progress analytics - all born from moments of frustration that I knew could be solved with better organization.
                            </p>
                    </section>

                    <section className='first-box'>
                            <h3> Restoring Focus to What Matters </h3>
                            <p> When you're already focused on landing your ideal role, you shouldn't have to worry about losing track of applications or missing critical deadlines. 
                                Mission Employment handles the chaos so you can focus on what truly matters - showcasing your skills and finding the right opportunity.
                            </p>
                    </section>

                    <section className="sign-up-section">
                        <h3>Ready to Take Control?</h3>
                        <p>Join other job seekers who've transformed their search from chaos to clarity with Mission Employment.</p>
                        <Link to="/signup" className="sign-up-button">
                            <button>Start Your Journey</button>
                        </Link>
                    </section>

                </div>
            </div>
        
        
        

        </>
       
    );
}


export default About;