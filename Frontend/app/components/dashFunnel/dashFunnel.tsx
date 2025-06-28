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
    previous_status?: string; // Track where application was before rejection. IN TESTING FOR DASHFUNNEL.
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

    console.log('DashFunnel received applications:', applications);

    // Find any rejected applications and log their previous_status
    const rejectedApps = applications.filter(app => app.status.toLowerCase() === 'rejected');
    console.log('Rejected apps in funnel:', rejectedApps);
    rejectedApps.forEach(app => {
        console.log(`App ${app.company_name}: previous_status = ${app.previous_status}`);
    });


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
            icon: UserCheck, 
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


    // Step 1: Define what we're tracking
    const calculateFunnelData = () => {
        const totalApplications = applications.length;

        
        if (totalApplications === 0) {
            setFunnelData([]);
            return;
        }

        // Step 2: Initialize simple counters (one for each stage)
        // These track TOTAL applications that have reached each stage
        let appliedCount = 0;
        let cognitiveCount = 0;
        let digitalInterviewCount = 0;
        let codeExamCount = 0;
        let physicalInterviewCount = 0;
        let offerCount = 0;

        // These track applications CURRENTLY at each stage
        let currentApplied = 0;
        let currentCognitive = 0;
        let currentDigitalInterview = 0;
        let currentCodeExam = 0;
        let currentPhysicalInterview = 0;
        let currentOffer = 0;

        // These track applications REJECTED from each stage
        let rejectedFromApplied = 0;
        let rejectedFromCognitive = 0;
        let rejectedFromDigitalInterview = 0;
        let rejectedFromCodeExam = 0;
        let rejectedFromPhysicalInterview = 0;
        let rejectedFromOffer = 0;

        // Step 3: Define processing functions inside calculateFunnelData so they can access the variables
        function processRejectedApplication(app: Application) {

            // Get the stage they were rejected FROM. 
            const previousStatus = app.previous_status?.toLowerCase() || 'applied';

            //DEBUGGING TEST. NEED TO IMPLEMENT BACKEND ROUTES AND NEW API CALL FOR FRONTEND TO RETRIEVE previous_status FROM DB ONCE ADDED AS A PROPERTY.
            console.log('Rejected app:', app.company_name, 'previous_status:', app.previous_status, 'normalized:', previousStatus);
            
            // Every rejected application had to apply first
            appliedCount++;
            
            // Figure out what stage they were rejected from
            switch (previousStatus) {
                case 'applied':
                    rejectedFromApplied++;
                    break;
                    
                case 'cognitivetesting':
                    // Application passed applied, reached cognitive, got rejected from cognitive
                    cognitiveCount++;
                    rejectedFromCognitive++;
                    break;
                    
                case 'digitalinterview': 
                    // Application passed: applied → cognitive → reached digital interview → rejected
                    cognitiveCount++;
                    digitalInterviewCount++;
                    rejectedFromDigitalInterview++;
                    break;
                    
                case 'codeexam':
                    // Application passed: applied → cognitive → digital → reached code → rejected
                    cognitiveCount++;
                    digitalInterviewCount++;
                    codeExamCount++;
                    rejectedFromCodeExam++;
                    break;
                    
                case 'interview':
                    // Application passed: applied → cognitive → digital → code → reached physical → rejected
                    cognitiveCount++;
                    digitalInterviewCount++;
                    codeExamCount++;
                    physicalInterviewCount++;
                    rejectedFromPhysicalInterview++;
                    break;
                    
                case 'offer':
                    // Application passed everything, reached offer, then rejected
                    cognitiveCount++;
                    digitalInterviewCount++;
                    codeExamCount++;
                    physicalInterviewCount++;
                    offerCount++;
                    rejectedFromOffer++;
                    break;
            }
        }

        

        function processActiveApplication(app: Application, status: string) {

            console.log('Processing status:', status);

            //Adding this as every active application will have had to be set to 'applied' at a minimum
            appliedCount++;
            
            switch (status) {
                case 'applied':
                    currentApplied++;
                    break;
                    
                case 'cognitivetesting':
                    cognitiveCount++;
                    currentCognitive++;
                    break;
                    
                case 'digitalinterview': 
                    cognitiveCount++;
                    digitalInterviewCount++;
                    currentDigitalInterview++;
                    break;
                    
                case 'codeexam':
                    cognitiveCount++;
                    digitalInterviewCount++;
                    codeExamCount++;
                    currentCodeExam++;
                    break;
                    
                case 'interview':
                    cognitiveCount++;
                    digitalInterviewCount++;
                    codeExamCount++;
                    physicalInterviewCount++;
                    currentPhysicalInterview++;
                    break;
                    
                case 'offer':
                    cognitiveCount++;
                    digitalInterviewCount++;
                    codeExamCount++;
                    physicalInterviewCount++;
                    offerCount++;
                    currentOffer++;
                    break;
                    
                default:
                    // Unknown status, put in applied as default. Although slight potential to cause issues.
                    currentApplied++;
                    break;
            }
        }

        function buildFunnelArray() {

            const totalCounts = [
                appliedCount,
                cognitiveCount, 
                digitalInterviewCount,
                codeExamCount,
                physicalInterviewCount,
                offerCount
            ];
            
            const currentCounts = [
                currentApplied,
                currentCognitive,
                currentDigitalInterview,
                currentCodeExam,
                currentPhysicalInterview,
                currentOffer
            ];
            
            const rejectedCounts = [
                rejectedFromApplied,
                rejectedFromCognitive,
                rejectedFromDigitalInterview,
                rejectedFromCodeExam,
                rejectedFromPhysicalInterview,
                rejectedFromOffer
            ];

            return stages.map((stage, index) => {
                const totalReached = totalCounts[index];
                const currentCount = currentCounts[index];
                const rejectedCount = rejectedCounts[index];
                
                const percentage = totalApplications > 0 ? (totalReached / totalApplications) * 100 : 0;
                
                let conversionFromPrevious = 100;
                if (index > 0) {
                    const previousTotal = totalCounts[index - 1];
                    conversionFromPrevious = previousTotal > 0 ? (totalReached / previousTotal) * 100 : 0;
                }
                
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
        }

        // Step 4: Process each application ONE BY ONE
        applications.forEach(app => {
            const status = app.status.toLowerCase();

            console.log('Decider for function to use:', status);
            
            if (status === 'rejected') {
                processRejectedApplication(app);
            } else {
                processActiveApplication(app, status);
            }
        });

            console.log('Debug counts:', {
                appliedCount,
                cognitiveCount,
                currentCognitive,
                currentApplied,
                applications: applications.map(app => ({
                    status: app.status,
                    previous_status: app.previous_status
                }))
            });

 
        const funnel = buildFunnelArray();
        
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
                    const isLast = index === funnelData.length - 1;
                    
                    // Calculate how many moved past this stage (for non-last stages)
                    const movedPast = !isLast && index < funnelData.length - 1 
                        ? funnelData[index + 1].totalReached 
                        : 0;
                    
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
                                                {/* Show current count for this stage */}
                                                {stage.count > 0 && (
                                                    <span className="funnel-current">
                                                        {stage.count} currently here
                                                    </span>
                                                )}
                                                
                                                {/* Show how many advanced past this stage */}
                                                {!isLast && movedPast > 0 && (
                                                    <span className="funnel-passed">
                                                        {movedPast} advanced
                                                    </span>
                                                )}
                                                
                                                {/* Show rejected count */}
                                                {stage.rejectedCount > 0 && (
                                                    <span className="funnel-rejected">
                                                        {stage.rejectedCount} rejected
                                                    </span>
                                                )}
                                                
                                                {/* Show conversion rate from previous stage */}
                                                {!isFirst && (
                                                    <span className="funnel-conversion">
                                                        {stage.conversionFromPrevious}% conversion rate from previous stage
                                                    </span>
                                                )}
                                                
                                                {/* Show what percentage were rejected at this stage */}
                                                {stage.rejectedCount > 0 && stage.totalReached > 0 && (
                                                    <span className="funnel-rejection">
                                                        {Math.round((stage.rejectedCount / stage.totalReached) * 100)}% rejected here
                                                    </span>
                                                )}
                                                
                                                {/* Show completion rate for final stage */}
                                                {isLast && stage.totalReached > 0 && (
                                                    <span className="funnel-completion">
                                                        Success rate: {stage.percentage}%
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
                                            {stage.totalReached} total reached
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