import React, { useState, useEffect } from "react";
import UserService from "../services/user.service";

const Home = () => {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    UserService.getPublicContent().then(
      (response) => {
        setCourses(response.data); // Assuming response.data is an array of courses
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

  return (
    <div className="container-fluid py-5">
      <header className="jumbotron bg-primary text-white text-center mb-5">
        <h1 className="display-4">Welcome to the Course Dashboard</h1>
      </header>
      <div className="row">
        {courses.map((course, index) => (
          <div key={index} className="col-12 col-sm-6 col-md-4 col-lg-4 mb-4"> {/* Adjusted col-lg-4 */}
            <div className="card text-center shadow" style={{ maxHeight: '450px', overflow: 'hidden' }}>
              <img src={course.thumbnailUrl || "https://img.freepik.com/premium-vector/elearning-banner-youtube-thumbnail-template-design-premium-vector_511749-164.jpg"} className="card-img-top" alt={course.title} style={{ height: '200px', objectFit: 'cover' }} />
              <div className="card-body">
                <h5 className="card-title">{course.title}</h5>
                {/* <p className="card-text">{course.description}</p> */}
                <p className="card-text"><small className="text-muted">Instructor: {course.instructor}</small></p>
                <p className="card-text"><small className="text-muted">Estimated Time: {course.estimatedTime}</small></p>
                {/* <p className="card-text"><small className="text-muted">Prerequisites: {course.prerequisites.join(", ")}</small></p> */}
              </div>
              <div className="card-footer bg-light">
                <button className="btn btn-primary btn-block">Enroll</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;