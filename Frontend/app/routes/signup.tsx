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
                // Success - redirect to login or dashboard
                console.log('User created successfully:', data);
                navigate('/login'); // or wherever you want to redirect
            } else {
                // Handle errors from backend
                setError(data.message || 'Failed to create account');
            }
        } catch (error) {
            console.error('Network error:', error);
            setError('Network error. Please check if your backend is running.');
        } finally {
            setLoading(false);
        }
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
                
                <div style={{ paddingTop: '4rem' }}>
                    <div className='signUpContainer'>
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
                                    type="name"
                                    name="name"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    placeholder="Enter your first name"
                                    required
                                    disabled={loading}
                                />
                                <input
                                    type="phone"
                                    name="phone"
                                    value={phone}
                                    onChange={(e) => setPhone(e.target.value)}
                                    placeholder="Enter your phone number"
                                    required
                                    disabled={loading}
                                />
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
                                    {loading ? 'Creating Account...' : 'Sign Up'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </section>
        </>
    );
};

export default SignUp;