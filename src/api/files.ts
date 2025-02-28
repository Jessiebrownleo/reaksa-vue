import axios from 'axios';
import type { FileResponse } from '../interfaces/file';

const api = axios.create({
    baseURL: 'http://localhost:8888/api/v1',
    headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
});

export const uploadSingleFile = async (file: File): Promise<FileResponse> => {
    const formData = new FormData();
    formData.append('file', file);
    const response = await api.post('/files', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
    });
    return response.data.payload;
};

export const uploadMultipleFiles = async (files: File[]): Promise<FileResponse[]> => {
    const formData = new FormData();
    files.forEach((file) => formData.append('files', file));
    const response = await api.post('/files/multiple', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
    });
    return response.data.payload;
};

export const downloadFile = async (fileName: string): Promise<Blob> => {
    const response = await api.get(`/files/download/${fileName}`, { responseType: 'blob' });
    return response.data;
};

export const deleteFile = async (fileName: string): Promise<void> => {
    await api.delete(`/files/${fileName}`);
};