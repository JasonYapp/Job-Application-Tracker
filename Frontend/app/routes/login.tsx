import { useState, type FormEvent } from 'react';
import { useNavigate } from 'react-router';

import '../css/login.css';


const Login = () => {

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
            const response = await fetch('http://localhost:5000/api/auth/login', {
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

    return(
        
        <>
            <section>
                <div style={{ paddingTop: '6rem' }}>
                    <div className='loginContainer'>
                        <h1 className="header">Login</h1>

                        <p className="tagline">Please enter your details to login to your account</p>

                        
                        <form>
                            <div className="form">
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
                                    placeholder="Enter your password"
                                    disabled={loading}
                                />
                            </div>

                            <div className='submitButton'>
                                <button type="button" onClick={handleSubmit} disabled={loading}> Log in </button>
                            </div>

                        </form>

                        <h2> or </h2>
  
                    </div>
                </div>

            </section>
        </>
       
    );
}


export default Login;