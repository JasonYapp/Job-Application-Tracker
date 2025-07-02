import React, { useState, useEffect, type FormEvent } from 'react';
import { Clock, Plus, Calendar, Timer, AlertCircle } from 'lucide-react';

import './upcomingTasks.css';
import CalendarButton from '../calendarButton/calendarButton';


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

interface CountdownResult {
    timeLeft: string;
    isOverdue: boolean;
}

interface UpcomingTasksProps {
    application: Application;
    onSuccess?: () => void;
}

const UpcomingTasks = ({application, onSuccess}: UpcomingTasksProps) => {
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [date, setDate] = useState('');
    const [time, setTime] = useState('');
    

    const [showAddForm, setShowAddForm] = useState(false);
    

    

    const useCountdown = (targetDate: Date): CountdownResult => {
        const [timeLeft, setTimeLeft] = useState<string>('');
        const [isOverdue, setIsOverdue] = useState<boolean>(false);

        useEffect(() => {
            const timer = setInterval(() => {
                const now = new Date().getTime();
                const target = new Date(targetDate).getTime();
                const difference = target - now;

                if (difference > 0) {
                    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
                    const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
                    
                    if (days > 0) {
                        setTimeLeft(`${days}d ${hours}h ${minutes}m`);
                    } else if (hours > 0) {
                        setTimeLeft(`${hours}h ${minutes}m`);
                    } else {
                        setTimeLeft(`${minutes}m left`);
                    }
                    setIsOverdue(false);
                } else {
                    setTimeLeft('Overdue');
                    setIsOverdue(true);
                }
            }, 1000);

            return () => clearInterval(timer);
        }, [targetDate]);

        return { timeLeft, isOverdue };
    };

    

    const formatDate = (date: string, time: string) => {
        const dateObj = new Date(`${date}T${time}`);
        return dateObj.toLocaleDateString('en-US', { 
            weekday: 'short', 
            month: 'short', 
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    }
  
    const handleSubmit = async (data: FormEvent) => {
        data.preventDefault();
        setError('');
        setLoading(true);

        try {
            
            const response = await fetch('http://localhost:5000/api/auth/task', {
                method: 'POST',
                headers: {
                    'Content-Type' : 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify({
                    title: title, 
                    description: description, 
                    due_date: date, 
                    due_time: time,
                    job_application_id: application.id  
                })
            });

            const data = await response.json();

            if (response.ok) {

                if(onSuccess){
                    onSuccess(); 
                }
    
                setShowAddForm(false);

                setTitle('');
                setDescription('');
                setDate('');
                setTime('');


                } else {
                  setError(data.message || 'Failed to add task');
                }
    
            } catch (error) {
                console.error('Network error:', error);
                setError('Network error. Please check if your backend is running.');
            } finally {
                setLoading(false);
                
            }
    };

    return (
        <div className="upcoming-tasks-container">
            <div className="tasks-header">
                <h2>Upcoming Tasks</h2>
                <button 
                className="add-task-btn"
                onClick={() => setShowAddForm(!showAddForm)}
                >
                <Plus size={16} />
                Add Task
                </button>
            </div>

            {showAddForm && (
                <form onSubmit={handleSubmit}>
                    <div className="add-task-form">
                    <input
                        type="text"
                        placeholder="Task title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                    
                    <textarea
                        placeholder="Description (optional)"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        rows={2}
                    />
                    
                    <div className="form-row">
                        <input
                        type="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        />
                        <input
                        type="time"
                        value={time}
                        onChange={(e) => setTime(e.target.value)}
                        />
                    </div>
                    

                    <div className="form-actions">
                        <button type="submit" className="save-btn" >Save Task</button>
                        <button type="button" className="cancel-btn" onClick={() => setShowAddForm(false)}>Cancel</button>
                    </div>
                    </div>
                </form>
            )}

        
        
        
                
        </div>
    );
}

export default UpcomingTasks;
