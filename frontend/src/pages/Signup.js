import React, { useState } from 'react';
import { db, auth } from '../firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { collection, addDoc } from "firebase/firestore";
import '../styles.css';
import Header from '../components/Header';
import { useNavigate } from 'react-router-dom';

function Signup() {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');

    const handleSignup = async () => {
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;
            console.log("User created in Firebase Auth:", user);

            await addDoc(collection(db, 'users'), {
                uid: user.uid,
                email, 
                username
            });
            console.log('User added to Firestore with ID:', user.uid);

            navigate('/profile');
        } catch (error) {
            console.error('Error adding user to Firebase:', error);
        }
    };

    return (
        <div className="page-wrapper">
            <Header />
            <div className="page-container">
                <div className="profile-container">
                    <h1 className="profile-name">Sign Up</h1>
                    <form onSubmit={(e) => { e.preventDefault(); handleSignup(); }} className="profile-section">
                        <div className="profile-item">
                            <label htmlFor="email">Email:</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                placeholder="Enter your email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>
                        <div className="profile-item">
                            <label htmlFor="username">Username:</label>
                            <input 
                                type="text"
                                id="username"
                                name="username"
                                placeholder="Enter your username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                required
                            />
                        </div>
                        <div className="profile-item">
                            <label htmlFor="password">Password:</label>
                            <input
                                type="password"
                                id="password"
                                name="password"
                                placeholder="Enter your password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>
                        <button type="submit" className="profile-item">Sign Up</button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Signup;