import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const API_URL = process.env.REACT_APP_API_URL;

const CourseEnrollButton = ({ userId, courseId }) => {
    const [isEnrolled, setIsEnrolled] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();
    const isLoggedIn = localStorage.getItem('user');

    useEffect(() => {
        // Replace with the actual API endpoint to check enrollment status
        axios.get(`${API_URL}users/${userId}/enrolledCourses`)
            .then(response => {
                setIsEnrolled(response.body.enrolledCourses);
            })
            .catch(error => console.error("Error checking enrollment status:", error))
            .finally(() => setIsLoading(false));
    }, [userId]);

    const handleEnroll = () => {
        if (!isLoggedIn) {
            alert('Please log in to enroll in courses.');
            return;
        }

        axios.post(`${API_URL}users/${userId}/${courseId}/enroll`)
            .then(() => {
                setIsEnrolled(true);
                navigate('/enrolled');
            })
            .catch(error => console.error("Error enrolling in course:", error));
    };

    if (isLoading) {
        return <button disabled>Loading...</button>;
    }

    return (
        <button className="btn btn-success btn-block" onClick={handleEnroll} disabled={isEnrolled}>
            {isEnrolled ? 'Already Enrolled' : 'Enroll'}
        </button>
    );
};

export default CourseEnrollButton;