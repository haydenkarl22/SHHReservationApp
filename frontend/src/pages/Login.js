// src/pages/Login.js
import React, { useState } from 'react';
import { auth } from '../firebase'; // Import your Firebase config
import { signInWithEmailAndPassword } from 'firebase/auth';
import '../styles.css';
import { useNavigate } from 'react-router-dom';


function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate(); // Initialize useNavigate

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const userCredential = await signInWithEmailAndPassword(auth, username, password);
            console.log("Login successful:", userCredential.user);
            navigate('/home'); 
        } catch (error) {
            console.error("Login error:", error);
            alert("Login failed: " + error.message);
        }
    };

    const handleSignupClick = () => {
        navigate('/signup'); // Navigate to signup page
    };

    return (
        <>
            <div className="page-container" style={{ width: '100%', height: '25%' }}>
                <h1>LOGIN</h1>
                <form onSubmit={handleLogin}>
                    <div>
                        <label htmlFor="username">Username:</label>
                        <input 
                            type="text" 
                            id="username" 
                            name="username" 
                            value={username} 
                            onChange={(e) => setUsername(e.target.value)} 
                            required 
                        />
                    </div>
                    <div>
                        <label htmlFor="password">Password:</label>
                        <input 
                            type="password" 
                            id="password" 
                            name="password" 
                            value={password} 
                            onChange={(e) => setPassword(e.target.value)} 
                            required 
                        />
                    </div>
                    <button type="submit">Login</button>
                </form>
            </div>

            <div className="page-container" style={{ width: '100%', height: '25%' }}> 
                <div>
                    <label htmlFor="signupq">Don't have an account?</label>
                    <button onClick={handleSignupClick} style={{ marginLeft: '10px' }}>
                        SignUp
                    </button>
                </div>
            </div>
        </>
    );
}

export default Login;
