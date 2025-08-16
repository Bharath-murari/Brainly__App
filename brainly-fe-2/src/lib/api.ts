import axios from 'axios';
import { BACKEND_URL } from '../config';

const api = axios.create({
    baseURL: BACKEND_URL,
});

api.interceptors.request.use((config) => {
    // This now correctly gets the RAW token from localStorage
    const token = localStorage.getItem('token');
    if (token) {
        // And correctly prepends "Bearer "
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});

export default api;