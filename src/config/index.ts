/**
 * 环境变量封装
 */
const env: string = import.meta.env.MODE || "prod"; // import.meta.env 获取环境变量
const EnvConfig: any = {
  dev: {
    baseApi: "/shiiroapi",
    mockApi: "",
  },
  test: {
    baseApi: "/",
    mockApi: "",
  },
  prod: {
    baseApi: "/",
    mockApi: "",
  },
};
export default {
  env,
  mock: false, //mock总开关
  ...EnvConfig[env], // 动态传递环境变量，解构封装
};
