import axios from "axios";
import { toast } from "react-toastify";

const baseURL = import.meta.env.VITE_SUPER_APP_BASE_URL;

const clientHttp = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const httpClient = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});

httpClient.interceptors.request.use(
  async (config) => {
    const { accessToken, refreshToken } = JSON.parse(
      sessionStorage.getItem("super_app_user_details")
    );

    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    if (!accessToken) {
      sessionStorage.removeItem("super_app_user_details");
      window.location.reload();
      window.location.href = "/login";
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
      // sessionStorage.clear();
      // window.location.reload;
      const { accessToken, refreshToken } = JSON.parse(
        sessionStorage.getItem("super_app_user_details")
      );

      if (!accessToken || !refreshToken) {
        sessionStorage.removeItem("super_app_user_details");
        window.location.reload();
        window.location.href = "/login";
      } else {
        async function handleRefreshToken() {
          clientHttp
            .post("Authentication/RefreshToken", {
              accessToken,
              refreshToken,
            })
            .then((res) => {
              console.log(res, "refresh token response");
            })
            .catch((err) => {
              console.log(err, "refresh token error");
            });
        }

        handleRefreshToken();
      }
    }
    // if (error?.response?.status === 403) {
    //   toast("You don't have permission to perform this action", {
    //     type: "error",
    //     toastId: "clientError",
    //   });
    // }
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
