import axios from 'axios';
import envs from '../../config/environments';

const instance = axios.create({
  baseURL: envs.baseApiUrl,
});

instance.interceptors.response.use(
  (response) => response,
  (error) => {
    return Promise.reject(error);
  },
);

export default instance;
