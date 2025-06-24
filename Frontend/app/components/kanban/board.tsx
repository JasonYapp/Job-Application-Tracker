import React, { useState, useEffect, useMemo } from 'react';
import {
    DndContext,
    DragOverlay,
    PointerSensor,
    useSensor,
    useSensors,
    type DragEndEvent,
    type DragStartEvent,
} from '@dnd-kit/core';
import Column from './column'; // We'll create this next
import Task from './task'; // We'll create this last
import AddApplication from "../../components/addApplication/addApplication";

import './board.css';

const Board = () => {

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

    const [applications, setApplications] = useState<Application[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [activeId, setActiveId] = useState<number | null>(null);
    const [activeApplication, setActiveApplication] = useState<Application | null>(null);


    const sensors = useSensors(
        useSensor(PointerSensor, {
            activationConstraint: {
                distance: 8,
            },
        })
    );

    
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

    
    //Group applications by status
    const groupedApplications = useMemo(() => {
        const groups = {
            'applied': [] as Application[],
            'cognitivetesting': [] as Application[],
            'digitalinterview': [] as Application[],
            'codeexam': [] as Application[],
            'interview': [] as Application[],
            'offer': [] as Application[],
            'rejected': [] as Application[]
        };

        applications.forEach(app => {
            const status = app.status.toLowerCase();

            if (groups[status as keyof typeof groups]){
                groups[status as keyof typeof groups].push(app);
            } else {
                groups.applied.push(app);
            }
        });

        return groups;
    }, [applications]);


    //Column Structure
    const columns = [
        {id: 'Applied', title: 'Applied', applications: groupedApplications.applied},
        {id: 'CognitiveTesting', title: 'Cognitive Testing', applications: groupedApplications.cognitivetesting},
        {id: 'DigitalInterview', title: 'Digital Interview', applications: groupedApplications.digitalinterview},
        {id: 'CodeExam', title: 'Code Exam', applications: groupedApplications.codeexam},
        {id: 'Interview', title: 'Interview', applications: groupedApplications.interview},
        {id: 'Offer', title: 'Offer', applications: groupedApplications.offer},
        {id: 'Rejected', title: 'Rejected', applications: groupedApplications.rejected}
    ];


    const handleDragStart = (event: DragStartEvent) => {
        const activeApp = applications.find(app => app.id === event.active.id);
        setActiveId(event.active.id as number);
        setActiveApplication(activeApp || null);
    };

    const handleDragEnd = async (event: DragEndEvent) => {
        const {active, over} = event;
        setActiveId(null);
        setActiveApplication(null);

        if(!over){
            return;
        }

        const activeId = active.id as number;

        //Find which column the item was dropped on
        let newStatus = '';
        for (const column of columns){
            if (column.applications.some(app => app.id === over.id) || column.id === over.id){
                newStatus = column.id;
                break;
            }
        }

        if (!newStatus) {
            return;
        }


        //Find the application being moved
        const applicationToMove = applications.find(app => app.id ===activeId);

        if (!applicationToMove || applicationToMove.status.toLowerCase() === newStatus){
            return;
        }

        //Updates local state immediately - not necessary but better for UX
        setApplications(prev =>
            prev.map(app =>
                app.id === activeId
                ? {...app, status: newStatus}
                : app
            )
        );

        //API call to update application status in DB. 
        try {
            const response = await fetch('http://localhost:5000/api/auth/ApplicationUpdate', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }, 
                body: JSON.stringify({
                    id: activeId,
                    status: newStatus
                })
            });

            if (!response.ok) {
                throw new Error('Failed to fetch applications');
            } 

            const data = await response.json();
            if (data.applications) {
                setApplications(data.applications);
            }

        } catch (error) {
            console.error('Error fetching applications:', error);
            setError('Failed to load applications');
        } finally {
            setLoading(false);
        }
        

        if (loading) {
            return <h2>Loading applications...</h2>
        }

        if (error) {
            return <h2>Error: {error}</h2>
        }
    }

    return (
        <div className="board-container">

            <div className='board-header'>
                <h1 className="board-title">Job Progress Line</h1>
                <AddApplication />
            </div>
            
            <DndContext
                sensors={sensors}
                onDragStart={handleDragStart}
                onDragEnd={handleDragEnd}
            >
                <div className="columns-container">
                    {columns.map(column => (
                        <Column
                        key={column.id}
                        title={column.title}
                        applications={column.applications}
                        status={column.id}
                        />
                    ))}
                </div>

                <DragOverlay>
                {activeApplication ? (
                    <div className="drag-overlay">
                    <h3 className="drag-overlay-title">{activeApplication.job_title}</h3>
                    <p className="drag-overlay-company">{activeApplication.company_name}</p>
                    </div>
                ) : null}
                </DragOverlay>
            </DndContext>
            
            {applications.length === 0 && (
                <div className="empty-state">
                <p>No applications found</p>
                </div>
            )}
        </div>



    );
}


export default Board;
    