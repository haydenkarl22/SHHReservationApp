// src/pages/Login.js
import React, { useState } from 'react';
import { auth } from '../firebase'; // Import your Firebase config
import { signInWithEmailAndPassword } from 'firebase/auth';
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
        <>
            <div class="flex-container">
                <h1>LOGIN</h1>
                <form onSubmit={handleLogin}>
                    <div>
                        <label htmlFor="email">Email:</label>
                        <input 
                            type="email" 
                            id="email" 
                            name="email" 
                            value={email} 
                            onChange={(e) => setEmail(e.target.value)} 
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

            <div class="flex-container"> 
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
