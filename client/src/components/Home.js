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
        setCourses([{ name: "Error loading courses", description: _content }]);
      }
    );
  }, []);

  return (
    <div className="container py-5">
      <header className="jumbotron text-center mb-4">
        <h1>Welcome to the Course Dashboard</h1>
      </header>
      <div className="row">
        {courses.map((course, index) => (
          <div key={index} className="col-md-4 mb-4">
            <div className="card h-100">
              <div className="card-body">
                <h5 className="card-title">{course.name}</h5>
                <p className="card-text">{course.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;