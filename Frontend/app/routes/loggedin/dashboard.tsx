import { useEffect, useState } from 'react';
import { Users, Brain, Code, MessageCircle, CheckCircle, X, Calendar, Briefcase } from 'lucide-react';
import DashFunnel from '../../components/dashFunnel/dashFunnel';

import '../../css/loggedin/dashboard.css';

interface Application {
    id: number;
    user_id: number;
    company_name: string;
    job_title: string;
    status: string;
    previous_status?: string;
    salary_range?: string;
    job_url?: string;
    notes?: string;
    created_at: string;
    updated_at: string;
}


interface ChartData {
    stage: string;
    percentage: number;
    count: number;
    color: string;
}

type StageColors = {
    [key in 'applied' | 'cognitive testing' | 'code exam' | 'interview' | 'offer' | 'rejected']: string;
};


const Dashboard = () => {
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');

  const fetchApplications = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token'); 
                                      
      const response = await fetch('https://job-application-tracker-production-f608.up.railway.app/api/auth/ApplicationData', {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error('Failed to fetch applications');
      }

      const data = await response.json();
      setApplications(data.applications || []);
    } catch (error) {
      console.error('Error fetching applications:', error);
      setError('Failed to load applications');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApplications();
  }, []);


  // Calculate stats for the stats boxes
  const totalApplications = applications.length;
  const totalInterviews = applications.filter(app => 
    app.status.toLowerCase() === 'interview'
  ).length;
  const totalOffers = applications.filter(app => 
    app.status.toLowerCase() === 'offer'
  ).length;

  if (loading) {
    return (
      <div className="background-container loading-container">
        <div className="loading-content">
          <div className="loading-spinner"></div>
          <p>Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="background-container error-container">
        <div className="error-content">
          <X size={48} className="error-icon" />
          <p className="error-message">{error}</p>
          <button 
            onClick={fetchApplications}
            className="retry-button"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="background-container">
      <div className="dashboard-grid">
        
        <section className="dashboard-title">
          <h1>Hey there, welcome to your dashboard!</h1>
        </section>

        <section className="stats-section">
          <div className="stats-container">
            <div className="stats-box">
              <h3>Total Applications</h3>
              <p className="totalApplications">{totalApplications}</p>
            </div>
            <div className="stats-box">
              <h3>Total Interviews</h3>
              <p className="totalApplications">{totalInterviews}</p>
            </div>
            <div className="stats-box">
              <h3>Total Offers</h3>
              <p className="totalApplications">{totalOffers}</p>
            </div>
          </div>
        </section>
          
        <section className="applications-section separate">
          <div className="applications-container">
            <DashFunnel applications={applications} />
          </div>
        </section>
        
      </div>
    </div>
  );
};

export default Dashboard;