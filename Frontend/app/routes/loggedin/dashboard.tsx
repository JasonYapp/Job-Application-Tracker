import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';

import '../../css/loggedin/dashboard.css';


const Dashboard = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);

    useEffect(() => {
    // Check if user is authenticated
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');
    
    if (!token) {
      // Redirect to login if no token
      navigate('/login');
      return;
    }

    if (userData) {
      setUser(JSON.parse(userData));
    }

    }, [navigate]);


    if (!user) {
        return <div>Loading...</div>;
    }

    return(
      <>
        <div className="dashboard-grid">
          
          <section className="dashboard-title">
            <h1> Hey ___, welcome to your dashboard!</h1>
          </section>

          <section className="stats-section">
            <div className='stats-container'>
              <div className='stats-box'>
                <h3> Total Applications</h3>
              </div>

              <div className='stats-box'>
                <h3> Total Interviews</h3>
              </div>

              <div className='stats-box'>
                <h3> Upcoming Tasks</h3>
              </div>
            </div>
          </section>
            
          <section className='applications-section separate'>
            <div className='applications-container'>
              <h3> Applications</h3>
            </div>
          </section>

        </div>
      
      </>
    );
}


export default Dashboard;