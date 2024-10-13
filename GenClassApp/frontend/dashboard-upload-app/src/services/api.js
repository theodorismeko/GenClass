import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL ? 'http://backend:80' : 'http://localhost:80'; 

export const fetchFiles = () => axios.get(`${API_BASE_URL}/files/`);

export const uploadFile = (file, fieldName) => {
  const formData = new FormData();
  formData.append(fieldName, file);
  return axios.post(`${API_BASE_URL}/upload/${fieldName.replace('_file', '')}`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  });
};

export const deleteFile = (fileType, fileId) => axios.delete(`${API_BASE_URL}/files/${fileType}/${fileId}`);

export const runGenClass = (params) => axios.post(`${API_BASE_URL}/run-genclass/`, params);

export const getGenclassHelp = () => axios.get(`${API_BASE_URL}/genclass-help/`);