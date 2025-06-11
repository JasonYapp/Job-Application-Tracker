import Navbar from "~/components/navbar/navbar";
import '../css/index.css';




const Home = () => {
    return(
        
        <>

        <div style={{ paddingTop: '2rem' }}>
            <div className="container">

                <section>
                <header> From application to offer - every step in one place.</header>

                    <div className="tagline">
                        <p>With details and reminders on interviews, deadlines and those pesky questionaires, Mission Employment is job tracking made simple.</p>
                        <p> Sign up button here?</p>
                    </div>
                </section>

                <section>
                    <p> Photo view of Kanban timeline here?</p>
                </section>

                <section>
                    <p> One more image off to the side, with text alongside it to explain one more benefit. </p>
                    <p> "A tool to keep you organised. The days of being overwhelmed are gone. With text reminders and calendar integration, never miss another opportunity.</p>
                </section>

            </div>
        </div>
        
        

        </>
       
    );
}


export default Home;