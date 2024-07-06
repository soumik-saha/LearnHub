import React from 'react';
import { useNavigate } from 'react-router-dom';
import '@fortawesome/fontawesome-free/css/all.min.css';

const Enrolled = () => {
    const navigate = useNavigate();

    return (
        <div className="container text-center mt-5">
            <div className="mb-4">
                <div className="rounded-circle bg-success d-inline-flex justify-content-center align-items-center" style={{ width: '100px', height: '100px' }}>
                    <i className="fas fa-check text-white" style={{ fontSize: '50px' }}></i>
                </div>
                <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.8.1/css/all.css"></link>
            </div>
            <h2 className="mb-4">Successfully Enrolled in the Course!</h2>
            <button className="btn btn-primary" onClick={() => navigate('/home')}>Enroll More Courses</button>
        </div>
    );
};

export default Enrolled;