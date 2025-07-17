import { useState, type FormEvent } from 'react';
import { useNavigate } from 'react-router';

import '../css/signup.css';



const SignUp = () => {
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
    
    const navigate = useNavigate();

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        // Validate passwords match
        if (password !== confirmPassword) {
            setError('Passwords do not match');
            setLoading(false);
            return;
        }

        // Validate password strength (optional)
        if (password.length < 6) {
            setError('Password must be at least 6 characters long');
            setLoading(false);
            return;
        }


        // Validate phone number format (basic validation)
        if (!phone.startsWith('+')) {
            setError('Phone number must include country code (e.g., +610412345678)');
            setLoading(false);
            return;
        }
        try {
            // Make API call to your backend
            const response = await fetch('https://job-application-tracker-production-f608.up.railway.app/api/auth/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: email,
                    password: password,
                    name: name,
                    phone: phone
                })
            });

            const data = await response.json();

            if (response.ok) {
                // Successfully sent OTP
                console.log('OTP sent successfully:', data);
                setUserEmail(data.email);
                setStep(2)
            } else {
                // Handle errors from backend
                setError(data.message || 'Failed to send OTP');
            }
        } catch (error) {
            console.error('Network error:', error);
            setError('Network error. Please check if your backend is running.');
        } finally {
            setLoading(false);
        }
    };




    // OTP verification
    const handleOtpSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        if (!otp || otp.length !== 6) {
            setError('Please enter a valid 6-digit OTP');
            setLoading(false);
            return;
        }

        try {
            const response = await fetch('https://job-application-tracker-production-f608.up.railway.app/api/auth/signup/verify-otp', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: userEmail,
                    otp: otp
                })
            });

            const data = await response.json();

            if (response.ok) {
                // Success - account created
                console.log('Account created successfully:', data);
                navigate('/options');
            } else {
                // Handle errors from backend
                setError(data.message || 'Invalid OTP');
            }
        } catch (error) {
            console.error('Network error:', error);
            setError('Network error. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    // Function to go back to signup form
    const goBackToSignup = () => {
        setStep(1);
        setOtp('');
        setError('');
    };

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
                
                <div className="signup-container-wrapper">
                    <div className='signUpContainer'>
                        {step === 1 ? (
                            <>
                                <h1 className="header">Sign Up</h1>
                                <p className="tagline">Please enter your details to sign up!</p>
                                
                                {error && (
                                    <div className="error-message">
                                        {error}
                                    </div>
                                )}

                                <form onSubmit={handleSubmit}>
                                    <div className="form">
                                        <input
                                            type="text"
                                            name="name"
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}
                                            placeholder="Enter your first name"
                                            required
                                            disabled={loading}
                                        />

                                        <div className="phone-input-wrapper">
                                        <span className="country-code">+61</span>
                                        <input
                                            type="tel"
                                            name="phone"
                                            value={phone.replace('+61', '')}
                                            onChange={(e) => setPhone('+61' + e.target.value)}
                                            placeholder="Enter your phone number"
                                            required
                                            disabled={loading}
                                            className="phone-digits-input"
                                        />
                                        </div>


                                        <input
                                            type="email"
                                            name="email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            placeholder="Enter your email"
                                            required
                                            disabled={loading}
                                        />
                                        <input
                                            type="password"
                                            name="password"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            placeholder="Enter your password"
                                            required
                                            disabled={loading}
                                        />
                                        <input
                                            type="password"
                                            name="confirmPassword"
                                            value={confirmPassword}
                                            onChange={(e) => setConfirmPassword(e.target.value)}
                                            placeholder="Re-enter your password"
                                            required
                                            disabled={loading}
                                        />
                                    </div>
                                
                                    <div className='submitButton'>
                                        <button type="submit" disabled={loading}>
                                            {loading ? 'Sending OTP...' : 'Send OTP'}
                                        </button>
                                    </div>
                                </form>
                            </>
                        ) : (
                            <>
                                <h1 className="header">Verify Phone Number</h1>
                                <p className="tagline">We've sent a 6-digit code to {phone}</p>
                                
                                {error && (
                                    <div className="error-message">
                                        {error}
                                    </div>
                                )}

                                <form onSubmit={handleOtpSubmit}>
                                    <div className="form">
                                        <input
                                            type="text"
                                            name="otp"
                                            value={otp}
                                            onChange={(e) => setOtp(e.target.value)}
                                            placeholder="Enter 6-digit code"
                                            maxLength={6}
                                            required
                                            disabled={loading}
                                            className="otp-input"
                                        />
                                    </div>
                                
                                    <div className='submitButton'>
                                        <button type="submit" disabled={loading}>
                                            {loading ? 'Verifying...' : 'Verify & Create Account'}
                                        </button>
                                    </div>
                                </form>

                                <div className="back-button-container">
                                    <button 
                                        type="button" 
                                        onClick={goBackToSignup}
                                        className="back-button"
                                    >
                                        Back to Sign Up
                                    </button>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </section>
        </>
    );
};

export default SignUp;