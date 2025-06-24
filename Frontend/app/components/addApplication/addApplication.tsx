import { useState, type FormEvent } from 'react';
import './addApplication.css';

const addApplication = () => {

    const [showNewAppForm, setShowNewAppForm] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const [jobTitle, setJobTitle] = useState('');
    const [company, setCompany] = useState('');
    const [salary, setSalary] = useState('');
    const [workType, setWorkType] = useState('');
    const [jobLink, setJobLink] = useState('');
    const [notes, setNotes] = useState('');
    const [progressionStatus, setProgressionStatus] = useState('');


    const addTask = () => {
        setShowNewAppForm(true);
    }

    const handleSubmit =  async (e: FormEvent) => {
            e.preventDefault();
            setError('');
            setLoading(true);
    
            try {
                const response = await fetch('http://localhost:5000/api/auth/application', {
                  method: 'POST',
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
    
                  setShowNewAppForm(false)
                  
                  // Success - redirect to login or dashboard
                  console.log('Application created successfully:', data);
                  
                  //To reset form for future use
                  setJobTitle('');
                  setCompany('');
                  setSalary('');
                  setWorkType('');
                  setJobLink('');
                  setNotes('');
                  setProgressionStatus('');
    
                } else {
                  setError(data.message || 'Failed to create application');
                }
    
            } catch (error) {
                console.error('Network error:', error);
                setError('Network error. Please check if your backend is running.');
            } finally {
                setLoading(false);
            }
      };


    return(
        <>
        <button className="addTask" onClick={addTask}> New Application </button>

            {showNewAppForm && (
              <div className="popup-overlay">
                <div className="popup-content">
                  
                  <button 
                    className="close-button" 
                    onClick={() => setShowNewAppForm(false)}
                    type="button"
                  >
                    ×
                  </button>
                  
                  <h2>Add New Application</h2>

                  <form onSubmit={handleSubmit}>
                    <div className="form">
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
                        required
                        disabled={loading}
                      >
                        <option value="">Select work type</option>
                        <option value="full-time">Full Time</option>
                        <option value="part-time">Part Time</option>
                        <option value="casual">Casual</option>
                      </select>

                      <input
                        type="text"
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
                        <option value="resume-screen">Resume Screen</option>
                        <option value="cognitive-test">Cognitive Test</option>
                        <option value="digital-interview">Digital Interview</option>
                        <option value="code-exam">Code Exam</option>
                        <option value="in-person-interview">In-Person Interview</option>
                      </select>
                      

                    </div>
                  
                    <div className='submitButton'>
                      <button type="submit" disabled={loading}>
                        {loading ? 'Adding Application...' : 'Add Application'}
                      </button>
                    </div>
                  </form>


                </div>
              </div>
            )}

        </>
    );
}


export default addApplication;