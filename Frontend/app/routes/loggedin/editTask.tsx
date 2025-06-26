import { useEffect, useState, type FormEvent } from 'react';
import { useNavigate, useParams } from 'react-router';

import '../../css/loggedin/editTask.css'


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


interface EditProps {
    application: Application;
    onSuccess?: () => void
    
}

const EditTask = ({ onSuccess}: EditProps) => {
    const { id } = useParams();
    const [fetchLoading, setFetchLoading] = useState(true);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [jobTitle, setJobTitle] = useState('');
    const [company, setCompany] = useState('');
    const [salary, setSalary] = useState('');
    const [workType, setWorkType] = useState('');
    const [jobLink, setJobLink] = useState('');
    const [notes, setNotes] = useState('');
    const [progressionStatus, setProgressionStatus] = useState('');
    const [application, setApplication] = useState(null);
    const navigate = useNavigate();


    useEffect(() => {
        const fetchApplication = async () => {
            if (!id) {
                setError('No application ID provided');
                setFetchLoading(false);
                return;
            }

            try {
                setFetchLoading(true);
                const response = await fetch(`http://localhost:5000/api/auth/SingleApplication/${id}`, {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                    }
                });

                const data = await response.json();

                if (response.ok) {
                    setApplication(data);
                    populateForm(data);
                } else {
                    setError(data.message || 'Failed to fetch application');
                }
            } catch (error) {
                console.error('Failed to fetch application:', error);
                setError('Failed to load application data');
            } finally {
                setFetchLoading(false);
            }
        };

        fetchApplication();
    }, [id]);

    // Function to populate form with existing data
    const populateForm = (app: Application) => {
        setJobTitle(app.job_title);
        setCompany(app.company_name);
        setSalary(app.salary_range || '');
        setJobLink(app.job_url || '');
        setNotes(app.notes || '');
        setProgressionStatus(app.status);
    };


    const handleSubmit = async (e: FormEvent) => {
            e.preventDefault();
            setError('');
            setLoading(true);
    
            try {
                // Use PUT method and include application ID in URL
                const response = await fetch(`http://localhost:5000/api/auth/EditApplication/${id}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                    },
                    body: JSON.stringify({
                        job_title: jobTitle,
                        company_name: company,
                        salary_range: salary,
                        status: progressionStatus,
                        job_url: jobLink,
                        notes: notes
                    })
                });
    
                const data = await response.json();
    
                if (response.ok) {
                    
                    console.log('Application updated successfully:', data);
                    
                    if(onSuccess){
                        onSuccess(); // Refresh the data
                    }

                    navigate('/progressLine');
                    
                    
                } else {
                    setError(data.message || 'Failed to update application');
                }
    
        } catch (error) {
            console.error('Network error:', error);
            setError('Network error. Please check if your backend is running.');
        } finally {
            setLoading(false);
        }
    };

    // Show loading spinner while fetching data
    if (fetchLoading) {
        return (
            <div className='background'>
                <div style={{ paddingTop: '2rem' }}>
                    <div className="container">
                        <div>Loading application data...</div>
                    </div>
                </div>
            </div>
        );
    }

    // Show error if failed to fetch
    if (error && !application) {
        return (
            <div className='background'>
                <div style={{ paddingTop: '2rem' }}>
                    <div className="container">
                        <div style={{ color: 'red' }}>Error: {error}</div>
                        <button onClick={() => navigate('/progressLine')}>Back to Job Progress Line</button>
                    </div>
                </div>
            </div>
        );
    }


    const onCancel = () => {
        navigate('/progressLine');
    }
    
        

    return(
        <>
            <div className='background'>
                <div style={{ paddingTop: '2rem' }}>
                    <div className="container">

                    

                    <form onSubmit={handleSubmit}>
                            
                            <div className="form">
                                <h2> Edit Task</h2>

                                {error && (
                                    <div className="error-message" style={{ color: 'red', marginBottom: '1rem' }}>
                                        {error}
                                    </div>
                                )}

                                <input
                                    type="text"
                                    name="jobTitle"
                                    value={jobTitle}
                                    onChange={(e) => setJobTitle(e.target.value)}
                                    placeholder="Enter job title"
                                    required
                                    disabled={loading}
                                />

                                <input
                                    type="text"
                                    name="company"
                                    value={company}
                                    onChange={(e) => setCompany(e.target.value)}
                                    placeholder="Company Name"
                                    required
                                    disabled={loading}
                                />

                                <input
                                    type="number"
                                    name="salary"
                                    value={salary}
                                    onChange={(e) => setSalary(e.target.value)}
                                    placeholder="Enter salary"
                                    required
                                    disabled={loading}
                                    min="0"
                                    step="1000"
                                />

                                <select
                                    name="workType"
                                    value={workType}
                                    onChange={(e) => setWorkType(e.target.value)}
                                    disabled={loading}
                                >
                                    <option value="">Select work type</option>
                                    <option value="full-time">Full Time</option>
                                    <option value="part-time">Part Time</option>
                                    <option value="casual">Casual</option>
                                </select>

                                <input
                                    type="url"
                                    name="jobLink"
                                    value={jobLink}
                                    onChange={(e) => setJobLink(e.target.value)}
                                    placeholder="Job Link"
                                    required
                                    disabled={loading}
                                />

                                <textarea
                                    className="additional-notes"
                                    name="notes"
                                    value={notes}
                                    onChange={(e) => setNotes(e.target.value)}
                                    placeholder="Additional Notes"
                                    disabled={loading}
                                />

                                <select
                                    name="progressionStatus"
                                    value={progressionStatus}
                                    onChange={(e) => setProgressionStatus(e.target.value)}
                                    required
                                    disabled={loading}
                                >
                                    <option value="">Select progression status</option> 
                                    <option value="Applied">Applied</option>
                                    <option value="CognitiveTesting">Cognitive Test</option>
                                    <option value="DigitalInterview">Digital Interview</option>
                                    <option value="CodeExam">Code Exam</option>
                                    <option value="Interview">In-Person Interview</option>
                                </select>
                            </div>
                        
                            <div className='submitButton'>
                                <button type="submit" disabled={loading}>
                                    {loading ? 'Updating Application...' : 'Update Application'}
                                </button>

                                
                                <button 
                                    type="button" 
                                    onClick={onCancel}
                                    disabled={loading}
                                    style={{ marginLeft: '1rem' }}
                                >
                                    Back to Job Progress Line
                                </button>
                                
                            </div>
                        </form>
                        

                    </div>
                </div>
            </div>
        </>
    );
}



export default EditTask;