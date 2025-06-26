import { useEffect, useState } from 'react';
import { Users, Brain, Code, MessageCircle, CheckCircle, X, Calendar, Briefcase } from 'lucide-react';
import DashFunnel from '../../components/dashFunnel/DashFunnel';

import '../../css/loggedin/dashboard.css';

interface Application {
    id: number;
    user_id: number;
    company_name: string;
    job_title: string;
    status: string;
    salary_range?: string;
    job_url?: string;
    notes?: string;
    created_at: string;
    updated_at: string;
}

interface ApplicationDataResponse {
    applications: Application[];
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

  // Your existing stage order and colors
  const stageOrder: Array<keyof StageColors> = ['applied', 'cognitive testing', 'code exam', 'interview', 'offer', 'rejected'];
  
  const colors = {
    'applied': '#3B82F6',
    'cognitive testing': '#8B5CF6', 
    'code exam': '#06B6D4',
    'interview': '#10B981',
    'offer': '#22C55E',
    'rejected': '#EF4444'
  };

  const fetchApplications = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token'); 
                                      
      const response = await fetch('http://localhost:5000/api/auth/ApplicationData', {
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


  const calculateSuccessRates = () => {
    if (applications.length === 0) {
      return [];
    }

    const totalApplications = applications.length;
    const stageCounts: { [key: string]: number } = {};

    applications.forEach(app => {
      const status = app.status.toLowerCase();
      stageCounts[status] = (stageCounts[status] || 0) + 1;
    });

    const successfulApplications = applications.filter(app => 
      app.status.toLowerCase() !== 'rejected'
    ).length;

    const successRate = totalApplications > 0 ? (successfulApplications/totalApplications) * 100 : 0;

    const chartData = stageOrder.map(stage => {
      const count = stageCounts[stage] || 0;
      const percentage = totalApplications > 0 ? (count/totalApplications) * 100 : 0;

      return {
        stage: stage.charAt(0).toUpperCase() + stage.slice(1),
        percentage: Math.round(percentage * 100) /100,
        count: count,
        color: colors[stage]
      };
    }).filter(item => item.count > 0);

    return chartData;
  };

  const chartData = calculateSuccessRates();

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
            <h3>Application Pipeline</h3>
            <DashFunnel applications={applications} />
          </div>
        </section>
        
      </div>
    </div>
  );
};

export default Dashboard;