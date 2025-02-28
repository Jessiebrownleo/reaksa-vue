import axios from 'axios';
const api = axios.create({
    baseURL: 'http://localhost:8888/api/v1',
    headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
});
export const getAllAccounts = async () => {
    const response = await api.get('/accounts');
    return response.data.payload;
};
export const createAccount = async (account) => {
    const response = await api.post('/accounts', account);
    return response.data.payload;
};
export const updateAccount = async (id, account) => {
    const response = await api.patch(`/accounts/${id}`, account);
    return response.data.payload;
};
export const deleteAccount = async (id) => {
    await api.delete(`/accounts/${id}`);
};
export const getAccountById = async (id) => {
    const response = await api.get(`/accounts/${id}`);
    return response.data.payload;
};
export const getAccountsByUserId = async (userId) => {
    const response = await api.get(`/accounts/user/${userId}`);
    return response.data.payload;
};
export const getAccountByAccountNumber = async (accountNumber) => {
    const response = await api.get(`/accounts/account-number/${accountNumber}`);
    return response.data.payload;
};
