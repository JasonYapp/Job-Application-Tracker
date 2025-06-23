import {  useState } from "react";

import '../../css/loggedin/progressLine.css';

const ProgressLine= () => {

    const [showNewAppForm, setShowNewAppForm] = useState(false);
    const [loading, setLoading] = useState(false);

    const [jobTitle, setJobTitle] = useState('');
    const [salary, setSalary] = useState('');
    const [workType, setWorkType] = useState('');
    const [progressionStatus, setProgressionStatus] = useState('');


    const addTask = () => {
        setShowNewAppForm(true);
        
   }

   const handleSubmit = () => {
        console.log()
        
   }



    
    //Columns State
    const [columns] = useState([
        {id: 'applied', title: 'Applied'},
        {id: 'cognitive', title: 'Cognitive Testing'},
        {id: 'digital-interview', title: 'Digital Interview'},
        {id: 'code-exam', title: 'Code Exam'},
        {id: 'interview', title: 'interview'}
    ]);


    //Initialise empty task array
   const [tasks, setTasks] = useState([]); 
    
    
    return (
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

          <button 
            type="button" 
            className="calendar-button"
            onClick={() => {/* No function yet */}}
            disabled={loading}
          >
            📅 Link to Google Calendar
          </button>
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

export default ProgressLine;