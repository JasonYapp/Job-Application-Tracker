import React from 'react';
import { useDroppable } from '@dnd-kit/core';
import Task from './task';

import './column.css';


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

interface ColumnProps {
    title: string;
    applications: Application[];
    status: string;
    onApplicationDeleted: () => void;
}


const Column = ({ title, applications, status, onApplicationDeleted }: ColumnProps) => {

    const { isOver, setNodeRef } = useDroppable({
        id: status,
    });

    const style = {
        backgroundColor: isOver ? '#f0f9ff' : undefined,
    };

    return (
        <div 
            ref={setNodeRef} 
            style={style}
            className={`column ${isOver ? 'column-over' : ''}`}
        >
            <div className="column-header">
                <h2 className="column-title">{title}</h2>
                <span className="column-count">{applications.length}</span>
            </div>
            
            <div className="column-content">
                {applications.map((application) => (
                    <Task 
                        key={application.id} 
                        application={application} 
                        onApplicationDeleted={onApplicationDeleted}
                    />
                ))}
                
                {applications.length === 0 && (
                    <div className="column-empty">
                        <p>No applications</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Column;