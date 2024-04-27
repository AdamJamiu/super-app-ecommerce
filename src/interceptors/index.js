import axios from "axios";
import { toast } from "react-toastify";

const baseURL = import.meta.env.VITE_SUPER_APP_BASE_URL;

export const httpClient = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});

httpClient.interceptors.request.use(
  async (config) => {
    const token = localStorage.getItem("csp_super_app_token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    if (!token) {
      localStorage.clear();
      window.location.reload();
    }

    return config;
  },

  (err) => {
    return Promise.reject(err);
  }
);

httpClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error?.response?.status === 401) {
      localStorage.clear();
      window.location.reload;
    }
    if (error?.response?.status === 403) {
      toast("You don't have permission to perform this action", {
        type: "error",
        toastId: "clientError",
      });
    }
    if (error.response.status === 500) {
      toast("Something went wrong", {
        type: "error",
        toastId: "clientError",
      });
    }
    return Promise.reject(error);
  }
);

export const authCaller = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const signUpHttpClient = axios.create({
  baseURL,
  headers: {
    "Content-Type": "multipart/form-data",
  },
});

export const countryCaller = axios.create({
  baseURL: "https://api.countrystatecity.in/v1/",
  headers: {
    "X-CSCAPI-KEY": "R0w5d0RYeklnOVk2bjFwWnpqUzhOdFpqWHlTMmMzSDlUa2tHOXRWdw==",
  },
});

export const dashboardClient = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
    // "API_KEY": "7c0fad71-ae3b-4494-ad35-66fe5fa3b62b"
    API_KEY: "584ea4f8-f8ea-45ed-a846-7cbac634f457",
  },
});
