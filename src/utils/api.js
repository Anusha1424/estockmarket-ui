import axios from 'axios';
import jsog from 'jsog'; 

const api = axios.create({
  baseURL: 'http://localhost:9000/',
  timeout: 5 * 60 * 1000,
});
api.interceptors.response.use(
  function (response) {
    response.data = jsog.decode(response.data);
    return response;
  },
  function (error) {
    return Promise.reject(error);
  }
);
export { api };
