import React, { useState } from 'react';
import { auth } from '../firebase'; // Import your Firebase config
import { signInWithEmailAndPassword } from 'firebase/auth';
import Header from '../components/Header';
import '../styles.css';
import { useNavigate } from 'react-router-dom';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate(); // Initialize useNavigate

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            console.log("Login successful:", userCredential.user);
            navigate('/profile'); 
        } catch (error) {
            console.error("Login error:", error);
            alert("Login failed: " + error.message);
        }
    };

    const handleSignupClick = () => {
        navigate('/signup'); // Navigate to signup page
    };

    return (
        <div className="page-wrapper">
            <Header />

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