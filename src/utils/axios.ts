import axios, { InternalAxiosRequestConfig, AxiosRequestConfig } from "axios";

const appRequestSuccessInterceptor = (config: InternalAxiosRequestConfig) => {
  return config;
};

export const http = axios.create({
  baseURL: "http://16.170.235.178:8080/api",
  // baseURL: "http://localhost:8080/api",
  timeout: 50000,
});

http.interceptors.response.use((response) => response);

http.interceptors.request.use(appRequestSuccessInterceptor);

interface IConstructor {
  slag?: string;
}

export class AppApiService {
  private readonly slag?: string;

  public constructor(payload?: IConstructor) {
    this.slag = payload?.slag;
  }

  protected async axiosCall<T>(
    config: AxiosRequestConfig
  ): Promise<[null, T] | [unknown]> {
    try {
      config.baseURL = this.slag
        ? http.defaults.baseURL + this.slag
        : http.defaults.baseURL;
      const { data } = await http.request<T>(config);
      return [null, data];
    } catch (e) {
      return [e];
    }
  }
}
