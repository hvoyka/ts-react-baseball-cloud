import axios, { AxiosInstance } from "axios";
import StorageService from "./StorageService";

class ApiService {
  private axios: AxiosInstance;
  constructor() {
    this.axios = axios.create({
      baseURL: "https://baseballcloud-back.herokuapp.com/api/v1",
    });

    this.axios.interceptors.request.use(async function (config) {
      const storageData = await StorageService.getUserData();
      if (storageData) {
        config.headers["access-token"] = storageData.token;
        config.headers.client = storageData.client;
        config.headers.uid = storageData.uid;
      }
      console.log(storageData);
      return config;
    });
  }

  post = async (uri: string, data?: any) => {
    return this.axios.post(uri, data);
  };

  put = async (uri: string, data?: any, config?: any) => {
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
