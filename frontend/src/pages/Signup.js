import React, { useState } from 'react';
import { db, auth } from '../firebase';
import { createUserWithEmailAndPassword, deleteUser } from 'firebase/auth';
import { setDoc, doc, getDoc } from "firebase/firestore";
import '../styles.css';
import { useNavigate } from 'react-router-dom';

function Signup() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: '',
        confirmEmail: '',
        username: '',
        password: '',
        confirmPassword: ''
    });
    const [message, setMessage] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const validateForm = () => {
        // Email format validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.email)) {
            setMessage('error: account was not made');
            return false;
        }

        // Confirm email matches
        if (formData.email !== formData.confirmEmail) {
            setMessage('error: account was not made');
            return false;
        }

        // Password length check
        if (formData.password.length < 6) {
            setMessage('error: account was not made');
            return false;
        }

        // Confirm password matches
        if (formData.password !== formData.confirmPassword) {
            setMessage('error: account was not made');
            return false;
        }

        return true;
    };

    const handleSignup = async (e) => {
        e.preventDefault();
        let userCredential = null;

        try {
            if (!validateForm()) {
                return;
            }

            // First check if user document already exists
            const checkUserDocRef = doc(db, 'users', formData.email);
            const userDocSnap = await getDoc(checkUserDocRef);
            
            if (userDocSnap.exists()) {
                setMessage('error: account was not made - email already registered');
                return;
            }

            // Create authentication user
            userCredential = await createUserWithEmailAndPassword(
                auth, 
                formData.email, 
                formData.password
            );

            // Try to save to Firestore
            try {
                await setDoc(doc(db, 'users', userCredential.user.uid), {
                    uid: userCredential.user.uid,
                    email: formData.email,
                    username: formData.username,
                    createdAt: new Date().toISOString()
                });

                setMessage('account was made');
                setTimeout(() => {
                    navigate('/login');
                }, 2000);

            } catch (firestoreError) {
                // If Firestore save fails, delete the auth user
                if (userCredential?.user) {
                    await deleteUser(userCredential.user);
                }
                throw firestoreError; // Re-throw to be caught by outer catch
            }
        } 
        catch (error) {
            console.error('Error in signup process:', error);
            
            // Clean up: Delete auth user if it exists but Firestore failed
            if (userCredential?.user) {
                try {
                    await deleteUser(userCredential.user);
                } catch (deleteError) {
                    console.error('Error deleting orphaned auth user:', deleteError);
                }
            }

            if (error.code === 'auth/email-already-in-use') {
                setMessage('error: account was not made - email already registered');
            } else {
                setMessage('error: account was not made');
            }
        }
    };

    return (
        <div className="page-container">
            <h1>SIGN UP</h1>
            <form onSubmit={handleSignup}>
                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                />
                <input
                    type="email"
                    name="confirmEmail"
                    placeholder="Confirm Email"
                    value={formData.confirmEmail}
                    onChange={handleChange}
                    required
                />
                <input 
                    type="text"
                    name="username"
                    placeholder="Username"
                    value={formData.username}
                    onChange={handleChange}
                    required
                />
                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                />
                <input
                    type="password"
                    name="confirmPassword"
                    placeholder="Confirm Password"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    required
                />
                <button type="submit">Sign Up</button>
                {message && <p>{message}</p>}
            </form>
        </div>
    );
}

export default Signup;