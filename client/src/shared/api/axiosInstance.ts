import type { AxiosError } from 'axios';
import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: '/api',
});

let accessToken = '';

axiosInstance.interceptors.request.use((config) => {
  if (!config.headers.Authorization) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});

axiosInstance.interceptors.response.use(
  (res) => res,
  async (error: AxiosError & { config: { sent: boolean } }) => {
    const prev = error.config;

    if (error.status === 403 && !prev.sent) {
      prev.sent = true;
      const response = await axios.get<{ accessToken: string }>('/api/token/refresh');
      accessToken = response.data.accessToken;
      prev.headers.Authorization = `Bearer ${accessToken}`;
      return axiosInstance(prev);
    }
    return Promise.reject(error);
  },
);
export default axiosInstance;
