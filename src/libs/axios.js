import axios from "axios";

/**
 * Custom axios instance
 * baseURL: /api
 * withCredentials: true
 * credentials: include
 * timeout: 60000
 * Content: JSON
 */

const configApi = axios.create({
  baseURL: "http://localhost:3000/api",
  withCredentials: true,
  credentials: "include",
  timeout: 60000,
  headers: {
    "Content-Type": "application/json",
  },
});

configApi.interceptors.request.use((config) => {
  config.headers = {
    authorization: "",
    "Content-Type": "application/json",
  };
  return config;
});

export default configApi;
