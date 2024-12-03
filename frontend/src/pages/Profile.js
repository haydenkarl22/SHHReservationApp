import React, { useState, useEffect } from 'react';
import { db, auth } from '../firebase';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import '../styles.css';

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

    const deleteAccount = async () => {
        try {
            alert('Are you sure you want to delete your account?');
            await user.delete();
            navigate('/login');
        } catch (error) {
            console.error('Error deleting user:', error);
        }
    }

    return (
        <div className="page-wrapper">
            <div className="page-container">
                <div className="profile-container">
                    <h1 className="profile-name">Profile</h1>
                    <div className="profile-section">
                        <p className="profile-item"><strong>Username:</strong> {username}</p>
                        <p className="profile-item"><strong>Email:</strong> {user.email}</p>
                        <button onClick={handleLogout} className='profile-item'>
                            Logout
                        </button>
                        <br />

                    </div>
                    <h1 className="profile-name">Reservations</h1>
                    <div className="profile-section">
                        <p className="profile-item">No reservations found.</p>
                    </div> 
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <button onClick={deleteAccount}>
                            Delete Account
                    </button>
                </div>  
            </div>
        </div>
    );
};

export default Profile;