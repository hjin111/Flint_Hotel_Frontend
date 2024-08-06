import axios from 'axios';
import store from './store';

const instance = axios.create({
  baseURL: 'http://localhost:8080',
  headers: {
    'Content-Type': 'application/json'
  }
})

instance.interceptors.request.use(config => {
  const token = store.getters.getToken;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
})

export default instance;