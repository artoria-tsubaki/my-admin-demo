import axios, { AxiosInstance, AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios'
import { ResultEnum } from "@/enums/httpEnum";
import { GlobalStore } from '@/stores';
import { checkStatus } from "./helper/checkStatus";
import { ElMessage } from 'element-plus';
import { LOGIN_URL } from "@/config/config";
import router from '@/routers';
import { showFullScreenLoading, tryHideFullScreenLoading } from '@/config/serviceLoading';
import { ResultData } from '@/api/interface';

const config = {
  // 默认地址请求地址，可在 .env开头文件中修改
  baseURL: import.meta.env.VITE_API_URL as string,
  // 设置超时时间
  timeout: ResultEnum.TIMEOUT as number,
  // 跨域时候允许携带凭证
  withCredentials: true
}

class RequestHttp {
  service: AxiosInstance;
  public constructor(config: AxiosRequestConfig) {
    // 实例化axios
    this.service = axios.create(config)

    /**
     * @description 请求拦截器
     * 客户端发送请求 -> [请求拦截器] -> 服务器
		 * token校验(JWT) : 接受服务器返回的token,存储到vuex/pinia/本地储存当中
     */
    this.service.interceptors.request.use(
      (config: AxiosRequestConfig) => {
        const globalStore = GlobalStore()
        config.headers!.noLoading || showFullScreenLoading()
        const token: string = globalStore.token
        return { ...config, headers: { ...config.headers, "x-access-token": token } }
      },
      (error: AxiosError) => {
        return Promise.reject(error)
      }
    )

    /**
     * @description 响应拦截器
     * 服务器换返回信息 -> [拦截统一处理] -> 客户端JS获取到信息
     */
    this.service.interceptors.response.use(
      (response: AxiosResponse) => {
        const { data } = response
        const globalStore = GlobalStore()
        // 请求结束后，关闭loading
        tryHideFullScreenLoading()
        // 登录失败 code == 599
        if (data.code == ResultEnum.OVERDUE) {
          ElMessage.error(data.msg)
          globalStore.setToken("")
          router.replace(LOGIN_URL)
          return Promise.reject(data)
        }
        // 全局错误信息拦截（防止下载文件得时候返回数据流，没有code，直接报错）
        if (data.code && data.code !== ResultEnum.SUCCESS) {
          ElMessage.error(data.msg)
          return Promise.reject(data)
        }
        // 请求成功
        return data
      },
      async (error: AxiosError) => {
        const { response } = error
        tryHideFullScreenLoading()
        // 请求超时单独判断，因为请求超时没有 response
        if (error.message.indexOf("timeout") !== -1) ElMessage.error('请求超时！')
        // 根据响应的状态码，做不同的处理
        if (response) checkStatus(response.status)
        // 服务器结果都没有返回 (可能服务器错误可能客户端断网)，断网处理:可以跳转到断网页面
        if(!window.navigator.onLine) router.replace("/500")
        return Promise.reject(error)
      }
    )
  }

  // 常用请求方法封装
  get<T>(url: string, params?: object, _object = {}): Promise<ResultData<T>> {
    return this.service.get(url, { params, ..._object })
  }
  post<T>(url: string, params?: object, _object = {}): Promise<ResultData<T>> {
    return this.service.post(url, params, _object )
  }
  put<T>(url: string, params?: object, _object = {}): Promise<ResultData<T>> {
    return this.service.put(url, { params, ..._object })
  }
  delete<T>(url: string, params?: object, _object = {}): Promise<ResultData<T>> {
    return this.service.delete(url, { params, ..._object })
  }
}

export default new RequestHttp(config)