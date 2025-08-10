import axios from 'axios';

const api = axios.create({
  baseURL: 'https://learnloopb.onrender.com',
  withCredentials: true, // Send cookies with requests
});

export default api;