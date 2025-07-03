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

interface Task {
    id: number;
    title: string;
    description?: string;
    due_date: string;
    is_completed: boolean;
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




const UpcomingTasks = ({application, onSuccess}: UpcomingTasksProps) => {
    const [showAddForm, setShowAddForm] = useState(false);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [dueDateTime, setDueDateTime] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [tasks, setTasks] = useState<Task[]>([]);
    const [fetchLoading, setFetchLoading] = useState(false);

    const [countdowns, setCountdowns] = useState<{[key: number]: CountdownResult}>({});

    useEffect(() => {
        if (application?.id) {
            fetchTaskCards();
        }
    }, [application?.id]);


    // Update countdowns for all tasks
    useEffect(() => {
        const timer = setInterval(() => {
            const newCountdowns: {[key: number]: CountdownResult} = {};
            
            tasks.forEach(task => {
                const now = new Date().getTime();
                const target = new Date(task.due_date).getTime();
                const difference = target - now;

                if (difference > 0) {
                    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
                    const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
                    
                    let timeLeft = '';
                    if (days > 0) {
                        timeLeft = `${days}d ${hours}h ${minutes}m`;
                    } else if (hours > 0) {
                        timeLeft = `${hours}h ${minutes}m`;
                    } else {
                        timeLeft = `${minutes}m left`;
                    }
                    
                    newCountdowns[task.id] = { timeLeft, isOverdue: false };
                } else {
                    newCountdowns[task.id] = { timeLeft: 'Overdue', isOverdue: true };
                }
            });
            
            setCountdowns(newCountdowns);
        }, 1000);

        return () => clearInterval(timer);
    }, [tasks]);

    
    const formatTaskDate = (dateString: string | number | Date) => {
        try {
            const dateObj = new Date(dateString);
            if (isNaN(dateObj.getTime())) return 'Invalid Date';
            
            return dateObj.toLocaleString('en-US', { 
                weekday: 'short', 
                month: 'short', 
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
                hour12: true
            });
        } catch (error) {
            return 'Invalid Date';
        }
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
                    due_date: dueDateTime, 
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
                setDueDateTime('');
                fetchTaskCards();


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
    


    const fetchTaskCards = async () => {
        try {
            const response = await fetch(`http://localhost:5000/api/auth/FetchTask/${application.id}`, {
                method: 'GET',
                headers : {
                    'Content-Type' : 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            })

            const data = await response.json();

            if (response.ok) {
                setTasks(Array.isArray(data) ? data : []);

                
            } else {
                setError(data.message || 'Failed to fetch tasks');
            }

        }   catch (error) {
                console.error('Error fetching tasks:', error);
                setError('Failed to load tasks');
        }   finally {
                setFetchLoading(false);
        }
    }


    const deleteTask = async (taskID: number) => {
        try {
            const response = await fetch(`http://localhost:5000/api/auth/DeleteTask/${taskID}`, {
                method: 'DELETE',
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
            })

            if (response.ok) {
                console.log('Deleted Task successfully.'); 
                fetchTaskCards();

            } else {
                const data = await response.json();
                setError(data.message || 'Failed to delete task');
            }

        }   catch (error) {
                console.error('Error deleting task:', error);
                setError('Failed to delete task');
        }   
    }


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
                            
                        />
                        
                        <div className="form-row">
                            <p>Due Date:</p>
                            <input
                                placeholder="Task Due Date"
                                type="datetime-local"
                                value={dueDateTime}
                                onChange={(e) => setDueDateTime(e.target.value)}
                            />
                        </div>
                        

                        <div className="form-actions">
                            <button type="submit" className="save-btn" >Save Task</button>
                            <button type="button" className="cancel-btn" onClick={() => setShowAddForm(false)}>Cancel</button>
                        </div>
                    </div>
                </form>
            )}

            
                {fetchLoading ? (
                    <div>Loading tasks...</div>
                ) : error ? (
                    <div className="error-message">{error}</div>
                ) : tasks.length === 0 ? (
                    <div className="empty-tasks">No tasks found for this application</div>
                ) : (
                    tasks.map((task) => {
                        const countdown = countdowns[task.id] || { timeLeft: 'Calculating...', isOverdue: false };
                        
                        return (
                            <div className='taskDisplay'>
                                <div key={task.id} className={`taskCard ${task.is_completed ? 'completed' : ''}`}>
                                    <div className="task-header">
                                        <div className="task-title">
                                            <h3>{task.title}</h3>
                                        </div>
                                        <button 
                                            className="task-delete-btn"
                                            onClick={() => deleteTask(task.id)}
                                            aria-label="Delete task"
                                        >
                                            ×
                                        </button>
                                    </div>
                                    
                                    {task.description && (
                                        <div className="task-description">
                                            <p>{task.description}</p>
                                        </div>
                                    )}

                                    <div className='calendarButton'>
                                        <CalendarButton/>
                                    </div>
                                    
                                    <div className="task-due-date">
                                        <strong>Due: </strong>
                                        {formatTaskDate(task.due_date)}
                                    </div>
                                    
                                    <div className={`task-countdown ${countdown.isOverdue ? 'overdue' : ''}`}>
                                        {countdown.timeLeft}
                                    </div>
                                </div>
                            </div>
                        );
                    })
                )}
            </div>



        
    );
}

export default UpcomingTasks;
