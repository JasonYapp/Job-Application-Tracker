import React, { useState } from 'react';
import { useDraggable } from '@dnd-kit/core';
import './task.css';
import { useNavigate } from 'react-router';


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

interface TaskProps {
    application: Application;
    onApplicationDeleted: () => void;
}

const Task = ({ application, onApplicationDeleted }: TaskProps) => {

    const navigate = useNavigate();

    const handleDelete = async () => {
        
        try {
            const response = await fetch(`https://job-application-tracker-production-f608.up.railway.app/api/auth/DeleteApplication/${application.id}`, {
            method: 'DELETE',
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
            });

            if (response.ok) {
            console.log('Deleted');
            onApplicationDeleted(); // Refresh board
            } else {
            const data = await response.json();
            console.error('Delete failed:', data.message);
            }
        } catch (error) {
            console.error('Error:', error);
        } 
    };

    

    const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
        id: application.id,
    });

    const style = transform ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
        opacity: isDragging ? 0.5 : 1,
    } : undefined;

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric'
        });
    };


    return (
        <div
            ref={setNodeRef}
            style={style}
            {...listeners}
            {...attributes}
            className={`task ${isDragging ? 'task-dragging' : ''}`}
        >
            <div className="task-header">
                <h3 className="task-title">{application.job_title}</h3>
                <div className="task-drag-handle">⋮⋮</div>
            </div>
            
            <div className="task-company">
                <span className="company-name">{application.company_name}</span>
            </div>

            {application.salary_range && (
                <div className="task-salary">
                    <span className="salary-label">Salary:</span>
                    <span className="salary-value">{application.salary_range}</span>
                </div>
            )}

            <div className="task-dates">
                <div className="task-date">
                    <span className="date-label">Applied:</span>
                    <span className="date-value">{formatDate(application.created_at)}</span>
                </div>
                {application.updated_at !== application.created_at && (
                    <div className="task-date">
                        <span className="date-label">Updated:</span>
                        <span className="date-value">{formatDate(application.updated_at)}</span>
                    </div>
                )}
            </div>

            {application.notes && (
                <div className="task-notes">
                    <span className="notes-label">Notes:</span>
                    <p className="notes-text">{application.notes}</p>
                </div>
            )}

            {application.job_url && (
                <div className="task-url">
                    <a href={application.job_url} target="_blank" rel="noopener noreferrer" className="job-link">
                        View Job Posting
                    </a>

                    <div style={{ display: 'flex', gap: '4px', marginTop: '4px' }}>
                        <button 
                            onClick={() => navigate(`/editTask/${application.id}`)}
                            className="edit-link"
                        >
                            Edit
                        </button>

                        <button 
                            onClick={() => handleDelete()}
                            className="delete-link"
                        >
                            Delete 
                        </button>
                    </div>

                </div>

                
            )}
        </div>
    );
};

export default Task;