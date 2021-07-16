import axios, { AxiosInstance, AxiosRequestConfig } from "axios";

import StorageService from "./StorageService";

class ApiService {
  private axios: AxiosInstance;
  constructor() {
    this.axios = axios.create({
      baseURL: process.env.REACT_APP_API_URL,
    });

    this.axios.interceptors.request.use(function (config) {
      const userData = StorageService.getUserData();

      if (userData?.token) {
        config.headers["access-token"] = userData.token;
        config.headers.client = userData.client;
        config.headers.uid = userData.uid;
      }
      return config;
    });
  }

  post = async (uri: string, data?: any) => {
    return this.axios.post(uri, data);
  };

  put = async (uri: string, data?: any, config?: AxiosRequestConfig) => {
    return this.axios.put(uri, data, config);
  };

  get = async (uri: string) => {
    return this.axios.get(uri);
  };

  delete = async (uri: string) => {
    return this.axios.delete(uri);
  };
}

export default new ApiService();
