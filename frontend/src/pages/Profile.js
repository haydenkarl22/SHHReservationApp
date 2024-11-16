import React, { useState, useEffect } from 'react';
import '../styles.css';
import { db, auth } from '../firebase';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
    const [username, setUsername] = useState('');
    const user = auth.currentUser;
    const navigate = useNavigate();

    useEffect(() => {
        if (user) {
            const fetchUserData = async () => {
                try {
                    const usersCollectionRef = collection(db, 'users');
                    const q = query(usersCollectionRef, where('uid', '==', user.uid));

                    const querySnapshot = await getDocs(q);

                    if (!querySnapshot.empty) {
                        querySnapshot.forEach((doc) => {
                            const userData = doc.data();
                            setUsername(userData.username);
                        });
                    } else {
                        console.error('User not found in Firestore.');
                    }
                } catch (error) {
                    console.error('Error fetching user data:', error);
                }
            };

            fetchUserData();
        } else {
            console.error('No authenticated user found.');
        }
    }, [user]);

    const handleLogout = async () => {
        try {
            await auth.signOut();
            navigate('/login');
        } catch (error) {
            console.error('Error during logout:', error);
        }
    };

    if (!user) {
        return <p>No user logged in</p>;
    }

    return (
        <>
            <div>
                <h2>Welcome, {username} <button onClick={handleLogout}>Logout</button> </h2>
                <p>Email: {user.email}</p>
                <p>Username: {username || 'N/A'}</p>
            </div>
            <div>
                <h2>Reservations</h2>
                <p>*SET FUNCTIONALITY WHEN RESERVATIONS EXIST*</p>
            </div>
        </>
    );
};

export default Profile;