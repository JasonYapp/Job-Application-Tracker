import { Link, useNavigate } from 'react-router';
import '../css/forgotpassword.css'
import { useState, type FormEvent } from 'react';


const ForgotPassword = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try{
            const response = await fetch('https://job-application-tracker-production-f608.up.railway.app/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: email,
                    password: password,
                })
            });

        const data = await response.json();

        console.log('Login response data:', data);
        console.log('Token from response:', data.token);

            if (response.ok) {
                // Store the token and user data
                localStorage.setItem('token', data.token);
                localStorage.setItem('user', JSON.stringify(data.user));

                navigate('/dashboard');

            } else {
                setError(data.message || 'Login failed');
            }
        } catch (error) {
            setError('An error occurred. Please try again.');
        } finally {
            setLoading(false);
        }
    }



    return (
        <>
            <section className='login-background'>
                
                <div className="bg-element2"></div>
                <div className="bg-element2"></div>
                <div className="bg-element2"></div>
                <div className="bg-element2"></div>
                <div className="bg-element2"></div>
                <div className="bg-element2"></div>
                <div className="pulse-element2"></div>
                <div className="pulse-element2"></div>
                <div className="pulse-element2"></div>
                <div className="pulse-element2"></div>
                <div className="pulse-element2"></div>
                <div className="pulse-element2"></div>
                
                <div style={{ paddingTop: '6rem' }}>
                    <div className='forgotpwContainer'>
                        <h1 className="header">Reset Your Password</h1>
                        <p className="tagline">Your password will be reset if the account exists</p>
                        
                        <form>
                            <div className="forgotpwform">
                                <input
                                    type="email"
                                    name="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="Enter your email"
                                    disabled={loading}
                                />
                                <input
                                    type="password"
                                    name="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="Enter your new password"
                                    disabled={loading}
                                />
                            </div>

                            <div className='submitButton'>
                                <button type="button" onClick={handleSubmit} disabled={loading}>
                                    Log in
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </section>
        </>
    );
}


export default ForgotPassword;