import React, { useEffect } from 'react';
import { useState } from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import './task.css';

const Task = () => {

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

    const [applications, setApplications] = useState<Application[]>([])
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() =>  {
        fetchApplications();
    }, [])

    const fetchApplications = async () => {

        setLoading(true);
        setError('');

        try {
            const response = await fetch('http://localhost:5000/api/auth/ApplicationData', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            })

            if (!response.ok) {
                throw new Error('Failed to fetch applications');
            }

            const data = await response.json();
            setApplications(data.applications);
            

        } catch (error) {
            console.error('Error fetching applications:', error);
            setError('Failed to load applications');
        } finally {
            setLoading(false);
        }
    }

    // Handle loading state
    if (loading) {
        return <div>Loading applications...</div>;
    }

    // Handle error state
    if (error) {
        return <div>Error: {error}</div>;
    }

    return(
        <div>
        {applications.length === 0 ? (
            <p> No applications found </p>
        ) : (
            <div>
                {applications.map(app => (
                    <div key={app.id} className='task-container'>

                        <h3> {app.job_title} </h3>

                        <p>{app.company_name}</p>
                        <p>${app.salary_range}</p>
                        <p>{new Date(app.created_at).toLocaleDateString()}</p>
                        <p>{app.status}</p>
                    </div>
                ))}
            </div>
            
        )}

        </div>
    );



}



export default Task;