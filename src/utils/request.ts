import axios from "axios";
import { message } from "antd";
import config from "../config";

type Response = {
  code: number;
  data: any;
  msg: string;
};

// 创建 axios 实例
const service = axios.create({
  timeout: 10000, // 请求超时时间
});

const err = (error: any) => {
  if (error.response) {
    message.error(error.response.data.error);
  }
  return Promise.reject(error);
};

// request interceptor
service.interceptors.request.use((config) => {
  if (localStorage.getItem("token")) {
    config.headers["token"] = localStorage.getItem("token");
  }

  return config;
}, err);

// response interceptor
service.interceptors.response.use((response) => {
  const { status: code, data, statusText: msg } = response;
  if (code === 200) return data; // 成功码
}, err);

/**
 * 请求核心函数
 * @param {*} options 请求配置
 */
const requset: any = (options: any) => {
  options.method = options.method || "get";
  if (options.method.toLowerCase() === "get") {
    options.params = options.data; // 将data赋值为get请求的params
  }
  // 局部mock参数设置
  if (typeof options.mock != "undefined") {
    config.mock = options.mock;
  }
  // if (config.env === "prod") {
  //   service.defaults.baseURL = config.baseApi;
  // } else {
  //   service.defaults.baseURL = config.mock ? config.mockApi : config.baseApi; // 识别是否启用mockApi
  // }
  return service(options);
};

// 赋予request函数请求方法属性，允许通过点request调用不同请求方法，增加请求方法灵活性
["get", "post", "put", "delete", "patch"].forEach((item) => {
  requset[item] = (url: any, data: any, options: any) => {
    return requset({
      method: item,
      data,
      url,
      ...options,
    });
  };
});

export default requset;
