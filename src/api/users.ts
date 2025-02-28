import axios, { AxiosError } from 'axios';
import type { UserRequest, UserResponse, UserUpdateRequest } from '../interfaces/user';

const api = axios.create({
    baseURL: 'http://localhost:8888/api/v1',
    headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
});

export const updateUser = async (id: string, user: Partial<UserUpdateRequest>): Promise<UserResponse> => {
    console.log('Sending PATCH request to:', `/users/${id}`);
    console.log('Payload:', JSON.stringify(user, null, 2));
    try {
        const response = await api.patch(`/users/${id}`, user);
        console.log('Response:', response.data);
        return response.data.payload;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.error('Update API Error:', error.response?.data || error.message);
        } else {
            console.error('An unexpected error occurred:', error);
        }
        throw error; // Re-throw to handle in the caller
    }
};

// Other functions (getAllUsers, deleteUser, etc.) remain unchanged
export const getAllUsers = async (): Promise<UserResponse[]> => {
    const response = await api.get('/users');
    return response.data.payload;
};

export const deleteUser = async (id: string): Promise<void> => {
    await api.delete(`/users/${id}`);
};

export const enableUser = async (id: string): Promise<UserResponse> => {
    const response = await api.patch(`/users/${id}/enable`);
    return response.data.payload;
};

export const disableUser = async (id: string): Promise<UserResponse> => {
    const response = await api.patch(`/users/${id}/disable`);
    return response.data.payload;
};

export const registerUser = async (user: UserRequest): Promise<UserResponse> => {
    const response = await api.post('/auth/register', user);
    return response.data.payload;
};