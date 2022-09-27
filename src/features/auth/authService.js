import axios from "axios";

const API_URL = process.env.REACT_APP_BASE_URL + "/users";

//Register user
const register = async (userData) => {
  const response = await axios.post(`${API_URL}/register`, userData);
  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }
  return response.data;
};

//Login user
const login = async (userData) => {
  const response = await axios.post(`${API_URL}/authenticate`, userData);
  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }
  return response.data;
};
const logout = () => {
  localStorage.removeItem("user");
};

//get all users
const getAllUsers = async () => {
  const response = await axios.get(`${API_URL}/all`);

  return response.data;
};
//update  user
const updateUser = async (data, token) => {
  const response = await axios.put(`${API_URL}/update`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

const authService = {
  register,
  login,
  logout,
  getAllUsers,
  updateUser,
};

export default authService;
