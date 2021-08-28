import axios, { AxiosInstance, AxiosRequestConfig } from "axios";
import Qs from "qs";
import HttpError from "../HttpError/index";

const TIMEOUT_MILLS = 200000;
let call;

let axiosInterceptor: any = null;
axios.defaults.withCredentials = false;
export let axiosInstance: AxiosInstance;
axiosInstance = axios.create();

export enum Method {
  GET = "get",
  POST = "post",
  PUT = "put",
  DELETE = "delete",
}

interface RequestParams {
  method: Method;
  baseUrl: string;
  queryParams?: object | null;
  body?: FormData | unknown | string;
  headers?: object;
  isMultipart?: boolean;
}

export const request = (params: RequestParams) => {
  const { method, baseUrl, body, headers, isMultipart, queryParams } = params;

  let config: AxiosRequestConfig = {
    timeout: TIMEOUT_MILLS,
    headers: {
      Accept: 'application/json',
      // "Cache-Control": "no-cache",
      // Pragma: "no-cache",
    },
    params: {},
    paramsSerializer: (params: any) => {
      return Qs.stringify(params, { arrayFormat: "brackets" });
    },
  };

  // call = axios.CancelToken.source();
  // config.cancelToken = call.token;

  if (headers) {
    config.headers = {
      ...config.headers,
      ...headers,
    };
  }
  if (isMultipart) {
    config.headers = {
      ...config.headers,
      "content-type": "multipart/form-data",
    };
  }
  if (queryParams) {
    config.params = {
      ...config.params,
      ...queryParams,
    };
  }

  if (!!axiosInterceptor || axiosInterceptor === 0) {
    axiosInstance.interceptors.response.eject(axiosInterceptor);
  }

  axiosInterceptor = axiosInstance.interceptors.response.use(
    (res) => {
      return res;
    },
    (error) => {
      if (error.response) {
        return Promise.reject(new HttpError({ ...error, isAxiosError: true }));
      }
      return Promise.reject(error);
    }
  );

  switch (method) {
    case "get":
      return axiosInstance.get(baseUrl, config);
    case "post":
      return axiosInstance.post(baseUrl, body, config);
    case "put":
      return axiosInstance.put(baseUrl, body, config);
    case "delete":
      return axiosInstance.delete(baseUrl, config);
    default:
      return axiosInstance.get(baseUrl, config);
  }
};
