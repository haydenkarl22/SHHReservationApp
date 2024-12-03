// src/pages/Login.js
import React, { useState } from 'react';
import { auth } from '../firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import '../styles.css';
import { useNavigate } from 'react-router-dom';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            setMessage('you have been logged in');
            setTimeout(() => {
                navigate('/profile');
            }, 2000);
        } catch (error) {
            alert("User does not exist");
        }
    };

    const handleSignupClick = () => {
        navigate('/signup');
    };

    return (
        <div className="page-wrapper">

            <div className="page-container">
                <div className="profile-container">
                    <h1 className="profile-name">Login</h1>
                    <form onSubmit={handleLogin} className="profile-section">
                        <div className="profile-item">
                            <label htmlFor="email">Email:</label>
                            <input 
                                type="email" 
                                id="email" 
                                name="email" 
                                placeholder='Enter your email'
                                value={email} 
                                onChange={(e) => setEmail(e.target.value)} 
                                required 
                            />
                        </div>
                        <div className="profile-item">
                            <label htmlFor="password">Password:</label>
                            <input 
                                type="password" 
                                id="password" 
                                name="password" 
                                placeholder='Enter your password'
                                value={password} 
                                onChange={(e) => setPassword(e.target.value)} 
                                required 
                            />
                        </div>
                        <button type="submit" className="profile-item">Login</button>
                    </form>

                    <div className="profile-section">
                        <p>Don't have an account?</p>
                        <button onClick={handleSignupClick} className="profile-item">
                            Sign Up
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;