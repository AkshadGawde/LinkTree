import axios from "axios";

const API_BASE_URL = "http://localhost:8000/api";
//  Function to get Authorization headers with JWT token
const getAuthHeaders = () => {
  const token = localStorage.getItem("token");
  return token ? { Authorization: `Bearer ${token}` } : {};
};

//  User Authentication
export const registerUser = async (userData) => {
  return await axios.post(`${API_BASE_URL}/auth/register`, userData);
};

export const loginUser = async (credentials) => {
  return await axios.post(`${API_BASE_URL}/auth/login`, credentials);
};

export const forgotPassword = async (email) => {
  return await axios.post(`${API_BASE_URL}/auth/forgot-password`, { email });
};

export const resetPassword = async (data) => {
  return await axios.post(`${API_BASE_URL}/auth/reset-password`, data);
};

//  Fetch User Dashboard Data
export const getDashboard = async () => {
  console.log("Making API Request to:", `${API_BASE_URL}/protected/dashboard`); // ✅ Debugging
  return await axios.get(`${API_BASE_URL}/protected/dashboard`, {
    headers: getAuthHeaders(),
  });
};

//  Referral System API Calls
export const getReferrals = async () => {
  return await axios.get(`${API_BASE_URL}/referrals`, {
    headers: getAuthHeaders(),
  });
};

export const getReferralStats = async () => {
  return await axios.get(`${API_BASE_URL}/referrals/stats`, {
    headers: getAuthHeaders(),
  });
};

//  Logout User (Just clears frontend token)
export const logoutUser = async () => {
  localStorage.removeItem("token");
};
