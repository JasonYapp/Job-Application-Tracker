import { useState } from 'react';

import './calendarButton.css';

const CalendarButton = () => {
     const [loading, setLoading] = useState(false);
    
    return(

        <button 
            type="button" 
            className="calendar-button"
            onClick={() => {/* No function yet */}}
            disabled={loading}
          >
            📅 Link to Google Calendar
          </button>
    );
}


export default CalendarButton;