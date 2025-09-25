import axios from 'axios';

const BASE_URL = 'http://localhost:5000/api';

export const uploadImage = async (formData) => {
  return axios.post(`${BASE_URL}/upload`, formData);
};

export const fetchLatestImage = async () => {
  return axios.get(`${BASE_URL}/latest`, { responseType: 'blob' });
};

export const fetchAllImages = async () => {
  return axios.get('http://localhost:5000/api/all');
};