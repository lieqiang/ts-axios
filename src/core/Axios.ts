import {
  AxiosPromise,
  AxiosRequestConfig,
  AxiosResponse,
  Method,
  ResolvedFn,
  RejectedFn
} from '../types'
import dispatchRequest from './dispatchRequest'
import InterceptorManager from './interceptorManager'
import mergeConfig from './mergeConfig'

interface Interceptors {
  // this.interceptors是一个对象
  request: InterceptorManager<AxiosRequestConfig> // InterceptorManager拦截类
  response: InterceptorManager<AxiosResponse> // InterceptorManager拦截类
}

interface PromiseChain<T> {
  resolved: ResolvedFn<T> | ((config: AxiosRequestConfig) => AxiosPromise) // ((config: AxiosRequestConfig) => AxiosPromise)  = dispatchRequest
  rejected?: RejectedFn
}
export default class Axios {
  //
  defaults: AxiosRequestConfig
  interceptors: Interceptors
  constructor(initConfig: AxiosRequestConfig) {
    this.defaults = initConfig // 默认配置 和 自定义配置
    this.interceptors = {
      // 初始化 上面的 interceptors 有request 和 response 属性 对外提供use属性添加拦截器
      request: new InterceptorManager<AxiosRequestConfig>(), // use eject
      response: new InterceptorManager<AxiosResponse>() // 两个不同的 new InterceptorManager
    }
  }
  //
  request(url: any, config?: any): AxiosPromise {
    // config 写 AxiosRequestConfig 会报错
    if (typeof url === 'string') {
      if (!config) {
        config = {}
      }
      config.url = url
    } else {
      config = url
    }
    config = mergeConfig(this.defaults, config) // 合并配置
    //
    const chain: PromiseChain<any>[] = [
      // any 可能是 AxiosRequestConfig,也可能是 AxiosPromise
      {
        resolved: dispatchRequest, // 初始值 dispatchRequest
        rejected: undefined // 初始值
      }
    ]
    console.log(this.interceptors.request)
    // this.interceptors.request 数组
    this.interceptors.request.forEach(interceptor => {
      // interceptorManager 中的 forEach fn
      chain.unshift(interceptor) // unshift数组开头添加元素
    })
    // this.interceptors.response 数组
    this.interceptors.response.forEach(interceptor => {
      //
      chain.push(interceptor)
    })

    let promise = Promise.resolve(config)
    while (chain.length) {
      const { resolved, rejected } = chain.shift()! // !此处断言不为空
      promise = promise.then(resolved, rejected) // 链式调用？？
    }
    return promise
    //
    // return dispatchRequest(config)
  }
  get(url: string, config?: any): AxiosPromise {
    // AxiosRequestConfig
    return this._requestMethodWithoutData('get', url, config)
  }

  delete(url: string, config?: AxiosRequestConfig): AxiosPromise {
    return this._requestMethodWithoutData('delete', url, config)
  }

  head(url: string, config?: AxiosRequestConfig): AxiosPromise {
    return this._requestMethodWithoutData('head', url, config)
  }

  options(url: string, config?: AxiosRequestConfig): AxiosPromise {
    return this._requestMethodWithoutData('options', url, config)
  }

  post(url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise {
    return this._requestMethodWithData('post', url, data, config)
  }

  put(url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise {
    return this._requestMethodWithData('put', url, data, config)
  }

  patch(url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise {
    return this._requestMethodWithData('patch', url, data, config)
  }

  _requestMethodWithoutData(
    method: Method,
    url: string,
    config?: AxiosRequestConfig
  ): AxiosPromise {
    return this.request(
      Object.assign(config || {}, {
        method,
        url
      })
    )
  }

  _requestMethodWithData(
    method: Method,
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): AxiosPromise {
    return this.request(
      Object.assign(config || {}, {
        method,
        url,
        data
      })
    )
  }
  // _requestMethodWithoutData(method: Method, url: string, config?: AxiosRequestConfig) {
  //   return this.request(Object.assign(config || {}, {
  //     method,
  //     url
  //   }))
  // }

  // _requestMethodWithData(
  //   method: Method,
  //   url: string,
  //   data?: any,
  //   config?: AxiosRequestConfig
  // ): AxiosPromise {
  //   return this.request(
  //     Object.assign(config || {}, {
  //       method,
  //       url,
  //       data
  //     })
  //   )
  // }
}
