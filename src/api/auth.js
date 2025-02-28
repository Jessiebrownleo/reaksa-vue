import axios from 'axios';
const API_URL = 'http://localhost:8888/api/v1';
const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: true,
});
api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, (error) => Promise.reject(error));
export const getCurrentUser = async () => {
    const response = await api.get('/auth/me');
    return response.data.payload;
};
export const getAllUsers = async () => {
    const response = await api.get('/users');
    return response.data.payload;
};
export const login = async (credentials) => {
    const response = await api.post('/auth/login', credentials);
    return response.data.payload;
};
export const register = async (user) => {
    const response = await api.post('http://localhost:8888/api/v1/auth/register', user);
    console.log("Registered Request : ", user);
    return response.data.payload;
};
export const refreshToken = async (refresh) => {
    const response = await api.post('/auth/refresh', refresh);
    return response.data.payload;
};
