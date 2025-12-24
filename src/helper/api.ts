import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/api/v1', // Hardcoded for now
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

api.interceptors.request.use((config) => {
  if (typeof window !== 'undefined') {
    const userStr = localStorage.getItem('user');
    if (userStr) {
      try {
        const data = JSON.parse(userStr);
        // The token is stored inside the user object in localStorage
        if (data.token) {
          config.headers.Authorization = `Bearer ${data.token}`;
        }
      } catch (error) {
        console.error('Error parsing user data:', error);
      }
    }
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (!error.response) {
      console.error('Network/Server error:', error.message);
    }
    return Promise.reject(error);
  }
);

export default api;
