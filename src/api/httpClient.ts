import { httpServices } from "@/config";
import axios, { AxiosInstance } from "axios";

export const HttpClient = (url: string) => {
  const axiosInstance = axios.create({
    timeout: 25000,
    baseURL: url,
    headers: { "Access-Control-Origin": "*" },
  });
  return axiosInstance;
};

export const menuManager = HttpClient(`${httpServices?.menuManager}/api`);

export const authManager = HttpClient(`${httpServices?.authManager}`);

export const setInterceptor = (
  axiosInstance: AxiosInstance,
  handleError: any
) =>
  axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
      const errorInfo = {
        message: error.message,
        status: error.response ? error.response.status : "Network Error",
        data: error.response ? error.response.data : null,
      };
      handleError(errorInfo);
      return Promise.reject(error);
    }
  );
