# LearnHub

## Project Description

LearnHub is a MERN stack application designed to provide a platform where users can register, log in, view a list of courses, and enroll in courses. The application utilizes React.js for the frontend, Node.js for the backend, and MongoDB (a non-SQL database) for data storage.

## Table of Contents

- [Project Description](#project-description)
- [Table of Contents](#table-of-contents)
- [Installation](#installation)
- [Usage](#usage)
- [Features](#features)
- [Dependencies](#dependencies)
- [Configuration](#configuration)
- [Contributors](#contributors)
- [Deployed Application](#deployed-application)

## Installation

To set up the project locally, follow these steps:

1. **Clone the repository:**
    ```bash
    git clone https://github.com/soumik-saha/LearnHub
    ```

2. **Install dependencies for both client and server:**
    ```bash
    cd LearnHub-main/client
    npm install
    cd ../server
    npm install
    ```

3. **Add the localhost ports to the `.env` file for both client and server.**  
   Example of `.env` file for the client:
    ```
    REACT_APP_API_URL=http://localhost:5000
    ```
   Example of `.env` file for the server:
    ```
    PORT=5000
    MONGO_URI=<your-mongodb-connection-string>
    ```

## Usage

To run the project locally:

1. **Start the frontend:**
    ```bash
    cd LearnHub-main/client
    npm start
    ```

2. **Start the backend:**
    ```bash
    cd LearnHub-main/server
    npm run dev
    ```

3. **Open the application:**
    - Open your web browser and navigate to `http://localhost:3000`.

4. **Workflow:**
    - Open the home page.
    - Register a new account.
    - Log in with your account.
    - Go to the dashboard (home).
    - Enroll in courses.
    - Navigate to "Enrolled Courses" to see your enrolled courses.

## Features

- User registration and login
- Course listing
- Course enrollment
- Dashboard to view enrolled courses

## Dependencies

Make sure you have the following installed on your local machine:

- Node.js
- npm
- MongoDB

Run `npm install` in both the client and server directories to install all required dependencies.

## Configuration

Ensure you have a `.env` file in both the client and server directories with the appropriate configurations.

- **Client `.env` file:**
    ```
    REACT_APP_API_URL=http://localhost:5000/api/
    ```

- **Server `.env` file:**
    ```
    PORT=5000
    CONNECTION_URL=<your-mongodb-connection-string>
    JWT_SECRET=<your-secret-key>
    ```

## Contributors

- [Soumik Saha](https://www.linkedin.com/in/soumikisonline)

## Deployed Application

Access the deployed application here: [LearnHub](https://learnhub-roan.vercel.app/)

## Assumptions and Design Decisions

- **MERN Stack:** The project is built using the MERN stack (MongoDB, Express.js, React.js, Node.js) to leverage the full JavaScript ecosystem.
- **User Flow:** The user flow includes registration, login, viewing courses, and enrolling in courses, which are typical functionalities for an e-learning platform.
- **Localhost Ports:** The application is configured to run on localhost, with the frontend on port 3000 and the backend on port 5000 by default.
