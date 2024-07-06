import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL;

const register = (username, email, password) => {
  return axios.post(API_URL + "auth/register", {
    username,
    email,
    password,
  });
};

const login = (username, password) => {
  return axios
    .post(API_URL + "auth/login", {
      username,
      password,
    })
    .then((response) => {
      if (response.data.username) {
        localStorage.setItem("user", JSON.stringify(response.data));
      }

      return response.data;
    });
};

const logout = () => {
  localStorage.removeItem("user");
  return axios.post(API_URL + "auth/logout").then((response) => {
    return response.data;
  });
};

const getCurrentUser = () => {
  console.log("Retrieving user from localStorage");
  const userData = localStorage.getItem("user");
  console.log("Retrieved userData:", userData);
  return JSON.parse(userData);
};

const AuthService = {
  register,
  login,
  logout,
  getCurrentUser,
}

export default AuthService;
