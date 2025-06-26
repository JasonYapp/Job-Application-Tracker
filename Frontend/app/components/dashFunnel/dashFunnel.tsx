import React, { useState, useEffect } from 'react';
import { Users, Brain, Code, MessageCircle, CheckCircle, UserCheck } from 'lucide-react';
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
    previous_status?: string; // Track where application was before rejection
}

interface DashFunnelProps {
  applications: Application[];
}

interface Stage {
  key: string;
  name: string;
  icon: any;
  color: string;
  bgColor?: string;
}

interface FunnelData extends Stage {
  count: number;
  rejectedCount: number;
  totalReached: number;
  percentage: number;
  conversionFromPrevious: number;
  rejectionRate: number;
}

const DashFunnel: React.FC<DashFunnelProps> = ({ applications }) => {
    const [funnelData, setFunnelData] = useState<FunnelData[]>([]);

    const stages: Stage[] = [
        {
            key: 'applied',
            name: 'Applied',
            icon: Users,
            color: 'bg-blue-500',
            bgColor: 'bg-blue-50'
        },
        { 
            key: 'cognitive testing', 
            name: 'Cognitive Tests', 
            icon: Brain, 
            color: 'bg-purple-500',
            bgColor: 'bg-purple-50'
        },
        { 
            key: 'interview', 
            name: 'Digital Interview', 
            icon: MessageCircle, 
            color: 'bg-emerald-500',
            bgColor: 'bg-emerald-50'
        },
        { 
            key: 'code exam', 
            name: 'Code Exam', 
            icon: Code, 
            color: 'bg-cyan-500',
            bgColor: 'bg-cyan-50'
        },
        { 
            key: 'physical interview', 
            name: 'Physical Interview', 
            icon: UserCheck, // Changed from Code to UserCheck
            color: 'bg-indigo-500',
            bgColor: 'bg-indigo-50'
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

    const getStageIndex = (status: string): number => {
        return stages.findIndex(stage => stage.key.toLowerCase() === status.toLowerCase());
    };

    const calculateFunnelData = () => {
        const totalApplications = applications.length;
        
        if (totalApplications === 0) {
            setFunnelData([]);
            return;
        }

        // Initialize stage data
        const stageData: { [key: string]: { current: number; rejected: number; totalReached: number } } = {};
        
        stages.forEach(stage => {
            stageData[stage.key] = {
                current: 0,
                rejected: 0,
                totalReached: 0
            };
        });

        // Process each application
        applications.forEach(app => {
            const currentStatus = app.status.toLowerCase();
            const currentStageIndex = getStageIndex(currentStatus);
            
            if (currentStatus === 'rejected') {
                // For rejected applications, count them in their previous stage
                const previousStatus = app.previous_status?.toLowerCase() || 'applied';
                const previousStageIndex = getStageIndex(previousStatus);
                
                if (previousStageIndex >= 0) {
                    const stageKey = stages[previousStageIndex].key;
                    stageData[stageKey].rejected++;
                    stageData[stageKey].totalReached++;
                    
                    // This application reached all stages up to and including the rejection stage
                    for (let i = 0; i <= previousStageIndex; i++) {
                        if (i < previousStageIndex) {
                            stageData[stages[i].key].totalReached++;
                        }
                    }
                }
            } else if (currentStageIndex >= 0) {
                // For non-rejected applications
                const stageKey = stages[currentStageIndex].key;
                stageData[stageKey].current++;
                
                // This application reached all stages up to and including current stage
                for (let i = 0; i <= currentStageIndex; i++) {
                    stageData[stages[i].key].totalReached++;
                }
            } else {
                // Handle unknown statuses by putting them in 'applied'
                stageData['applied'].current++;
                stageData['applied'].totalReached++;
            }
        });

        // Calculate funnel metrics
        const funnel: FunnelData[] = stages.map((stage, index) => {
            const data = stageData[stage.key];
            const totalReached = data.totalReached;
            const currentCount = data.current;
            const rejectedCount = data.rejected;
            
            // Percentage of total applications that reached this stage
            const percentage = totalApplications > 0 ? (totalReached / totalApplications) * 100 : 0;
            
            // Conversion rate from previous stage
            let conversionFromPrevious = 100; // First stage is always 100%
            if (index > 0) {
                const previousStageReached = stageData[stages[index - 1].key].totalReached;
                conversionFromPrevious = previousStageReached > 0 ? (totalReached / previousStageReached) * 100 : 0;
            }
            
            // Rejection rate at this stage
            const rejectionRate = totalReached > 0 ? (rejectedCount / totalReached) * 100 : 0;

            return {
                ...stage,
                count: currentCount,
                rejectedCount,
                totalReached,
                percentage: Math.round(percentage * 10) / 10,
                conversionFromPrevious: Math.round(conversionFromPrevious * 10) / 10,
                rejectionRate: Math.round(rejectionRate * 10) / 10
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
                            <div className={`funnel-stage funnel-stage-${stage.key.replace(/\s+/g, '-')}`}>
                                <div 
                                    className={`funnel-progress funnel-progress-${stage.key.replace(/\s+/g, '-')}`}
                                    style={{ width: getBarWidth(stage.percentage) }}
                                />
                                
                                <div className="funnel-content">
                                    <div className="funnel-left">
                                        <div className={`funnel-icon funnel-icon-${stage.key.replace(/\s+/g, '-')}`}>
                                            <Icon size={16} />
                                        </div>
                                        <div className="funnel-details">
                                            <h4 className="funnel-stage-name">
                                                {stage.name}
                                            </h4>
                                            <div className="funnel-metrics">
                                                <span className="funnel-count">
                                                    {stage.count} active
                                                    {stage.rejectedCount > 0 && (
                                                        <span className="funnel-rejected"> • {stage.rejectedCount} rejected</span>
                                                    )}
                                                </span>
                                                {!isFirst && (
                                                    <span className="funnel-conversion">
                                                        {stage.conversionFromPrevious}% advance rate
                                                    </span>
                                                )}
                                                {stage.rejectionRate > 0 && (
                                                    <span className="funnel-rejection">
                                                        {stage.rejectionRate}% rejection rate
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                    
                                    <div className="funnel-right">
                                        <div className="funnel-percentage">
                                            {stage.percentage}%
                                        </div>
                                        <div className="funnel-total">
                                            {stage.totalReached} reached
                                        </div>
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
};

export default DashFunnel;