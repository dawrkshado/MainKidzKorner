import axios from "axios";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "./constants";

console.log("API URL:", import.meta.env.VITE_API_URL);

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});


api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem(ACCESS_TOKEN);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);


api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;


    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      const refreshToken = localStorage.getItem(REFRESH_TOKEN);
      if (!refreshToken) {
        console.warn("No refresh token found, redirecting to login");
        localStorage.clear();
        window.location.href = "/login";
        return Promise.reject(error);
      }

      try {

        const res = await axios.post(
          `${import.meta.env.VITE_API_URL}/api/token/refresh/`,
          { refresh: refreshToken }
        );

        const newAccessToken = res.data.access;
        localStorage.setItem(ACCESS_TOKEN, newAccessToken);


        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;


        return api(originalRequest);
      } catch (refreshError) {
        console.error("Token refresh failed:", refreshError);
        localStorage.clear();
        window.location.href = "/login";
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default api;
