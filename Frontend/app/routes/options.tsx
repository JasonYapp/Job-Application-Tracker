import { useState, type FormEvent } from 'react';
import { useNavigate } from 'react-router';

import '../css/signup.css';



const Options = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [phone, setPhone]= useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    
    const [step, setStep] = useState(1); 
    const [userEmail, setUserEmail] = useState(''); 
    const [otp, setOtp] = useState('');
    const [industry, setIndustry] = useState('');
    
    const navigate = useNavigate();

    

    const handleSubmit = async () => {

        


        try {


        } catch (error) {
            setError('An error occurred. Please try again.');
        } finally {
            navigate('/login');
        }
        
    }

    return (
        <>
            <section className='signup-background'>
                
                <div className="bg-element3"></div>
                <div className="bg-element3"></div>
                <div className="bg-element3"></div>
                <div className="bg-element3"></div>
                <div className="bg-element3"></div>
                <div className="bg-element3"></div>
                <div className="pulse-element3"></div>
                <div className="pulse-element3"></div>
                <div className="pulse-element3"></div>
                <div className="pulse-element3"></div>
                <div className="pulse-element3"></div>
                <div className="pulse-element3"></div>
                
                <div className="options-container-wrapper">
                    <div className='optionsContainer'>
                        
                            <>
                                <h1 className="header">Industry Type</h1>
                                <p className="tagline">Please choose the industry you are applying to.</p>
                                 
                                <form onSubmit={handleSubmit}>
                                    <div className="form">
                                        <select
                                            name="industry"
                                            value={industry}
                                            onChange={(e) => setIndustry(e.target.value)}
                                            required
                                            disabled={loading}
                                        >
                                            <option value="">Select industry type</option>
                                            <option value="computer-science">Computer Science</option>
                                            <option value="other">Other</option>
                                        
                                        </select>
                                    </div>


                                    <div className='submitButton'>
                                        <button type="submit" disabled={loading}>
                                            {loading ? 'Redirecting to login...' : 'Save and login'}
                                        </button>
                                    </div>
                                </form>
                            </>
                        
                    </div>
                </div>
            </section>
        </>
    );
};

export default Options;