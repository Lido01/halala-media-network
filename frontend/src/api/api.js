// Simple API service for backend requests
import axios from 'axios';

const BASE_URL = 'https://new-media-backend-c5uc.onrender.com';

const apiService = axios.create({
  baseURL: BASE_URL,
  withCredentials: true, // MANDATORY: Fixes the browser Network Error when backend uses CORS credentials
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add a request interceptor to include JWT if available
apiService.interceptors.request.use(
  (config) => {
    // CRITICAL DJANGO FIX: Automatically appends a trailing slash if missing on the endpoint url
    if (config.url && !config.url.endsWith('/')) {
      config.url += '/';
    }

    const token = localStorage.getItem('access_token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Add a response interceptor to handle token expiry (401)
apiService.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      // Token expired or invalid, clear storage and redirect to login
      localStorage.removeItem('access_token');
      localStorage.removeItem('refresh_token');
      localStorage.removeItem('user_role');
      localStorage.removeItem('username');
      if (window.location.pathname !== '/login') {
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
);

export default apiService;
