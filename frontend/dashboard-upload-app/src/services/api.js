import axios from 'axios';

const API_BASE_URL = 'http://localhost:8000';

export const fetchFiles = () => axios.get(`${API_BASE_URL}/files/`);

export const uploadFile = (file) => {
  const formData = new FormData();
  formData.append('train_file', file);
  formData.append('test_file', file);
  return axios.post(`${API_BASE_URL}/upload/`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  });
};

export const deleteFile = (filename) => axios.delete(`${API_BASE_URL}/files/${filename}`);

export const fetchExampleFiles = () => axios.get(`${API_BASE_URL}/examples/`);

export const runGenClass = (params) => axios.post(`${API_BASE_URL}/run-genclass/`, params);