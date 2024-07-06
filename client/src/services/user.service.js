import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL

const getPublicContent = () => {
  return axios.get(API_URL + "courses");
};

const getEnrolledCourses = () => {
  const userId = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')).id : null;
  if (!userId) {
    console.error('User ID not found');
    return Promise.reject('User ID not found');
  }
  // Fetch the list of enrolled course IDs for the user
  return axios.get(`${API_URL}users/${userId}/enrolledCourses`)
    .then(response => {
      // Assuming response.data is an array of course IDs
      console.log('Response:', response.data.enrolledCourses);
      const courseDetails = response.data.enrolledCourses;
      console.log('Enrolled Details:', courseDetails);

      return courseDetails;
      // Fetch details for each course ID
      // const courseDetailsPromises = courseIds.map(courseId =>
      //   axios.get(`${API_URL}courses/${courseId}`)
      // );

      // console.log('Fetching enrolled courses details:', courseDetailsPromises);
      // // Wait for all course details to be fetched
      // return Promise.all(courseDetailsPromises);
    })
    .catch(error => {
      console.error('Error fetching enrolled courses details:', error);
      throw error; // Rethrow error to be handled by the caller
    });
}

const getUserBoard = () => {
  return axios.get(API_URL + "user");
};

const getModeratorBoard = () => {
  return axios.get(API_URL + "mod");
};

const getAdminBoard = () => {
  return axios.get(API_URL + "admin");
};

const UserService = {
  getPublicContent,
  getUserBoard,
  getModeratorBoard,
  getAdminBoard,
  getEnrolledCourses
}

export default UserService;
