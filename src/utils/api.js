import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8080/',
  timeout: 5 * 60 * 1000
});

export { api };
