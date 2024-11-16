// src/pages/Signup.js
import React, { useState } from 'react';
import { db, auth } from '../firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { collection, addDoc } from "firebase/firestore";
import '../styles.css';
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
        } 
        catch (error) {
            console.error('Error adding user to Firebase:', error);
        }
    };

    return (
        <div className="page-container">
                <h1>SIGN UP</h1>
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <input 
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <button onClick={handleSignup}>Sign Up</button>
        </div>
    );
}

export default Signup;