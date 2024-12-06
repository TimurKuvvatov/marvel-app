import axios from 'axios';
import envs from '../../config/environments';

const instance = axios.create({
  baseURL: envs.baseApiUrl,
});

instance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (axios.isCancel(error)) {
      console.log('Request canceled:', error.message);
    } else {
      console.error('Error response:', error.response);
      console.error('Error message:', error.message);
    }
    return Promise.reject(error);
  },
);

export default instance;
