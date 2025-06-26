import React, { useState, useEffect } from 'react';
import { Users, Brain, Code, MessageCircle, CheckCircle, X, Calendar, Briefcase, type LucideIcon } from 'lucide-react';
import './dashFunnel.css';

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

interface DashFunnelProps {
  applications: Application[];
}

interface Stage {
  key: string;
  name: string;
  icon: LucideIcon;
  color: string;
  bgColor?: string;
}

interface FunnelData extends Stage {
  count: number;
  percentage: number;
  conversionFromPrevious: number;
}


const DashFunnel: React.FC<DashFunnelProps> = ({ applications }) => {
    const [funnelData, setFunnelData] = useState<FunnelData[]>([]);

    const stages = [
        {
            key: 'applied',
            name: 'Applied',
            icon: Users,
            color: 'bg-blue-500',
        },
        { 
            key: 'cognitive testing', 
            name: 'Cognitive Test', 
            icon: Brain, 
            color: 'bg-purple-500',
            bgColor: 'bg-purple-50'
        },
        { 
            key: 'code exam', 
            name: 'Code Exam', 
            icon: Code, 
            color: 'bg-cyan-500',
            bgColor: 'bg-cyan-50'
        },
        { 
            key: 'interview', 
            name: 'Digital Interview', 
            icon: MessageCircle, 
            color: 'bg-emerald-500',
            bgColor: 'bg-emerald-50'
        },
        { 
            key: 'offer', 
            name: 'Offer', 
            icon: CheckCircle, 
            color: 'bg-green-500',
            bgColor: 'bg-green-50'
        }
    ];

    useEffect(() => {
        if (applications && applications.length > 0) {
        calculateFunnelData();
        }
    }, [applications]);


    const calculateFunnelData = () => {
        const totalApplications = applications.length;
        
        if (totalApplications === 0) {
        setFunnelData([]);
        return;
        }

        const stageCounts: { [key: string]: number } = {};
        
        // Count applications in each stage
        applications.forEach(app => {
        const status = app.status.toLowerCase();
        stageCounts[status] = (stageCounts[status] || 0) + 1;
        });

        // Calculate cumulative counts (applications that reached each stage or beyond)
        const cumulativeCounts: { [key: string]: number } = {};
        
        stages.forEach((stage, index) => {
        if (index === 0) {
            // First stage includes all non-rejected applications
            cumulativeCounts[stage.key] = applications.filter(app => 
            app.status.toLowerCase() !== 'rejected'
            ).length;
        } else {
            // For subsequent stages, count applications that reached this stage or beyond
            let reachedThisStage = 0;
            for (let i = index; i < stages.length; i++) {
            reachedThisStage += stageCounts[stages[i].key] || 0;
            }
            cumulativeCounts[stage.key] = reachedThisStage;
        }
        });

        // Calculate funnel data with percentages
        const funnel = stages.map((stage, index) => {
        const count = cumulativeCounts[stage.key] || 0;
        const percentage = totalApplications > 0 ? (count / totalApplications) * 100 : 0;
        const prevStageCount = index === 0 ? totalApplications : cumulativeCounts[stages[index - 1].key] || 0;
        const conversionFromPrevious = prevStageCount > 0 ? (count / prevStageCount) * 100 : 0;

        return {
            ...stage,
            count,
            percentage: Math.round(percentage * 10) / 10,
            conversionFromPrevious: Math.round(conversionFromPrevious * 10) / 10
        };
        });

        setFunnelData(funnel);
    };

    const getBarWidth = (percentage: number): string => {
        return `${Math.max(percentage, 2)}%`;
    };

    if (!funnelData.length) {
        return (
        <div className="funnel-no-data">
            No application data to display
        </div>
        );
    }




    return (
        <div className="funnel-container">
            <div className="funnel-stages">
                {funnelData.map((stage, index) => {
                const Icon = stage.icon;
                const isFirst = index === 0;
                
                return (
                    <div key={stage.key} className="funnel-stage-wrapper">
                    <div className={`funnel-stage funnel-stage-${stage.key.replace(' ', '-')}`}>
                        <div 
                        className={`funnel-progress funnel-progress-${stage.key.replace(' ', '-')}`}
                        style={{ width: getBarWidth(stage.percentage) }}
                        />
                        
                        <div className="funnel-content">
                        <div className="funnel-left">
                            <div className={`funnel-icon funnel-icon-${stage.key.replace(' ', '-')}`}>
                            <Icon size={16} />
                            </div>
                            <div className="funnel-details">
                            <h4 className="funnel-stage-name">
                                {stage.name}
                            </h4>
                            <div className="funnel-metrics">
                                <span className="funnel-count">{stage.count} applications</span>
                                {!isFirst && (
                                <span className="funnel-conversion">
                                    {stage.conversionFromPrevious}% conversion
                                </span>
                                )}
                            </div>
                            </div>
                        </div>
                        
                        <div className="funnel-percentage">
                            {stage.percentage}%
                        </div>
                        </div>
                    </div>
                    
                    {index < funnelData.length - 1 && (
                        <div className="funnel-connector">
                        <div className="funnel-connector-dot">
                            <div className="funnel-connector-inner"></div>
                        </div>
                        </div>
                    )}
                    </div>
                );
                })}
            </div>
        </div>
    );
}



export default DashFunnel;