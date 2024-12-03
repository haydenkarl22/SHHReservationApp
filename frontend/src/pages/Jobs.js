import React, { useState } from 'react';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../firebase';
import '../styles.css';

const Jobs = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        jobInterested: '',
        message: '',
        timestamp: null
    });

    const [submitStatus, setSubmitStatus] = useState({
        isSubmitting: false,
        success: false,
        error: null
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitStatus({ isSubmitting: true, success: false, error: null });

        try {
            const applicationData = {
                ...formData,
                timestamp: new Date()
            };

            await addDoc(collection(db, 'applications'), applicationData);

            setSubmitStatus({ isSubmitting: false, success: true, error: null });
            setFormData({
                name: '',
                email: '',
                phone: '',
                jobInterested: '',
                message: '',
                timestamp: null
            });
        } catch (error) {
            console.error('Error submitting application:', error);
            setSubmitStatus({
                isSubmitting: false,
                success: false,
                error: 'Failed to submit application. Please try again.'
            });
        }
    };

    return (
        <div className="page-wrapper">
            <div className="page-container" style={{ display: 'block', backgroundColor: '#f0f0f0' }}>
                <div className="jobs-page">
                    <div className="jobs-container">
                        <div className="jobs-content">
                            <div className="info-section">
                                <h1>Join our Team</h1>
                                <div className="info-text">
                                    <p>
                                        We're looking for passionate individuals to join our growing family.
                                    </p>
                                    <p>
                                        If you're dedicated, creative, and eager to grow, we'd love to hear from you.
                                    </p>
                                    <p>
                                        Take a moment to fill out the application form and tell us about yourself.
                                    </p>
                                </div>
                            </div>

                            <div className="form-section">
                                <form onSubmit={handleSubmit}>
                                    <div className="form-group">
                                        <label>Your Name *</label>
                                        <input
                                            type="text"
                                            name="name"
                                            required
                                            value={formData.name}
                                            onChange={handleChange}
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label>Your Phone Number *</label>
                                        <input
                                            type="tel"
                                            name="phone"
                                            required
                                            value={formData.phone}
                                            onChange={handleChange}
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label>Your Email *</label>
                                        <input
                                            type="email"
                                            name="email"
                                            required
                                            value={formData.email}
                                            onChange={handleChange}
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label>I'm Interested In</label>
                                        <input
                                            type="text"
                                            name="jobInterested"
                                            value={formData.jobInterested}
                                            onChange={handleChange}
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label>Your Message</label>
                                        <textarea
                                            name="message"
                                            rows={4}
                                            value={formData.message}
                                            onChange={handleChange}
                                        />
                                    </div>

                                    {submitStatus.error && (
                                        <div className="error-message">
                                            Error: {submitStatus.error}
                                        </div>
                                    )}

                                    {submitStatus.success && (
                                        <div className="success-message">
                                            Application submitted successfully!
                                        </div>
                                    )}

                                    <button
                                        type="submit"
                                        disabled={submitStatus.isSubmitting}
                                        className="submit-button"
                                    >
                                        {submitStatus.isSubmitting ? 'Sending...' : 'SEND'}
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Jobs;