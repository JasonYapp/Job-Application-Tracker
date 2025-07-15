import { Link, useNavigate } from 'react-router';
import '../css/forgotpassword.css'
import { useState, type FormEvent } from 'react';

const ForgotPassword = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [otp, setOtp] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const [step, setStep] = useState(1); 
    const [successMessage, setSuccessMessage] = useState('');



    const handleEmailSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            const response = await fetch('https://job-application-tracker-production-f608.up.railway.app/api/auth/ForgotPassword-Send-OTP', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email })
            });

            const data = await response.json();

            if (response.ok) {
                setSuccessMessage('A 6 digit code has been sent to your number.');
                setStep(2);
            } else {
                setError(data.message || 'Failed to send OTP');
            }
        } catch (error) {
            setError('An error occurred. Please try again.');
        } finally {
            setLoading(false);
        }
    };



    const handleOtpSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            const response = await fetch('https://job-application-tracker-production-f608.up.railway.app/api/auth/ForgotPassword-VerifyOTP', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, otp })
            });

            const data = await response.json();

            if (response.ok) {
                setStep(3);
            } else {
                setError(data.message || 'Invalid OTP');
            }
        } catch (error) {
            setError('An error occurred. Please try again.');
        } finally {
            setLoading(false);
        }
    };



    const handlePasswordSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setError('');

        if (newPassword !== confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        if (newPassword.length < 6) {
            setError('Password must be at least 6 characters long');
            return;
        }

        setLoading(true);

        try {
            const response = await fetch('https://job-application-tracker-production-f608.up.railway.app/api/auth/ForgotPassword-ResetPassword', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, newPassword })
            });

            const data = await response.json();

            if (response.ok) {
                setSuccessMessage('Password reset successfully! Redirecting to login...');
                setTimeout(() => navigate('/login'), 2000);
            } else {
                setError(data.message || 'Failed to reset password');
            }
        } catch (error) {
            setError('An error occurred. Please try again.');
        } finally {
            setLoading(false);
        }
    };



    const renderStep = () => {
        switch (step) {
            case 1:
                return (
                    <form onSubmit={handleEmailSubmit}>
                        <div className="forgotpwform">
                            <input
                                type="email"
                                name="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Enter your email"
                                disabled={loading}
                                required
                            />
                        </div>
                        <div className='submitButton'>
                            <button type="submit" disabled={loading}>
                                {loading ? 'Sending...' : 'Send OTP'}
                            </button>
                        </div>
                    </form>
                );

            case 2:
                return (
                    <form onSubmit={handleOtpSubmit}>
                        <div className="forgotpwform">
                            <input
                                type="text"
                                name="otp"
                                value={otp}
                                onChange={(e) => setOtp(e.target.value)}
                                placeholder="Enter OTP"
                                disabled={loading}
                                required
                            />
                        </div>
                        <div className='submitButton'>
                            <button type="submit" disabled={loading}>
                                {loading ? 'Verifying...' : 'Verify OTP'}
                            </button>
                        </div>
                    </form>
                );

            case 3:
                return (
                    <form onSubmit={handlePasswordSubmit}>
                        <div className="forgotpwform">
                            <input
                                type="password"
                                name="newPassword"
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                                placeholder="Enter new password"
                                disabled={loading}
                                required
                            />
                            <input
                                type="password"
                                name="confirmPassword"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                placeholder="Confirm new password"
                                disabled={loading}
                                required
                            />
                        </div>
                        <div className='submitButton'>
                            <button type="submit" disabled={loading}>
                                {loading ? 'Resetting...' : 'Reset Password'}
                            </button>
                        </div>
                    </form>
                );

            default:
                return null;
        }
    };

    const getHeaderText = () => {
        switch (step) {
            case 1:
                return 'Reset Your Password';
            case 2:
                return 'Enter Verification Code';
            case 3:
                return 'Set New Password';
            default:
                return 'Reset Your Password';
        }
    };

    const getTaglineText = () => {
        switch (step) {
            case 1:
                return 'Enter your email to reset your password';
            case 2:
                return 'Enter the 6 digit code sent to your phone';
            case 3:
                return 'Create a new password for your account';
            default:
                return 'Your password will be reset if the account exists';
        }
    };

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
                
                <div className="login-background-padding">
                    <div className='forgotpwContainer'>
                        <h1 className="header">{getHeaderText()}</h1>
                        <p className="tagline">{getTaglineText()}</p>
                        
                        {error && <div className="error-message">{error}</div>}
                        {successMessage && <div className="success-message">{successMessage}</div>}
                        
                        {renderStep()}
                        
                        <div className="back-to-login-container">
                            <Link to="/login" className="back-to-login">
                                ← Back to Login
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}

export default ForgotPassword;