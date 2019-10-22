import { AxiosRequestConfig, AxiosPromise, AxiosResponse } from '../types'
import xhr from './xhr'
import { buildURL } from '../helpers/url'
import { transformRequest, transformResponse } from '../helpers/data'
import { processHeader, flattenHeaders } from '../helpers/head'
export default function dispatchRequest(config: AxiosRequestConfig): AxiosPromise {
  throwIfCancellationRequested(config) // 检测是否cancelToken被使用过，如果使用过则不发送请求
  processUrl(config)
  return xhr(config).then(res => {
    return transformResponseData(res)
  })
}

// export default function dispatchRequest(config: AxiosRequestConfig): AxiosPromise {
//   processConfig(config)
//   return xhr(config).then(res => {
//     return transformResponseData(res)
//   })
// }

function processUrl(config: AxiosRequestConfig): void {
  config.url = transformUrl(config)
  config.headers = transformHeader(config)
  config.data = transformRequestData(config)
  config.headers = flattenHeaders(config.headers, config.method!) // 把额外需要添加的属性 accept, 'Content-Type'提取出来，并把这两个之前的对象删除掉
}

function transformUrl(config: AxiosRequestConfig): string {
  const { url, params } = config
  // const url = config.url
  return buildURL(url!, params) // !类型断言
}

function transformRequestData(config: AxiosRequestConfig): any {
  return transformRequest(config.data)
}

function transformHeader(config: AxiosRequestConfig): any {
  const { data, headers = {} } = config
  return processHeader(headers, data)
}

function transformResponseData(res: any): AxiosResponse {
  res.data = transformResponse(res.data) // 此处跟源码 不太一样，需更正
  return res
}
// export default axios
// abort
function throwIfCancellationRequested(config: AxiosRequestConfig): void {
  if (config.cancelToken) {
    config.cancelToken.throwIfRequested()
  }
}
