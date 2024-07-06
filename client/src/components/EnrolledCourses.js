import React, { useState, useEffect } from "react";
import UserService from "../services/user.service";

const EnrolledCourses = () => {
    const [courses, setCourses] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(6);

    useEffect(() => {
        UserService.getEnrolledCourses().then(
            (response) => {
                console.log("Enrolled courses: from client", response);
                setCourses(response);
            },
            (error) => {
                const _content =
                    (error.response && error.response.data) ||
                    error.message ||
                    error.toString();
                setCourses([{ title: "Error loading courses", description: _content }]);
            }
        );
    }, []);

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentCourses = courses.slice(indexOfFirstItem, indexOfLastItem);

    const totalPages = Math.ceil(courses.length / itemsPerPage);

    const renderPagination = () => {
        const pageNumbers = [];
        for (let i = 1; i <= totalPages; i++) {
            // Always add the first page, the last page, and the current, previous, and next pages
            if (i === 1 || i === totalPages || i === currentPage || i === currentPage - 1 || i === currentPage + 1) {
                pageNumbers.push(i);
            }
        }

        return (
            <nav>
                <ul className="pagination justify-content-center">
                    {pageNumbers.map((page, index) => {
                        // If the current page is not directly after the previous page, insert an ellipsis
                        if (index > 0 && pageNumbers[index] - pageNumbers[index - 1] > 1) {
                            return (
                                <React.Fragment key={page}>
                                    <li className="page-item disabled">
                                        <span className="page-link">...</span>
                                    </li>
                                    <li className={`page-item ${currentPage === page ? 'active' : ''}`}>
                                        <button className="page-link" onClick={() => setCurrentPage(page)}>
                                            {page}
                                        </button>
                                    </li>
                                </React.Fragment>
                            );
                        } else {
                            return (
                                <li key={page} className={`page-item ${currentPage === page ? 'active' : ''}`}>
                                    <button className="page-link" onClick={() => setCurrentPage(page)}>
                                        {page}
                                    </button>
                                </li>
                            );
                        }
                    })}
                </ul>
            </nav>
        );
    };

    return (
        <div className="container-fluid py-5">
            <header className="jumbotron bg-primary text-white text-center mb-5">
                <h1 className="display-4">Enrolled Courses</h1>
            </header>
            <div className="row">
                {currentCourses.map((course, index) => (
                    <div key={index} className="col-12 col-sm-6 col-md-4 col-lg-4 mb-4">
                        <div className="card text-center shadow" style={{ maxHeight: '450px', overflow: 'hidden' }}>
                            <img src={course.thumbnailUrl || "https://img.freepik.com/premium-vector/elearning-banner-youtube-thumbnail-template-design-premium-vector_511749-164.jpg"} className="card-img-top" alt={course.title} style={{ height: '200px', objectFit: 'cover' }} />
                            <div className="card-body">
                                <h5 className="card-title">{course.title}</h5>
                                <p className="card-text"><small className="text-muted">Instructor: {course.instructor}</small></p>
                                <p className="card-text"><small className="text-muted">Estimated Time: {course.estimatedTime}</small></p>
                            </div>
                            <div className="card-footer bg-light">
                                {/* < EnrollButton /> */}
                                {/* <button className="btn btn-primary btn-block" onClick={handleEnroll}>Enroll</button> */}
                                {/* < CourseEnrollButton userId={JSON.parse(localStorage.getItem('user')).id} courseId={course._id} /> */}
                                {/* {course.students.includes(JSON.parse(localStorage.getItem('user')).id) ? <button className="btn btn-success btn-block" disabled>Enrolled</button> : < CourseEnrollButton userId={JSON.parse(localStorage.getItem('user')).id} courseId={course._id} />} */}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            {renderPagination()}
        </div>
    );
};

export default EnrolledCourses;