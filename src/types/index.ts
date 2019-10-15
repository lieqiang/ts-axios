import InterceptorManager from "../core/interceptorManager"

export type Method =
  | 'get'
  | 'GET'
  | 'delete'
  | 'DELETE'
  | 'head'
  | 'HEAD'
  | 'options'
  | 'OPTIONS'
  | 'post'
  | 'POST'
  | 'put'
  | 'PUT'
  | 'patch'
  | 'PATCH'

export interface AxiosRequestConfig {
  url?: string
  method?: Method
  data?: any
  params?: any
  headers?: any
  responseType?: XMLHttpRequestResponseType // 字符串字面量类型，ts自带
  timeout?: number
  transformRequest?: AxiosTransformer | AxiosTransformer[]
  transformResponse?: AxiosTransformer | AxiosTransformer[]

  [propName: string]: any
}

export interface AxiosTransformer {
  (data: any, headers?: any): any
}

// export interface AxiosResponse {
//   data: any,
//   status: number,
//   statusText: string,
//   headers: Object,
//   config: AxiosRequestConfig,
//   request: any
// }

export interface AxiosResponse<T = any> { // AxiosPromise 传入的 或者空
  data: T // ???
  status: number
  statusText: string
  headers: any
  config: AxiosRequestConfig
  request: any
}

// export interface AxiosPromise extend Promise<AxiosResponse>{} //?????????????
export interface AxiosPromise<T = any> extends Promise<AxiosResponse<T>> {} // 返回 AxiosResponse 类型，T 为 AxiosResponse T ????

export interface AxiosError extends Error {
  config: AxiosRequestConfig
  code?: string
  request?: any
  response?: AxiosResponse
  isAxiosError: boolean
}
// 描述Axios类内部的通用方法
export interface Axios { // 见Axios类 不清楚看ts文档熟悉
  defaults: AxiosRequestConfig
  interceptors: {
    request: AxiosInterceptorManager<AxiosRequestConfig>
    response: AxiosInterceptorManager<AxiosResponse>
  }
  request<T=any>(config: AxiosRequestConfig): AxiosPromise<T>
  get<T=any>(url: string, config?: AxiosRequestConfig): AxiosPromise<T>// 请求什么类型，拿到什么类型
  delete<T=any>(url: string, config?: AxiosRequestConfig): AxiosPromise<T>
  head<T=any>(url: string, config?: AxiosRequestConfig): AxiosPromise<T>
  options<T=any>(url: string, config?: AxiosRequestConfig): AxiosPromise<T>
  post<T=any>(url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise<T>
  put<T=any>(url: string, config?: AxiosRequestConfig): AxiosPromise<T>
  patch<T=any>(url: string, config?: AxiosRequestConfig): AxiosPromise<T>
}

// AxiosInstance 继承 Axios接口，既有自己函数属性，也有 interface Axios 属性方法
export interface AxiosInstance extends Axios { // 例如 examples/extend getUser()中传入的 T (interface ResponseData)
  <T=any>(config: AxiosRequestConfig): AxiosPromise<T> // 函数是这种写法？不用函数名字？匿名函数？？
  // 添加一种函数的定义
  <T=any>(url: string, config?: AxiosRequestConfig): AxiosPromise<T> // 函数重载
}


// interceptor
export interface AxiosInterceptorManager<T> {
  use(resolved: ResolvedFn<T>, rejected?: RejectedFn): number // 返回拦截器id
  eject(id: number) :void
} 
export interface ResolvedFn<T> {
  // ResolvedFn 请求是 AxiosRequestConfig类型，响应是 AxiosResponse 类型
  (val: T): T | Promise<T> // 同步 T 或 异步 Promise
}

export interface RejectedFn {
  (err: any): any
}
