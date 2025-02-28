import axios from 'axios';
const api = axios.create({
    baseURL: 'http://localhost:8888/api/v1',
    headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
});
export const getAllUsers = async () => {
    const response = await api.get('/users');
    return response.data.payload;
};
export const getUserById = async (id) => {
    const response = await api.get(`/users/${id}`);
    return response.data.payload;
};
export const updateUser = async (id, user) => {
    const response = await api.patch(`/users/${id}`, user);
    return response.data.payload;
};
export const deleteUser = async (id) => {
    await api.delete(`/users/${id}`);
};
export const enableUser = async (id) => {
    const response = await api.patch(`/users/${id}/enable`);
    return response.data.payload;
};
export const disableUser = async (id) => {
    const response = await api.patch(`/users/${id}/disable`);
    return response.data.payload;
};
export const getCurrentUser = async () => {
    const response = await api.get('/users/me');
    return response.data.payload;
};
export const registerUser = async (user) => {
    const response = await api.post('/auth/register', user);
    return response.data.payload;
};
