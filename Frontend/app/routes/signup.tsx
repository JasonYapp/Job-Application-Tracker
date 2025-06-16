import { useState, type FormEvent } from 'react';
import { useNavigate } from 'react-router';

import '../css/signup.css';



const Signup = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        console.log("Email: " + email + "Password: " + password);

        // navigate('/routehere');
    }

    return(
        
        <>
            <section>
                <div style={{ paddingTop: '8rem' }}>
                    <div className='signUpContainer'>
                        <h1 className="header">Sign Up</h1>

                        <p className="tagline">Please enter your details to sign up!</p>

                        
                        <form onSubmit={handleSubmit}>
                            <div className="form">
                                <input
                                    type="email"
                                    name="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="Enter your email"
                                    required
                                />

                                <input
                                    type="password"
                                    name="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="Enter your password"
                                />
                            </div>
                        
                            <div className='submitButton'>
                                <button type="submit"> Sign Up </button>
                            </div>
                        </form>

                        <h2> or </h2>
  
                    </div>
                </div>

            </section>
        </>
       
    );
}


export default Signup;