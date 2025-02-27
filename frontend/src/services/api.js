import axios from "axios";

const API_BASE_URL = "http://localhost:8000/api";

// User Authentication
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

// Protected Routes
export const getDashboard = async (token) => {
  return await axios.get(`${API_BASE_URL}/protected/dashboard`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

// Referral System
export const getReferrals = async (token) => {
  return await axios.get(`${API_BASE_URL}/referrals`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const getReferralStats = async (token) => {
  return await axios.get(`${API_BASE_URL}/referrals/stats`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};
