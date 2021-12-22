import axios from 'axios';

const api = axios.create({
  baseURL: 'http://192.168.150.101:8080/',
  timeout: 5 * 60 * 1000,
});

export { api };
